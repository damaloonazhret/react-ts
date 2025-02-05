import { ERROR_DELAY } from '../../../../../_constants/common.ts';

type TProps = {
  setError: (state: boolean) => void;
  setErrorMessage: (msg: string) => void;
  message?: string;
  delay?: number;
};

export const handleError = ({
  setErrorMessage,
  message = 'Something went wrong.',
  setError,
  delay = ERROR_DELAY,
}: TProps) => {
  setError(true);
  setErrorMessage(message);
  setTimeout(() => setError(false), delay);
};
