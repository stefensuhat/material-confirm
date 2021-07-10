import ConfirmDialog from './components/ConfirmDialog';
import PropTypes from 'prop-types';
import React, { useCallback, useState } from 'react';

const ConfirmDialogContext = React.createContext(null);

const defaultOptions = {
  message: '',
  confirmationText: 'Confirm',
  title: '',
  dialogProps: {},
  titleProps: {},
  content: null,
  onOkClick: () => {},
  onCancelClick: () => {},
};

const propTypes = {
  children: PropTypes.node.isRequired,
};
const defaultProps = {};

// options contain  {
//     message: '',
//     confirmationText: 'Confirm',
//     title: '',
//     dialogProps: {},
//     titleProps: {},
//     okButtonProps: {},
//     cancelButtonProps: {},
//     content: null,
//     onOkClick: () => {},
//     onCancelClick: () => {},
//   },

function ConfirmProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [opts, setOpts] = useState(defaultOptions);
  const [isLoading, setIsLoading] = useState(false);

  const confirm = useCallback((options = {}) => new Promise((resolve) => {
    setOpts((current) => ({ ...current, ...options }));
    setOpen(true);
    resolve();
  }), []);

  const handleToggle = (status = true) => {
    setOpen(status);

    if (!status) {
      setIsLoading(false);
    }
  };

  const handleOkClick = useCallback(async () => {
    setIsLoading(true);

    await opts.onOkClick();

    setIsLoading(false);
    handleToggle(false);
  }, [opts]);

  const handleCancelClick = useCallback(async () => {
    await opts.onCancelClick();
    handleToggle(false);
  }, [opts]);

  return (
    <>
      <ConfirmDialogContext.Provider value={confirm}>
        {children}
      </ConfirmDialogContext.Provider>

      <ConfirmDialog
        open={open}
        isLoading={isLoading}
        options={opts}
        onCancelClick={handleCancelClick}
        onOkClick={handleOkClick}
      />
    </>
  );
}

ConfirmProvider.propTypes = propTypes;
ConfirmProvider.defaultProps = defaultProps;

const useConfirm = () => {
  const context = React.useContext(ConfirmDialogContext);

  if (context === undefined) {
    throw new Error('useConfirm must be used within a ConfirmProvider');
  }

  return context;
};

export { useConfirm, ConfirmProvider };
