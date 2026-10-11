const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** "2026-06" -> "Jun 2026", "2025" -> "2025", empty -> "Present". */
export function formatDate(value?: string | null): string {
  if (!value) return 'Present';
  const [year, month] = value.split('-');
  return month ? `${MONTHS[+month - 1]} ${year}` : year;
}

/** "Jun 2026 – Present", or a single date when start and end are the same. */
export function formatRange(start: string, end?: string | null): string {
  const from = formatDate(start);
  const to = formatDate(end);
  return to === from ? from : `${from} – ${to}`;
}

/** Sortable key: "2025" sorts as "2025-00", so month-less entries come after dated ones in the same year when sorting newest first. */
export const dateKey = (value: string) => (value.length === 4 ? `${value}-00` : value);

const escape = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Minimal inline Markdown for one-line fields: **bold**, *italic*, [text](url). */
export function inline(text: string): string {
  return escape(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>');
}
