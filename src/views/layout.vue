<template>
  <div class="container">
    <Header>
      <slot></slot>
    </Header>

    <LoadingList v-if="loading && list.length === 0" />
    <ErrorContainer v-else-if="error" :text="error" />
    <CardList v-else :loading="loading" :items="list" />

    <div id="bottom-feeder"></div>
  </div>
</template>

<script>
import ErrorContainer from "@/components/Error.vue";
import Header from "@/components/Header.vue";
import LoadingList from "@/components/Loading.vue";
import CardList from "@/components/CardList.vue";
const THROTTLE_TIMEOUT = 5000;
const BOTTOM_LEEWAY = 200;

export default {
  name: "Layout",
  props: ["list", "error", "loading", "loader"],
  components: {
    Header,
    CardList,
    LoadingList,
    ErrorContainer,
  },
  data() {
    return {
      throttler: false,
    };
  },
  mounted() {
    document.addEventListener("scroll", this.scroll);
  },
  beforeUnmount() {
    document.removeEventListener("scroll", this.scroll);
  },
  methods: {
    scroll() {
      const valx = document.getElementById("bottom-feeder");
      const { y } = valx.getBoundingClientRect();
      const inner = window.innerHeight;

      if (y < inner + BOTTOM_LEEWAY) this.throttle(this.loader);
    },
    throttle(cb) {
      if (this.throttler) return;
      const self = this;

      cb();
      this.throttler = true;

      setTimeout(() => {
        self.throttler = false;
      }, THROTTLE_TIMEOUT);
    },
  },
};
</script>

<style lang="scss" scoped>
#bottom-feeder {
  padding: 2rem;
  margin: 2rem 0;
}
.container {
  position: relative;
}
</style>
