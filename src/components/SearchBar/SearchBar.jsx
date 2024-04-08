import css from "../SearchBar/SearchBar.module.css";
import { toast } from "react-hot-toast";

const SearchBar = ({ onSubmit }) => {
    const handleClick = (event) => {
    event.preventDefault();
    const searchInputValue = event.target.form.elements.searchInput.value.trim();
    if (searchInputValue === "") {
      toast.error("Enter text to search for images.");
      return;
    }
    onSubmit(searchInputValue); 
  };
  return (
    <header className={css.searchWrapper}>
      <form>
        <input
          className={css.inputText}
          type="text"
          name="searchInput"
          placeholder="Search images and photos"
        />
        <button type="submit" onClick={handleClick}>
          Search
        </button>
      </form>
    </header>
  );
};

export default SearchBar;