import React, { useEffect } from 'react';

// Use to notify user that have they commented / replied or not
const ActionNotiToast = ({ actionToast, setActionToast }) => {
  useEffect(() => {
    if (actionToast.status) {
      setTimeout(
        () =>
          setActionToast({
            status: false,
            message: '',
          }),
        1500
      );
    }
  }, [actionToast]);

  return <div className="action-noti-toast">{actionToast.message}</div>;
};

export default ActionNotiToast;
