#! /usr/bin/env node

import * as p from "@clack/prompts";
import color from "picocolors";
import { execSync } from "child_process";
import { chdir } from "process";
import { Output, parse } from "valibot";
import { CommitState, Config } from "./valibot-state";
import {
  load_setup,
  addNewLine,
  SPACE_TO_SELECT,
  infer_type_from_branch,
  get_git_root,
} from "./utils";
import { git_add, git_status } from "./git";
import data from "./data";

main(load_setup());

export async function main(config: Output<typeof Config>) {
  let commit_state = parse(CommitState, {});
  chdir(get_git_root());

  if (config.check_status) {
    let { index, work_tree } = git_status();
    p.log.step(color.black(color.bgGreen(" Checking Git Status ")));
    const staged_files = index.reduce(
      (acc, curr, i: number) => color.green(acc + curr + addNewLine(index, i)),
      "",
    );
    p.log.success("Changes to be committed:\n" + staged_files);
    if (work_tree.length) {
      const unstaged_files = work_tree.reduce(
        (acc, curr, i: number) =>
          color.red(acc + curr + addNewLine(work_tree, i)),
        "",
      );
      p.log.error("Changes not staged for commit:\n" + unstaged_files);
      const selected_for_staging = (await p.multiselect({
        message: `Some files have not been staged, would you like to add them now? ${SPACE_TO_SELECT}`,
        options: [
          { value: ".", label: "." },
          ...work_tree.map((v) => ({ value: v, label: v })),
        ],
        required: false,
      })) as string[];
      if (p.isCancel(selected_for_staging)) process.exit(0);
      git_add(selected_for_staging);
    }

    let updated_status = git_status();
    if (!updated_status.index.length) {
      p.log.error(
        color.red(
          'no changes added to commit (use "git add" and/or "git commit -a")',
        ),
      );
      process.exit(0);
    }
  }

  if (config.commit_type.enable) {
    let message = "Select a commit type";
    let initial_value = config.commit_type.initial_value;
    if (config.commit_type.infer_type_from_branch) {
      const options = config.commit_type.options.map((o) => o.value);
      const type_from_branch = infer_type_from_branch(options);
      if (type_from_branch) {
        message = `Commit type inferred from branch ${color.dim("(confirm / edit)")}`;
        initial_value = type_from_branch;
      }
    }
    const value_to_data: Record<string, { emoji: string; trailer: string }> =
      config.commit_type.options.reduce(
        (acc, curr) => ({
          ...acc,
          [curr.value]: {
            emoji: curr.emoji ?? "",
            trailer: curr.trailer ?? "",
          },
        }),
        {},
      );
    const commit_type = await p.select({
      message,
      initialValue: initial_value,
      options: config.commit_type.options,
    });
    if (p.isCancel(commit_type)) process.exit(0);
    commit_state.trailer = value_to_data[commit_type].trailer;
    commit_state.type = config.commit_type.append_emoji_to_commit
      ? `${value_to_data[commit_type].emoji} ${commit_type}`.trim()
      : commit_type;
  }

  const commit_era = async () => {
    const matching_eras = Object.entries(data).reduce((acc, [key, val]) => {
      if (val[commit_state.type as keyof typeof val].length > 0) {
        return [...acc, key];
      }
      return acc;
    }, [] as string[]);

    return await p.select({
      message: "Which era would you like to commit to?",
      options: matching_eras.map((key) => ({ value: key, label: key })),
    });
  };
  if (p.isCancel(commit_era)) process.exit(0);

  commit_state.era = (await commit_era()) as string;

  const commit_title = async (): Promise<string> => {
    const title = await p.select({
      message: "Pick your commit’s title.",
      // @ts-ignore
      options: data[commit_state.era][commit_state.type].map((key: string) => ({
        value: key,
        label: key,
      })),
    });
    return title as string;
  };

  if (p.isCancel(commit_title)) process.exit(0);
  commit_state.title = await commit_title();

  if (config.confirm_with_editor) {
    const options = config.overrides.shell
      ? { shell: config.overrides.shell, stdio: "inherit" }
      : { stdio: "inherit" };
    const trailer = commit_state.trailer
      ? `--trailer="${commit_state.trailer}"`
      : "";
    execSync(
      `git commit -m "${build_commit_string(
        commit_state,
        config,
        false,
        true,
        false,
      )}" ${trailer} --edit`,
    );
    process.exit(0);
  }

  let continue_commit = true;
  p.note(
    build_commit_string(commit_state, config, true, false, true),
    "Commit Preview",
  );
  if (config.confirm_commit) {
    continue_commit = (await p.confirm({
      message: "Confirm Commit?",
    })) as boolean;
    if (p.isCancel(continue_commit)) process.exit(0);
  }

  if (!continue_commit) {
    p.log.info("Exiting without commit");
    process.exit(0);
  }

  try {
    const options = config.overrides.shell
      ? { shell: config.overrides.shell }
      : {};
    const trailer = commit_state.trailer
      ? `--trailer="${commit_state.trailer}"`
      : "";
    const output = execSync(
      `git commit -m "${build_commit_string(
        commit_state,
        config,
        false,
        true,
        false,
      )}" ${trailer}`,
      options,
    )
      .toString()
      .trim();
    if (config.print_commit_output) p.log.info(output);
  } catch (err) {
    p.log.error("Something went wrong when committing: " + err);
  }
}

