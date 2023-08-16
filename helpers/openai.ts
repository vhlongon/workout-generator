import { WorkoutSuggestionFormData } from '@/types';
import { Exercise } from '@prisma/client';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const getWorkoutSuggestion = async (content: string) => {
  const chatCompletion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'assistant', content }],
  });

  const suggestion = chatCompletion.data.choices[0].message?.content;

  return suggestion;
};

const getNotes = (input: string) => {
  const noteIndex = input.indexOf('Note:');

  if (noteIndex !== -1) {
    return input.slice(noteIndex + 5).trim();
  }

  const notesIndex = input.indexOf('Notes:');
  if (notesIndex !== -1) {
    return input.slice(notesIndex + 6).trim();
  }

  return '';
};

export const generateWorkoutPrompt = ({
  mode,
  target,
  totalSets,
}: WorkoutSuggestionFormData): string => {
  if (!target) {
    throw new Error('Specific muscle group is required');
  }

  const prompt = `Generate a ${mode} workout routine for a ${target} workout. The workout should include a variety of exercises targeting all major muscles in the selected area. The total number of sets for all exercises combined should be ${totalSets} or less. Please provide the routine in the following format:\n\n| Exercise Name | Number of Sets | Number of Reps |\n| ------------- | -------------- | -------------- |\n and always include the header row in the response. You can also include any additional notes below the table.\n\n`;

  return prompt;
};

type ExerciseData = Pick<Exercise, 'name' | 'sets' | 'reps'>;

export const parsePrompt = (
  input: string
): { exercises: ExerciseData[]; notes?: string } => {
  const lines = input.trim().split('\n');
  const header = lines[0].split('|').map(item => item.trim());
  const exerciseData: ExerciseData[] = [];

  for (const line of lines.slice(2)) {
    const values = line.split('|').map(item => item.trim());
    if (values.length === header.length) {
      const exercise = {
        name: values[header.indexOf('Exercise Name')],
        sets: parseInt(values[header.indexOf('Number of Sets')]),
        reps: values[header.indexOf('Number of Reps')]
          .split('-')
          .map(rep => parseInt(rep)),
      };
      exerciseData.push(exercise);
    }
  }

  const notes = getNotes(input);

  return {
    exercises: exerciseData,
    notes,
  };
};
