export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

export const deslugify = (str: string) => {
  return str.replace(/-/g, ' ');
};

export const toTitleCase = (str: string) => {
  const words = str.split('_');
  return words
    .map(word => {
      return word.charAt(0) + word.slice(1).toLowerCase();
    })
    .join(' ');
};

export const formatOptions = (options: Record<string, string>) => {
  return Object.values(options).map(m => ({
    name: toTitleCase(m),
    value: m,
  }));
};
