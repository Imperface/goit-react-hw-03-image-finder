import { SearchBar, ImageGallery, Modal } from 'components';
import { Component } from 'react';

export class App extends Component {
  state = {
    error: null,
    imgData: null,
    searchQuery: '',
    page: 1,
    loader: false,
    modalIsOpen: false,
    modalData: null,
    loadMore: false,
  };

  fetchDataBySearchQuery = async (searchQuery = null) => {
    // get basic params
    const BASE_URL = 'https://pixabay.com/api/?';
    const KEY = '39451943-1768e822566f11dd60ab4e4d9';
    const per_page = 12;

    // convert params to URLSearchParams
    const params = new URLSearchParams({
      key: KEY,
      q: searchQuery ?? this.state.searchQuery,
      image_type: 'photo',
      orientatino: 'horizontal',
      page: this.state.page,
      per_page: per_page,
      safesearch: true,
    });

    // create url string request
    const endpoint = BASE_URL + params.toString();

    // try to get request
    try {
      this.setState({
        loader: true,
      });
      const fetchedData = await fetch(endpoint);
      return fetchedData.json();
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        loader: false,
      });
    }
  };

  setSearchQuery = async newSearchQuery => {
    // set new search query in state
    this.setState({ searchQuery: newSearchQuery });
  };

  checkHits = (amountOfHits, hitsPerPage) => {
    // calc amount of pages
    const amountOfPages = Math.ceil(amountOfHits / hitsPerPage);

    // if amount <= 1 && amoutn <= page, amount of items in fetch <= 12, delete load more btn
    // if amount > 1 && amount > page, amount of items in fetch > 12,  show load more btn

    if (amountOfPages <= 1 || this.state.page >= amountOfPages) {
      this.setState({
        loadMore: false,
      });
      console.log('amount of pages <= 1 or current page > amount of pages ');
      return;
    }
    this.setState({
      loadMore: true,
    });
  };

  componentDidUpdate = async (_, prevState) => {
    // check is searchQuery changed
    if (this.state.searchQuery !== prevState.searchQuery) {
      console.log('Update dataImages in state');

      // reset page counter when entered new search query
      this.setState({ page: 1 });

      // fetch new dataImage
      const data = await this.fetchDataBySearchQuery(this.state.searchQuery);
      console.log(data);
      this.checkHits(data.totalHits, 12);

      // update state with new dataImage
      this.updateImgData(data);
      return;
    }

    // check is page changed
    if (this.state.page !== prevState.page) {
      console.log('Next page');
      const data = await this.fetchDataBySearchQuery();

      // check amount of hits in fetch, if > 12 show loadMore btn
      this.checkHits(data.totalHits, 12);

      // get hits
      const dataHits = data.hits;

      // spread new hits to old data
      this.setState({ imgData: [...this.state.imgData, ...dataHits] });
      return;
    }
  };

  updateImgData = data => {
    // get data, clear old data and save in state new data
    const dataHits = data.hits;
    this.setState({ imgData: [...dataHits] });
  };

  checkIsDataInState = () => {
    // check is data in state
    return this.state.imgData !== null ? true : false;
  };

  openModal = (largeURL, tags) => {
    // console.log('Modal opened successfully');
    // open modal and
    this.setState({
      modalIsOpen: true,
      modalData: { largeURL, tags },
    });
  };
  closeModal = () => {
    console.log('Modal closed successfully');
    this.setState({
      modalIsOpen: false,
      modalData: null,
    });
  };
  onEscapeKeydown;

  onGalleryItemClick = e => {
    // looking for ancestor of e.target with imageGalleryItem className
    const imageGalleryItemRef = e.target.closest('.imageGalleryItem');

    // if ancestor not found, interrupt
    if (imageGalleryItemRef === null) {
      return;
    }
    const largeImageURL = imageGalleryItemRef.getAttribute('data');
    const largeImageTags = imageGalleryItemRef.getAttribute('tags');
    this.openModal(largeImageURL, largeImageTags);
  };

  onLoadMoreClick = async e => {
    // increment page in state
    this.setState({
      page: this.state.page + 1,
    });
  };

  render() {
    return (
      <>
        <SearchBar setSearchQuery={this.setSearchQuery} />
        {this.state.error !== null && (
          <p>Some error. Error message: {this.state.error}</p>
        )}
        {this.checkIsDataInState() && (
          <ImageGallery
            imagesData={this.state.imgData}
            onGalleryItemClick={this.onGalleryItemClick}
          />
        )}

        {this.state.loader && <p>Loading. Please wait...</p>}
        {this.state.loadMore && (
          <button onClick={this.onLoadMoreClick} type="button">
            Load More
          </button>
        )}
        {this.state.modalIsOpen && (
          <Modal
            closeModal={this.closeModal}
            modalData={this.state.modalData}
          />
        )}
      </>
    );
  }
}
