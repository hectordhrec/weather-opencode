import type { Config } from "../types/Config";
import { promptYesNo } from "../presentation/input";
import { showMessage, showSuccess, showTitle } from "../presentation/output";
import { saveSettings } from "../storage/settingsStorage";
import { formatUnitLabel } from "../utils/format";

export async function openSettings(config: Config): Promise<void> {
  const current = formatUnitLabel(config.units);
  const next = config.units === "celsius" ? "fahrenheit" : "celsius";
  const nextLabel = formatUnitLabel(next);
  showTitle(`Unidades actuales: ${current}`);
  const confirmed = await promptYesNo(`  Cambiar a ${nextLabel}? (s/n): `);
  if (!confirmed) {
    showMessage("  Sin cambios.\n");
    return;
  }
  config.units = next;
  await saveSettings({ defaultCity: config.defaultCity, units: config.units });
  showSuccess(`Unidades cambiadas a ${nextLabel}.`);
}
