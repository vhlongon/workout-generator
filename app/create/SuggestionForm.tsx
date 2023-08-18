'use client';
import { generateSuggestionAction } from '@/actions/generateSuggestionAction';
import { ModeSelect } from '@/components/ModeSelect';
import { TargetSelect } from '@/components/TargetSelect';
import { getRandomLoadingPhrase } from '@/helpers/value';
import { FormProps, SuggestionFormData, WorkoutFormData } from '@/types';
import { Mode, Target } from '@prisma/client';
import { useId, useRef, useTransition } from 'react';

type SuggestionFormProps = FormProps<SuggestionFormData, WorkoutFormData>;

export const SuggestionForm = ({
  initialValues,
  onCompleted,
  onError,
  onSubmitStart,
  onSuccess,
  buttonText,
  title = 'Get a workout suggestion',
}: SuggestionFormProps) => {
  const id = useId();
  const [isPending, startTransition] = useTransition();
  const formRef = useRef<HTMLFormElement>(null);

  const suggestAction = (data: FormData) => {
    onSubmitStart?.();
    startTransition(async () => {
      const formData = {
        mode: data.get('mode') as Mode,
        target: data.get('target') as Target,
        totalSets: Number(data.get('totalSets')),
        name: data.get('name') as string,
      };

      try {
        const res = await generateSuggestionAction(formData);

        if (res.error) {
          onError?.(res.error);
          return;
        }

        if (!res.data) {
          onError?.('No data returned');
          return;
        }

        onSuccess?.({ ...res.data, ...formData });

        formRef.current?.reset();
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
        {title}
      </p>

      <form
        className="max-w-md min-w-[300px] w-full flex flex-col gap-2"
        action={suggestAction}
        id={id}
        ref={formRef}
      >
        <div className="form-control">
          <label className="label text-sm text text-gray-400" htmlFor="name">
            Give a unique name to your workout
          </label>
          <input
            className="input input-sm input-bordered"
            type="text"
            name="name"
            id="name"
            placeholder="Something cool, like Bone crusher..."
          />
          <label className="label">
            <span className="label-text-alt text-gray-400">
              if not provided the name will be mode + target and will update an
              existing workout if it exists
            </span>
          </label>
        </div>

        <div className="flex gap-4 w-full justify-between">
          <ModeSelect defaultValue={initialValues.mode} />
          <TargetSelect defaultValue={initialValues.target} />
          <div className="form-control">
            <label
              className="label text-sm text text-gray-400"
              htmlFor="target"
            >
              Sets
            </label>
            <input
              className="input w-16 input-sm input-bordered"
              type="number"
              name="totalSets"
              min={1}
              id="totalSets"
              required
              defaultValue={initialValues.totalSets}
            />
          </div>
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
