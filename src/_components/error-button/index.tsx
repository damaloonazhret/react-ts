import { useState } from 'react';
import classNames from 'classnames/bind';
import style from './index.module.scss';

const cn = classNames.bind(style);
const BLOCK_NAME = 'Error-button';

export const ErrorButton = () => {
  const [error, setError] = useState<boolean>(false);

  const throwError = () => {
    setError(true);
  };

  if (error) {
    throw new Error('error inside error-button component');
  }

  return (
    <>
      <button className={cn(BLOCK_NAME)} onClick={throwError}>
        Throw error
      </button>
    </>
  );
};
