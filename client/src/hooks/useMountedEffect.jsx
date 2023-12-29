import { useEffect, useRef, useState } from 'react';

// Use to not run on the first render
const useMountedEffect = (callback, deps) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) callback();
    else didMount.current = true;
  }, deps);
};

export default useMountedEffect;
