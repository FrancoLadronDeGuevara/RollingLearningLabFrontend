import { useState } from 'react';

const useInputValidation = (regex) => {
  const [value, setValue] = useState('');
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    const isError = !regex.test(newValue);
    setError(isError);
  };

  return [value, error, handleChange];
};

export default useInputValidation;