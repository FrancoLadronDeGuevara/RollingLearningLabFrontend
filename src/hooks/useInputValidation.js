import { useState } from 'react';

const useInputValidation = (regex, initialValue = '') => {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    const isError = !regex.test(newValue);
    setError(isError);
  };

  const resetValue = () => {
    setValue('');
    setError(false);
  };

  const setCustomValue = (newValue) => {
    setValue(newValue);
    const isError = !regex.test(newValue);
    setError(isError);
  };

  return [value, error, handleChange, resetValue, setCustomValue];
};

export default useInputValidation;