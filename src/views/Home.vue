<template>
  <Layout
    :loader="loadPhotos"
    :list="photoList"
    :loading="loadingList"
    :error="loadingError"
  >
    <div class="search-container">
      <form @submit.prevent="search" class="">
        <Input
          :text="query"
          :value="query"
          @update:value="query = $event"
          :submitter="search"
        />
      </form>
    </div>
  </Layout>
</template>

<script>
import Layout from "@/views/layout.vue";
import Input from "@/components/Input.vue";

export default {
  name: "Home",
  components: { Layout, Input },
  data() {
    return {
      query: "",
    };
  },
  computed: {
    photoList() {
      return this.$store.state.photos;
    },
    loadingList() {
      return this.$store.state.loading;
    },
    loadingError() {
      return this.$store.state.error;
    },
  },
  mounted() {
    this.loadPhotos();
  },
  methods: {
    search() {
      this.$router.push({ path: "/search", query: { q: this.query } });
    },
    loadPhotos() {
      return this.$store.dispatch("getPhotos");
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
}
</style>
