<template>
  <div class="header">
    <!-- item to be displayed... -->
    <slot></slot>
  </div>
</template>

<script>
export default { name: "Header" };
</script>

<style lang="scss" scoped>
.header {
  padding: 6rem 1.5rem;
  background: var(--gray-light);
  text-align: left;

  @media (min-width: 600px) and (max-width: 960px) {
    padding: 7rem 5rem;
  }

  @media only screen and (min-width: 960px) {
    padding: 8rem 10rem;
  }
}
</style>
