export const formatToTitleCase = (str: string) => {
  const words = str.split('_');
  return words
    .map(word => {
      return word.charAt(0) + word.slice(1).toLowerCase();
    })
    .join(' ');
};
