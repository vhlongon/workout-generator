import { Mode, Target } from '@prisma/client';

export const generateWorkoutPrompt = (
  target: Target & (string & {}),
  totalSets: number,
  mode: Mode
): string => {
  if (!target) {
    throw new Error('Specific muscle group is required');
  }

  const prompt = `Generate a ${mode} workout routine for a ${target} workout. The workout should include a variety of exercises targeting all major muscles in the selected area. The total number of sets should be ${totalSets}. Please provide the routine in the following format:\n\n| Exercise Name | Number of Sets | Number of Reps |\n| ------------- | -------------- | -------------- |\n`;

  return prompt;
};

type Exercise = {
  name: string;
  sets: number;
  reps: number[];
};

export const parsePrompt = (input: string): Exercise[] => {
  const lines = input.split('\n').slice(1); // remove header row
  const exercises: Exercise[] = [];

  for (const line of lines) {
    const [name, sets, reps] = line.split(' | ');
    const repsRange = reps.split('-').map(n => parseInt(n));
    exercises.push({ name, sets: parseInt(sets), reps: repsRange });
  }

  return exercises;
};
