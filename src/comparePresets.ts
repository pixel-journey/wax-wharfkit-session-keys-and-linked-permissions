import { PRESET_CATALOG } from "./presets";
import { planSeverity, type SeverityResult } from "./severity";

export interface PresetSeverityRow {
  id: string;
  label: string;
  severity: SeverityResult;
}

export function comparePresetSeverities(): PresetSeverityRow[] {
  return PRESET_CATALOG.map((p) => ({
    id: p.id,
    label: p.label,
    severity: planSeverity(p.build()),
  })).sort((a, b) => b.severity.score - a.severity.score);
}
