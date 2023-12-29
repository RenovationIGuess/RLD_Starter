import { Modal } from 'antd';
import React, { useState } from 'react';
import './ConfirmModal.scss';
import { MdRadioButtonChecked, MdRadioButtonUnchecked } from 'react-icons/md';

const ConfirmModal = ({
  loading = false,
  confirmTitle,
  confirmMessage,
  confirmModalOpen,
  setConfirmModalOpen,
  callback,
}) => {
  // Do not show anymore
  const [checked, setChecked] = useState(false);

  const handleCancel = () => {
    setConfirmModalOpen(!confirmModalOpen);
  };

  const handleConfirm = () => {
    // setConfirmModalOpen(!confirmModalOpen);
    setTimeout(() => {
      callback();
    }, 0);
  };

  return (
    <Modal
      className="custom-modal"
      zIndex={9999}
      width={380}
      centered
      open={confirmModalOpen}
      onCancel={() => {
        setConfirmModalOpen(!confirmModalOpen);
      }}
      footer={[
        <div
          key={'confirm-modal-footer'}
          className="flex items-center justify-center pt-1 pb-2"
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCancel();
            }}
            className="account-edit-btn account-edit-cancel-btn"
            // key={'confirm-modal-cancel-btn'}
          >
            Cancel
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleConfirm();
            }}
            className="account-edit-btn account-edit-confirm-btn"
            // key={'confirm-modal-confirm-btn'}
          >
            {!loading ? (
              <>Confirm</>
            ) : (
              <>
                <span className="my-loader account-bg-loader"></span>
                Loading...
              </>
            )}
          </button>
        </div>,
      ]}
    >
      <header className="confirm-box__header">
        <div className="confirm-box__title">{confirmTitle}</div>
      </header>
      <div className="confirm-box__content">
        <span>{confirmMessage}</span>
        <div className="newpost-radio" onClick={() => setChecked(!checked)}>
          {checked ? (
            <MdRadioButtonChecked className="radio-icon-checked" />
          ) : (
            <MdRadioButtonUnchecked className="radio-icon-unchecked" />
          )}
          <div className="copyright-settings-original-radio-name">
            Do not show again
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;
