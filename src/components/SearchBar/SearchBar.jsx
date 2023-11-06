import { SearchForm } from 'components';
import { Component } from 'react';

export class SearchBar extends Component {
  onSearchFormSubmit = e => {
    e.preventDefault();
    const refSearchInput = e.target.elements.searchQuery;
    const searchInputValue = refSearchInput.value;

    this.props.setSearchQuery(searchInputValue);
  };
  render() {
    return (
      <SearchForm
        inputType="text"
        inputName="searchQuery"
        buttonType="submit"
        onSearchFormSubmit={this.onSearchFormSubmit}
      />
    );
  }
  // return <header>{children}</header>;
}
