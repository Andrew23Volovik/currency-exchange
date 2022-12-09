<template>
  <header class="header">
    <div class="container">
      <div class="header__wrapper">
        <div class="header__logo">
          <mdicon name="piggy-bank" class="header__logo__icon" />
          <span>CE</span>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'TheHeaderComponent',
};
</script>

<style lang="scss" scoped>
@media (min-width: 320px) {
  .header {
    height: 3rem;
    background-color: $first-color;
    padding: 0.5rem;
    &__wrapper {
      display: flex;
      margin-left: auto;
    }
    &__logo {
      display: flex;
      cursor: pointer;
      svg {
        width: 32px;
        height: 32px;
      }
      &__icon {
        margin-right: 0.5rem;
        color: $second-color;
      }
      span {
        display: flex;
        align-items: center;
        color: $second-color;
        font-size: 32px;
        line-height: 32px;
        font-weight: 700;
      }
    }
  }
}

@media (min-width: 481px) {
  .header {
    height: 4rem;
    &__logo {
      svg {
        width: 36px;
        height: 36px;
      }
      span {
        font-size: 36px;
        line-height: 36px;
      }
    }
  }
}

@media (min-width: 768px) {
  .header {
    &__logo {
      svg {
        width: 40px;
        height: 40px;
      }
      span {
        font-size: 40px;
        line-height: 40px;
      }
    }
  }
}

@media (min-width: 992px) {
  .header {
    &__logo {
      svg {
        width: 48px;
        height: 48px;
      }
      span {
        font-size: 48px;
        line-height: 48px;
      }
    }
  }
}
</style>