export function currency(num) {
  const n = parseInt(num, 10);
  return `${n.toFixed(0).replace(/./g, (c, i, a) => (i && c !== '.' && ((a.length - i) % 3 === 0) ? `, ${c}`.replace(/\s/g, '') : c))}`;
}

export function date(time) {
  const localDate = new Date(time * 1000);
  return localDate.toLocaleDateString();
}

export function dateUS(time) {
  const localDate = new Date(time * 1000);
  const options = {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour12: false,
    timeZone: 'America/New_York',
  };
  return localDate.toLocaleDateString('en-US', options);
}
