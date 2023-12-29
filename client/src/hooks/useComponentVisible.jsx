import { useState, useEffect, useRef } from 'react';

export default function useComponentVisible(
  initialIsVisible,
  includedElement,
  callback
) {
  const [isComponentVisible, setIsComponentVisible] =
    useState(initialIsVisible);
  const ref = useRef(null);

  const handleClickOutside = (event) => {
    // The element that if we clicked in it will not conflict with the ref
    const element = document.querySelector('.' + includedElement);
    if (element?.contains(event.target)) {
      return;
    }
    if (ref.current && !ref.current.contains(event.target)) {
      setIsComponentVisible(false);
      if (isComponentVisible) callback && callback();
    }
  };

  useEffect(() => {
    document.removeEventListener('click', handleClickOutside, true);
    document.addEventListener('click', handleClickOutside, true);
    return () => {
      document.removeEventListener('click', handleClickOutside, true);
    };
  }, [isComponentVisible]);

  return [ref, isComponentVisible, setIsComponentVisible];
}
