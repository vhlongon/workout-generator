export const slugify = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

export const deslugify = (str: string) => {
  return str.replace(/-/g, ' ');
};
