import { toTitleCaseWithSpaces } from './format';

export const getMediumValue = (arr: number[]) => {
  const sorted = arr.sort((a, b) => a - b);
  const half = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[half]
    : (sorted[half - 1] + sorted[half]) / 2;
};

const loadingPhrases = [
  'Pumping iron to generate your workout suggestion...',
  'Summoning the workout gods to create a workout just for you...',
  'Mixing up a special workout potion just for you...',
  'Activating our workout algorithm to create a workout that will make you feel like a superhero...',
  `Stretching our muscles to come up with a workout that's just right...`,
];

export const getRandomLoadingPhrase = () => {
  return loadingPhrases[Math.floor(Math.random() * loadingPhrases.length)];
};
