<template>
  <div class="list-container">
    <div class="columns-container">
      <div class="column" v-for="column in columns" v-bind:key="column">
        <Card
          v-for="(item, index) in shareIntoColumns(column - 1)"
          :key="item.id"
          :index="index"
          :details="item"
          @click="() => openPhoto(item)"
        />

        <Card v-if="loading" />
      </div>
    </div>
  </div>

  <teleport to="body">
    <div v-if="modalOpen" class="modal-mask">
      <div class="modal">
        <div @click="modalOpen = false" class="modal-close">X</div>
        <div class="image-container">
          <img :src="selectedPhoto?.urls.regular" alt="" />
        </div>
        <div class="details">
          <div class="detail name">{{ selectedPhoto?.user.name }}</div>
          <div class="detail location">{{ selectedPhoto?.user.location }}</div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script>
import Card from "@/components/Card.vue";

export default {
  name: "CardList",
  props: ["items", "loading"],
  components: { Card },
  data() {
    return {
      columns: 1,
      selectedPhoto: null,
      modalOpen: false,
    };
  },
  mounted() {
    this.determineColumns();
  },
  methods: {
    shareIntoColumns(index) {
      return this.$props.items.filter((e, i) => i % this.columns == index);
    },
    openPhoto(details) {
      this.selectedPhoto = details;
      this.modalOpen = true;
    },
    determineColumns() {
      const v = window.innerWidth;
      if (v < 600) {
        this.columns = 1;
      } else if (v > 600 && v < 960) {
        this.columns = 2;
      } else {
        this.columns = 3;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.list-container {
  width: auto;
  position: relative;
  top: -3rem;

  .columns-container {
    display: flex;
    margin: 0 2rem;

    .column {
      display: flex;
      flex-direction: column;
      margin-right: 2rem;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  @media only screen and (min-width: 960px) {
    .columns-container {
      margin: 0 13.5rem;
    }
  }

  @media (min-width: 600px) and (max-width: 960px) {
    .columns-container {
      margin: 0 7rem;
    }
  }
}

.card {
  margin-bottom: 2rem;
}

.modal-mask {
  position: fixed;
  width: 100vw;
  top: 0;
  height: 100vh;
  overflow-y: scroll;
  background: var(--opaque-black);

  .modal {
    display: flex;
    position: relative;
    flex-direction: column;
    width: 90%;
    margin: 6rem auto;
    border-radius: 1rem;

    .modal-close {
      position: absolute;
      top: -3.5rem;
      width: max-content;
      right: 0rem;
      color: white;
      padding: 0.8rem;
      border-radius: 0.4rem;
      cursor: pointer;

      &:hover {
        background: white;
        color: var(--blue-dark);
      }
    }

    .image-container {
      width: 100%;
      min-height: 5rem;
      background: white;
      border-radius: 1rem 1rem 0 0;

      img {
        width: 100%;
        border-radius: 1rem 1rem 0 0;
      }
    }

    .details {
      background: white;
      padding: 2rem;
      border-radius: 0 0 1rem 1rem;

      .detail {
        padding: 0.2rem 0;
        color: var(--blue-dark);

        &.name {
          font-size: 1.7rem;
        }

        &.location {
          font-size: 1rem;
          font-weight: 300;
        }
      }
    }
  }

  @media only screen and (min-width: 960px) {
    .modal {
      width: 70%;
      margin: 7rem auto;

      .modal-close {
        right: -5rem;
      }
    }
  }
}
</style>
