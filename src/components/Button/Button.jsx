export const Button = ({ text, clickHandler }) => {
  return (
    <button type="button" onClick={clickHandler}>
      {text}
    </button>
  );
};
