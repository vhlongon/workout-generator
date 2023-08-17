import { useEffect, useState } from 'react';

export const useConfirmationState = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<string | null>(null);

  useEffect(() => {
    if (confirmation) {
      const timeoutId = setTimeout(() => {
        setConfirmation(null);
      }, 2000);
      return () => clearTimeout(timeoutId);
    }
  }, [confirmation]);

  return {
    error,
    setError,
    isLoading,
    setIsLoading,
    confirmation,
    setConfirmation,
  };
};
