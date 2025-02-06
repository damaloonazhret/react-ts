import { useCallback } from 'react';

type TSetItem<ItemSetType> = {
  key: string;
  value: ItemSetType;
};

type TOutput = {
  removeItem: (key: string) => void;
  getItem: <ItemReturnType>(key: string) => ItemReturnType;
  setItem: <SetItemType>({ key, value }: TSetItem<SetItemType>) => void;
};

export const useLocalStorage = (): TOutput => {
  const setItem = useCallback(
    <SetItemType>({ key, value }: TSetItem<SetItemType>) => {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.error(error);
      }
    },
    []
  );

  const getItem = useCallback((key: string) => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : '';
    } catch (error) {
      console.error(error);
    }
  }, []);

  const removeItem = useCallback((key: string) => {
    try {
      window.localStorage.removeItem(key);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return { setItem, getItem, removeItem };
};
