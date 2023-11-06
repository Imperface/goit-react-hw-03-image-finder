import css from './SearchForm.module.css';
export const SearchForm = ({
  onSearchFormSubmit,
  inputType,
  inputName,
  buttonType,
}) => {
  return (
    <form className={css.form} onSubmit={onSearchFormSubmit}>
      <input type={inputType} name={inputName} required />
      <button className={css.button} type={buttonType}></button>
    </form>
  );
};
