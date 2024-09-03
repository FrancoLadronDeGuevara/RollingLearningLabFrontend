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
    size='small'
    label={label}
    value={value}
    onChange={onChange}
    error={error}
    helperText={error ? helperText : ''}
    type={type}
    FormHelperTextProps={{ 
      sx: {
        margin: 0,
      }
    }}
    {...props}
  />
);

export default ValidatedTextField;