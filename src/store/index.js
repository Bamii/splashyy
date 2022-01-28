import { createStore } from "vuex";
import axios from "axios";
const { UNSPLASH_CLIENT_KEY = "eg99CQE4E4auZzqv63Lv7LNpcRCq-lMz9q3w1dwzPSg" } =
  process.env;
// const GET_PHOTOS = `https://api.unsplash.com/photos/?client_id=${UNSPLASH_CLIENT_KEY}`;
// const SEARCH_PHOTOS = `https://api.unsplash.com/search/photos?client_id=${UNSPLASH_CLIENT_KEY}&page=1&query=`;

export default createStore({
  state: {
    page: 1,
    photos: [],
    loading: false,
    error: null,
    search: {
      page: 1,
      text: "",
      results: [],
    },
  },
  mutations: {
    updatePhotos(state, { photos, page }) {
      state.photos = [...state.photos, ...photos];
      state.page = ++page;
    },
    updateSearch(state, { query, result, page }) {
      state.search.text = query;
      state.search.results = [...state.search.results, ...result];
      state.search.page = ++page;
    },
    loadingPhotos(state, { loading }) {
      state.loading = loading;
    },
    setError(state, { error }) {
      state.error = error;
    },
    clearError(state) {
      state.error = null;
    },
  },
  actions: {
    getPhotos({ commit, state }) {
      if (state.loading) return;
      commit("loadingPhotos", { loading: true });

      console.log(`fetching page ${state.page}.`);
      return axios
        .get(
          `https://api.unsplash.com/photos/?client_id=${UNSPLASH_CLIENT_KEY}&page=${state.page}`
        )
        .then((response) => {
          commit("updatePhotos", {
            photos: Object.values(response.data),
            page: state.page,
          });
          return response.data;
        })
        .catch((error) => {
          commit("setError", { error: error.message });
          return "Error!";
        })
        .finally(() => {
          commit("loadingPhotos", { loading: false });
        });
    },
    searchPhotos({ commit, state }, query) {
      if (state.loading) return;

      let page = 1;
      if (state.search.text === query) page = state.search.page;
      commit("loadingPhotos", { loading: true });

      console.log(`searching page ${page} for query ${query}`);
      return axios
        .get(
          `https://api.unsplash.com/search/photos?client_id=${UNSPLASH_CLIENT_KEY}&page=${page}&query=${query}>`
        )
        .then((response) => {
          commit("updateSearch", {
            query,
            page,
            result: Object.values(response.data.results),
          });
          return response.data.results;
        })
        .catch((error) => {
          commit("setError", { error: error.message });
          return "Error!";
        })
        .finally(() => {
          commit("loadingPhotos", { loading: false });
        });
    },
  },
  modules: {},
});
