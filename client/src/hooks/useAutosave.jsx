import React from 'react';

function useAutosave(callback, delay = 1000, deps = []) {
  const savedCallback = React.useRef(); // to save the current "fresh" callback

  // keep callback ref up to date
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // create the interval
  React.useEffect(() => {
    // function to call the callback
    function runCallback() {
      savedCallback.current();
    }
    if (typeof delay === 'number') {
      // run the interval
      let interval = setInterval(runCallback, delay);
      // clean up on unmount or dependency change
      return () => clearInterval(interval);
    }
  }, [delay, ...deps]);
}

export default useAutosave;