function build_commit_string(
  commit_state: Output<typeof CommitState>,
  config: Output<typeof Config>,
  colorize: boolean = false,
  escape_quotes: boolean = false,
  include_trailer: boolean = false,
): string {
  let commit_string = "";
  if (commit_state.type) {
    commit_string += colorize
      ? color.blue(commit_state.type)
      : commit_state.type;
  }

  if (commit_state.era) {
    const era = colorize ? color.cyan(commit_state.era) : commit_state.era;
    commit_string += `(${era})`;
  }

  let title_ticket = commit_state.ticket;
  const surround = config.check_ticket.surround;
  if (commit_state.ticket && surround) {
    const open_token = surround.charAt(0);
    const close_token = surround.charAt(1);
    title_ticket = `${open_token}${commit_state.ticket}${close_token}`;
  }

  const position_beginning = config.check_ticket.title_position === "beginning";
  if (title_ticket && config.check_ticket.add_to_title && position_beginning) {
    commit_string = `${
      colorize ? color.magenta(title_ticket) : title_ticket
    } ${commit_string}`;
  }

  const position_before_colon =
    config.check_ticket.title_position === "before-colon";
  if (
    title_ticket &&
    config.check_ticket.add_to_title &&
    position_before_colon
  ) {
    const spacing =
      commit_state.scope || (commit_state.type && !config.check_ticket.surround)
        ? " "
        : "";
    commit_string += colorize
      ? color.magenta(spacing + title_ticket)
      : spacing + title_ticket;
  }

  if (
    commit_state.breaking_title &&
    config.breaking_change.add_exclamation_to_title
  ) {
    commit_string += colorize ? color.red("!") : "!";
  }

  if (
    commit_state.scope ||
    commit_state.type ||
    (title_ticket && position_before_colon)
  ) {
    commit_string += ": ";
  }

  const position_start = config.check_ticket.title_position === "start";
  const position_end = config.check_ticket.title_position === "end";
  if (title_ticket && config.check_ticket.add_to_title && position_start) {
    commit_string += colorize
      ? color.magenta(title_ticket) + " "
      : title_ticket + " ";
  }

  if (commit_state.title) {
    commit_string += colorize
      ? color.reset(commit_state.title)
      : commit_state.title;
  }

  if (title_ticket && config.check_ticket.add_to_title && position_end) {
    commit_string +=
      " " + (colorize ? color.magenta(title_ticket) : title_ticket);
  }

  if (commit_state.body) {
    const temp = commit_state.body.split("\\n"); // literal \n, not new-line.
    const res = temp
      .map((v) => (colorize ? color.reset(v.trim()) : v.trim()))
      .join("\n");
    commit_string += colorize ? `\n\n${res}` : `\n\n${res}`;
  }

  if (commit_state.breaking_title) {
    const title = colorize
      ? color.red(`BREAKING CHANGE: ${commit_state.breaking_title}`)
      : `BREAKING CHANGE: ${commit_state.breaking_title}`;
    commit_string += `\n\n${title}`;
  }

  if (commit_state.breaking_body) {
    const body = colorize
      ? color.red(commit_state.breaking_body)
      : commit_state.breaking_body;
    commit_string += `\n\n${body}`;
  }

  if (commit_state.deprecates_title) {
    const title = colorize
      ? color.yellow(`DEPRECATED: ${commit_state.deprecates_title}`)
      : `DEPRECATED: ${commit_state.deprecates_title}`;
    commit_string += `\n\n${title}`;
  }

  if (commit_state.deprecates_body) {
    const body = colorize
      ? color.yellow(commit_state.deprecates_body)
      : commit_state.deprecates_body;
    commit_string += `\n\n${body}`;
  }

  if (commit_state.custom_footer) {
    const temp = commit_state.custom_footer.split("\\n");
    const res = temp
      .map((v) => (colorize ? color.reset(v.trim()) : v.trim()))
      .join("\n");
    commit_string += colorize ? `\n\n${res}` : `\n\n${res}`;
  }

  if (commit_state.closes && commit_state.ticket) {
    commit_string += colorize
      ? `\n\n${color.reset(commit_state.closes)} ${color.magenta(
          commit_state.ticket,
        )}`
      : `\n\n${commit_state.closes} ${commit_state.ticket}`;
  }

  if (include_trailer && commit_state.trailer) {
    commit_string += colorize
      ? `\n\n${color.dim(commit_state.trailer)}`
      : `\n\n${commit_state.trailer}`;
  }

  if (escape_quotes) {
    commit_string = commit_string.replaceAll('"', '\\"');
  }

  return commit_string;
}
