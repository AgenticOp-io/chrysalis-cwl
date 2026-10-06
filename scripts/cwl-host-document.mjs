/**
 * Host pass for declared year and device tokens.
 * CWL leaves <!-- cwl:year --> and <!-- cwl:device -->. The host fills them.
 * Device uses the declared below cut and class names. No userAgent read.
 */
export const CWL_YEAR_SLOT = "<!-- cwl:year -->";
export const CWL_DEVICE_SLOT = "<!-- cwl:device -->";

/**
 * @param {string} html
 * @param {{ year?: number, devices?: string[], below?: number }} opts
 */
export function applyCwlHostDocumentTokens(html, opts = {}) {
  const year = opts.year;
  let out = String(html);
  if (Number.isInteger(year) && year >= 1970 && year <= 9999) {
    out = out.split(CWL_YEAR_SLOT).join(String(year));
  }
  const devices = (opts.devices ?? [])
    .map((name) => String(name))
    .filter((name) => /^[A-Za-z][A-Za-z0-9_-]*$/.test(name));
  const below = opts.below;
  if (!out.includes(CWL_DEVICE_SLOT) || devices.length < 2) return out;
  if (!Number.isInteger(below) || below < 10 || below > 9999) return out;
  out = out.split(CWL_DEVICE_SLOT).join("");
  if (out.includes("data-cwl-device=")) return out;
  const mobile = JSON.stringify(devices[0]);
  const desktop = JSON.stringify(devices[1]);
  const query = JSON.stringify(`(max-width: ${below}px)`);
  const script =
    `<script data-cwl-device="1">(function(){var q=window.matchMedia(${query});function apply(){document.documentElement.setAttribute("data-ao-device",q.matches?${mobile}:${desktop});}apply();if(q.addEventListener)q.addEventListener("change",apply);})();</script>`;
  const idx = out.lastIndexOf("</body>");
  if (idx >= 0) return `${out.slice(0, idx)}${script}${out.slice(idx)}`;
  return `${out}${script}`;
}
