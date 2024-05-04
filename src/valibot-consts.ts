import * as v from "valibot";

export const CUSTOM_SCOPE_KEY: "custom" = "custom";
export const FOOTER_OPTION_VALUES: v.Output<typeof V_FOOTER_OPTIONS>[] = [
  "closes",
  "trailer",
  "breaking-change",
  "deprecated",
  "custom",
];
export const V_BRANCH_ACTIONS = v.picklist(["branch", "worktree"]);
export const V_FOOTER_OPTIONS = v.picklist([
  "closes",
  "trailer",
  "breaking-change",
  "deprecated",
  "custom",
]);
export const V_BRANCH_FIELDS = v.picklist([
  "user",
  "version",
  "type",
  "ticket",
  "description",
]);
export const V_BRANCH_CONFIG_FIELDS = v.picklist([
  "branch_user",
  "branch_version",
  "branch_type",
  "branch_ticket",
  "branch_description",
]);
export const BRANCH_ORDER_DEFAULTS: v.Output<typeof V_BRANCH_FIELDS>[] = [
  "user",
  "version",
  "type",
  "ticket",
  "description",
];

export const DEFAULT_SCOPE_OPTIONS = [
  { value: "app", label: "app" },
  { value: "shared", label: "shared" },
  { value: "server", label: "server" },
  { value: "tools", label: "tools" },
  { value: "", label: "none" },
];

export const DEFAULT_TYPE_OPTIONS = [
  {
    value: "fountain",
    label: "fountain",
    hint: "modern personal stories, written like poetry, about those moments you remember all too well",
    emoji: "🖋️",
    trailer: "Changelog: fountain pen",
  },
  {
    value: "quill",
    label: "quill",
    hint: "make you feel all old fashioned, like you’re a 19th century poet crafting your next sonnet by candlelight",
    emoji: "🪶",
    trailer: "Changelog: quill",
  },
  {
    value: "glitter-gel",
    label: "glitter-gel",
    hint: "make you want to dance, sing and toss glitter around the room",
    emoji: "✨",
    trailer: "Changelog: glitter gel pen",
  },
  { value: "", label: "none" },
];
