export class PixabayApi {
  constructor() {
    this.BASE_URL = 'https://pixabay.com/api/?';
    this.KEY = '39451943-1768e822566f11dd60ab4e4d9';
    this.per_page = 12;
    this.page = 1;
    this.totalHits = 0;
    this.currentHits = 0;
  }

  async fetchImg(searchQuery) {
    const params = new URLSearchParams({
      key: this.KEY,
      q: searchQuery,
      image_type: 'photo',
      orientatino: 'horizontal',
      page: this.page,
      per_page: this.per_page,
      safesearch: true,
    });

    const endpoint = this.BASE_URL + params.toString();

    try {
      const fetchData = await fetch(endpoint);
      // console.log(fetchData);
      // this.currentHits += axiosQuery.data.hits.length;
      // this.totalHits = axiosQuery.data.totalHits;
      return await fetchData.json();
    } catch {
      console.log('Fetch error');
    }
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
}
