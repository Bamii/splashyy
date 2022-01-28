<template>
  <Layout
    :loader="loadPhotos"
    :list="photoList"
    :loading="loadingList"
    :error="loadingError"
  >
    <div class="search-container">
      <template v-if="loadingList">Searching for </template>
      <template v-else>Search Results for </template>

      <span class="search-text">"{{ searchText }}"</span>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/views/layout.vue";

export default {
  name: "Search",
  components: { Layout },
  data() {
    return {
      searchText: "",
    };
  },
  computed: {
    photoList() {
      return this.$store.state.search.results;
    },
    loadingList() {
      return this.$store.state.loading;
    },
    loadingError() {
      return this.$store.state.error;
    },
  },
  mounted() {
    this.searchText = this.$route.query.q;
    this.loadPhotos();
  },
  methods: {
    loadPhotos() {
      return this.$store.dispatch("searchPhotos", this.searchText);
    },
  },
};
</script>

<style lang="scss" scoped>
.search-container {
  font-size: 1.8rem;
  font-weight: 400;
  color: var(--blue-dark);

  @media (min-width: 600px) {
    font-size: 2.5rem;
  }

  .search-text {
    color: var(--gray-dark);
  }
}
</style>
