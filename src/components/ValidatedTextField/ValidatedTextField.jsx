import { TextField } from '@mui/material';

const ValidatedTextField = ({
  label,
  value,
  onChange,
  error,
  helperText,
  type = 'text',
  ...props
}) => (
  <TextField
    fullWidth
    required
    label={label}
    value={value}
    onChange={onChange}
    error={error}
    helperText={error ? helperText : ''}
    type={type}
    {...props}
  />
);

export default ValidatedTextField;