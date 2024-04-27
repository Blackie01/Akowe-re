'use client'
import React, { useEffect, useState } from 'react';
import { useNotification } from './useNotification';
import { useDispatch } from 'react-redux';
// import { newNotification, Notification as NotificationType } from '../redux/notificationSlice';
import Snackbar from '@mui/material/Snackbar';
import {clearNotification} from '../redux/notificationSlice'

export function Notification(): JSX.Element | null {
  const { data, messageId } = useNotification();
  const [notOpen, setNotOpen] = useState(!!data.message);
  const dispatch = useDispatch();
  const [ severityColor, setSeverityColor ] = useState<string>()

  useEffect(() => {
    setNotOpen(!!data.message);
  }, [data.message]);

  useEffect(() => {
    if ((data as any).backgroundColor == 'success') {
      setSeverityColor('#027c39')
    } else if ((data as any).backgroundColor == 'failure') {
      setSeverityColor('#901717')
    } else if ((data as any).backgroundColor == 'warning'){
      setSeverityColor('#b8591e')
    }
  }, [(data as any).backgroundColor])

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={notOpen}
      autoHideDuration={3000}
      onClose={() => dispatch(clearNotification())}
      message={data.message}
      ContentProps={{style: {backgroundColor: severityColor || '#5b87fe'}}}

      action={
        <React.Fragment>
          {/* <Button color="secondary" size="small" onClick={handleClose}>
            Close
          </Button> */}
          {/* <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton> */}
        </React.Fragment>
      }
    />
  );
}
