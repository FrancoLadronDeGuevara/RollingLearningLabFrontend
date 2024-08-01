import { useState } from 'react';

const useAlert = () => {
  const [alert, setAlert] = useState({
    open: false,
    message: '',
    severity: 'info'
  });

  const showAlert = (message, severity = 'info') => {
    setAlert({ open: true, message, severity });
  };

  const hideAlert = () => {
    setAlert(prev => ({ ...prev, open: false }));
  };

  return { alert, showAlert, hideAlert };
};

export default useAlert;