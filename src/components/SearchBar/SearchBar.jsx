import { SearchForm } from 'components';
import { Component } from 'react';
import css from './SearchBar.module.css';

export class SearchBar extends Component {
  onSearchFormSubmit = e => {
    e.preventDefault();
    const refSearchInput = e.target.elements.searchQuery;
    const searchInputValue = refSearchInput.value;

    this.props.setSearchQuery(searchInputValue);
  };
  render() {
    return (
      <div className={css.searchBar}>
        <SearchForm
          inputType="text"
          inputName="searchQuery"
          buttonType="submit"
          onSearchFormSubmit={this.onSearchFormSubmit}
        />
      </div>
    );
  }
  // return <header>{children}</header>;
}
