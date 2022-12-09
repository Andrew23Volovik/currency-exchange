<template>
  <div class="card" :class="{ active: isActive }" @click="$emit('click')">
    <h2 class="card__title">{{ title }}</h2>
    <span class="card__course">{{ amount }}</span>
  </div>
</template>

<script>
export default {
  name: 'TheCardComponent',
  props: {
    title: {
      type: String,
      required: false,
    },
    amount: {
      type: Number,
      required: false,
    },
    isActive: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
@media (min-width: 320px) {
  .card {
    display: flex;
    justify-content: space-around;
    padding: 1rem;
    margin: 0.3rem;
    background-color: $first-color;
    border-radius: 1rem;
    box-shadow: 0px 0px 3px rgba(243, 246, 244, 0.1);
    border: 1px solid rgba($second-color, 0.2);
    transition: 0.5s all ease;
    cursor: pointer;
    &__title {
      font-size: 16px;
      line-height: 16px;
      color: $second-color;
    }
    &__course {
      display: flex;
      font-size: 16px;
      line-height: 16px;
      font-weight: 300;
      color: $second-color;
    }
  }
  .active {
    background-color: $fourth-color;
  }
}

@media (min-width: 481px) {
}

@media (min-width: 768px) {
  .card {
    &:hover {
      border: 1px solid $fourth-color;
    }
    &__title {
      font-size: 18px;
      line-height: 18px;
    }
    &__course {
      font-size: 18px;
      line-height: 18px;
    }
  }
}

@media (min-width: 992px) {
}

@media (min-width: 1200px) {
}
</style>