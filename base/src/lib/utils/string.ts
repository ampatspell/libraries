export const widow = (text: string) => {
  text = text.trim();
  if (text.length === 0) {
    return text;
  }
  const words = text.split(' ');
  if (words.length === 1) {
    return words[0]!;
  }

  const last = words.pop();
  const start = words.join(' ').trim();
  return `${start}\u00A0${last}`;
}
