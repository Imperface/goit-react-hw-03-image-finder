import css from './Button.module.css';
export const Button = ({ text, type, onLoadMoreClick }) => {
  return (
    <button className={css.button} onClick={onLoadMoreClick} type={type}>
      {text}
    </button>
  );
};
