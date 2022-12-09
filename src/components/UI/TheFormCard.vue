<template>
  <div class="formcard">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'WrapperComponent',
};
</script>

<style lang="scss" scoped>
@media (min-width: 320px) {
  .formcard {
    min-width: 18rem;
    padding: 1rem 1rem 1.5rem 1rem;
    background-color: $third-color;
    border-radius: 1rem;
    border: 1px solid rgba($second-color, 0.05);
    box-shadow: 2px 2px 5px rgba(243, 246, 244, 0.1);
    z-index: 1;
  }
}

@media (min-width: 481px) {
  .formcard {
    min-width: 24rem;
  }
}

@media (min-width: 768px) {
  .formcard {
    min-width: 36rem;
    padding: 1.5rem 1.5rem 2rem 1.5rem;
  }
}

@media (min-width: 992px) {
  .formcard {
    min-width: 48rem;
  }
}
@media (min-width: 1200px) {
  .formcard {
    min-width: 64rem;
    padding: 2rem 3rem 3rem 3rem;
  }
}
</style>