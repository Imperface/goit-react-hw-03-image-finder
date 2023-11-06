export const Button = ({ text, type, callback }) => {
  return (
    <button type={type} onClick={callback}>
      {text}
    </button>
  );
};
