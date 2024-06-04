import { useEffect } from 'react';

type UseOutsideClickType = {
  ref: React.RefObject<HTMLElement>;
  callback: () => void;
};

export const useOutsideClick = ({ ref, callback }: UseOutsideClickType) => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [ref, callback]);
}