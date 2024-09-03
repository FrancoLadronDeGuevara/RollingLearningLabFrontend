import "./DefaultButton.css";
const DefaultButton = ({
  buttonText,
  onclick,
  styles,
  icon = null,
  className = "default-button",
}) => {
  return (
    <button className={className} style={styles} onClick={onclick}>
      {icon}
      {buttonText}
    </button>
  );
};

export default DefaultButton;
