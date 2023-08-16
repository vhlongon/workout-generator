'use client';
import { generateSuggestionAction } from '@/actions/generateSuggestionAction';
import { formatOptions } from '@/helpers/format';
import { getRandomLoadingPhrase } from '@/helpers/value';
import { FormProps, SuggestionFormData, WorkoutFormData } from '@/types';
import { Mode, Target } from '@prisma/client';
import React, { useId, useState, useTransition } from 'react';
import { Select } from '../../components/Select';

type SuggestionFormProps = FormProps<SuggestionFormData, WorkoutFormData>;

export const SuggestionForm = ({
  initialValues: data,
  onCompleted,
  onError,
  onSubmitStart,
  onSuccess,
  buttonText,
}: SuggestionFormProps) => {
  const id = useId();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState<SuggestionFormData>(data);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  console;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmitStart?.();
    startTransition(async () => {
      try {
        const data = await generateSuggestionAction(formData);

        if ('error' in data) {
          onError?.(data.error);
          return;
        }

        onSuccess?.({ ...data, ...formData });
      } catch (error) {
        onError?.((error as Error).message);
      } finally {
        onCompleted?.();
      }
    });
  };

  return (
    <div className="max-w-sm">
      <p className="text-lg font-accent tracking-widest text-accent text-center mb-2">
        Get a workout suggestion
      </p>

      <form
        className="max-w-md min-w-[300px] w-full flex flex-col gap-2"
        onSubmit={handleSubmit}
        id={id}
      >
        <div className="form-control">
          <label className="label text-sm text text-gray-400" htmlFor="mode">
            Mode
          </label>
          <Select
            onChange={handleInputChange}
            name="mode"
            id="mode"
            value={formData.mode}
            options={formatOptions(Mode)}
          ></Select>
        </div>

        <div className="form-control">
          <label className="label text-sm text text-gray-400" htmlFor="target">
            Target
          </label>
          <Select
            onChange={handleInputChange}
            name="target"
            id="target"
            value={formData.target}
            options={formatOptions(Target)}
          ></Select>
        </div>

        <div className="form-control">
          <label className="label text-sm text text-gray-400" htmlFor="target">
            Target
          </label>
          <input
            className="input w-14 input-sm input-bordered"
            type="number"
            name="totalSets"
            min={1}
            id="totalSets"
            required
            value={formData.totalSets}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex w-full flex-col gap-2 justify-center">
          <button
            className="btn btn-accent btn-sm mx-auto mt-2"
            type="submit"
            disabled={isPending}
          >
            {isPending ? (
              <>
                <span className="loading loading-spinner"></span>
                loading
              </>
            ) : (
              <span>{buttonText}</span>
            )}
          </button>
          {isPending && (
            <span className="text-xs text-center text-secondary w-[280px] mx-auto animate-pulse">
              {getRandomLoadingPhrase()}
            </span>
          )}
        </div>
      </form>
    </div>
  );
};
