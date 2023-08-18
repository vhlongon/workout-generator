import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

type SubmitDataOptions<FormData, Data> = {
  action: (data: FormData) => Promise<Data>;
};

export const useSubmitAction = <Data = unknown,>({
  action,
}: SubmitDataOptions<
  FormData,
  undefined | { error?: string; data?: Data }
>) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');

  const handleSubmit = (data: FormData) => {
    startTransition(async () => {
      try {
        const res = await action(data);

        if (res && res.error) {
          setError(res.error);
          return;
        }

        router.refresh();
      } catch (error) {
        setError((error as Error).message);
      }
    });
  };

  return { isPending, error, handleSubmit };
};
