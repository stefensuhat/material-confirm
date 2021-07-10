import {
  Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle,
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import React from 'react';
import PropTypes from 'prop-types';
import { defaultDialogProps, defaultOkButtonProps, defaultCancelButtonProps } from '../constants';

const propTypes = {
  open: PropTypes.bool,
  isLoading: PropTypes.bool,
  options: PropTypes.shape({
    title: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
    message: PropTypes.string,
    confirmationText: PropTypes.string,
    dialogProps: PropTypes.object,
    titleProps: PropTypes.object,
    okButtonProps: {},
    cancelButtonProps: {},
  }),
  onCancelClick: PropTypes.func.isRequired,
  onOkClick: PropTypes.func.isRequired,
  children: PropTypes.node,
};

const defaultProps = {
  open: false,
  isLoading: false,
  options: {
    message: '',
    confirmationText: 'Confirm',
    title: '',
    dialogProps: {},
    titleProps: {},
  },
  children: null,
};

function ConfirmDialog({
  open, options, children, onOkClick, onCancelClick, isLoading,
}) {
  const {
    message, confirmationText, title, dialogProps, okButtonProps, cancelButtonProps,
  } = options;

  return (
    <Dialog open={open} {...defaultDialogProps} {...dialogProps}>
      <DialogTitle>{title}</DialogTitle>

      <DialogContent dividers>
        {message && <DialogContentText>{message}</DialogContentText>}
        {children ?? null}
      </DialogContent>

      <DialogActions>
        <Button disabled={isLoading} onClick={() => onCancelClick(false)} {...defaultCancelButtonProps} {...cancelButtonProps}>
          Cancel
        </Button>
        <LoadingButton loading={isLoading} onClick={onOkClick} {...defaultOkButtonProps} {...okButtonProps}>
          {confirmationText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

ConfirmDialog.propTypes = propTypes;
ConfirmDialog.defaultProps = defaultProps;

export default ConfirmDialog;
