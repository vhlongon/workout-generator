import { twMerge } from 'tailwind-merge';

export const getFadeInClass = (isLoading: boolean) => {
  return twMerge(
    'transition-all duration-300',
    isLoading ? 'opacity-100 h-auto' : 'opacity-0 h-0'
  );
};
