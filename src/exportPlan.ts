import { installActionSketches } from "./plans";
import type { LimitedPermissionPlan } from "./types";

export function exportPlanMarkdown(
  account: string,
  plan: LimitedPermissionPlan
): string {
  const lines: string[] = [
    `# Limited permission plan — ${account}@${plan.permissionName}`,
    "",
    "> Educational export only. Not a signed transaction.",
    "",
    "## Summary",
    "",
    `- Parent: \`${plan.parent}\``,
    `- Public key: \`${plan.publicKey}\``,
    "",
    "## Linked actions",
    "",
  ];

  for (const link of plan.linkedActions) {
    lines.push(`- \`${link.contract}::${link.action}\``);
  }

  lines.push("", "## Install sketch (order)", "");
  const rows = installActionSketches(account, plan);
  rows.forEach((row, i) => {
    lines.push(`${i + 1}. \`${row.account}::${row.name}\` — ${row.summary}`);
  });

  lines.push(
    "",
    "## Revocation checklist",
    "",
    "1. Stop using the limited key in the dApp (remove from storage / logout).",
    "2. `unlinkauth` for each linked `contract::action` (or bulk policy your ops use).",
    "3. `updateauth` to remove the key from the permission, or delete the permission if unused.",
    "4. Confirm with `get_account` that the permission no longer authorizes those actions.",
    "5. If the key may have leaked, treat any linked action surface as compromised until unlinked.",
    "",
    "## Risk note",
    "",
    plan.riskNote,
    "",
    "## Stack preference",
    "",
    "- Prefer **WharfKit** (`@wharfkit/session`, Account Kit, wallet plugins).",
    "- Avoid **eosjs**, **UAL**, and standalone **Anchor Link** as primary greenfield integration.",
    ""
  );

  return lines.join("\n");
}
