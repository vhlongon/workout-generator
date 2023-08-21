import { getErrorMessage } from '@/helpers/format';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

type SubmitDataOptions<FormData, Data> = {
  action: (data: FormData) => Promise<Data>;
};
type ActionReturnData<Data> = undefined | { error?: string; data?: Data };

export const useSubmitAction = <Data = unknown,>({
  action,
}: SubmitDataOptions<FormData, ActionReturnData<Data>>) => {
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
        setError(getErrorMessage(error));
      }
    });
  };

  return { isPending, error, handleSubmit };
};
