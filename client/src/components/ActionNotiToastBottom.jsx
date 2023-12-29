import clsx from 'clsx';
import React, { useEffect, useRef } from 'react';

const ActionNotiToastBottom = ({ bottomToast }) => {
  const toastRef = useRef();

  useEffect(() => {
    if (bottomToast.show) {
      toastRef.current.classList.add('from-bottom--active');
    } else {
      if (toastRef.current.classList.contains('from-bottom--active'))
        setTimeout(() => {
          toastRef.current.classList.remove('from-bottom--active');
        }, 1500);
    }
  }, [bottomToast.show]);

  return (
    <div ref={toastRef} className={clsx('action-noti-toast', 'from-bottom')}>
      {bottomToast.show && (
        <span className="my-loader noti-toast__loader"></span>
      )}
      {bottomToast.message}
    </div>
  );
};

export default ActionNotiToastBottom;
