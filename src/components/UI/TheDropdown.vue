<template>
  <div class="dropdown__container">
    <div class="dropdown__container__button" @click="openMenu">
      <mdicon
        :name="getCurrencyIcon"
        size="24"
        class="dropdown__container__button__icon__currency"
      />
      {{ selected }}
      <mdicon
        name="chevron-down"
        size="24"
        class="dropdown__container__button__icon__chevron"
        :class="{
          'dropdown__container__button__icon__chevron-rotate': isOpen,
        }"
      />
    </div>
    <transition name="menu">
      <div class="dropdown__container__menu" v-if="isOpen">
        <ul>
          <li v-for="(key, value, idx) in getSelectedCurencySymbols" :key="idx">
            <span @click="curentItem(value)">
              {{ value }} - {{ key.name }}
            </span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>


<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TheDropdownComponent',
  props: {
    defaultCurrency: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isOpen: false,
      selected: this.defaultCurrency,
    };
  },
  methods: {
    curentItem(value) {
      this.selected = value;
      this.isOpen = !this.isOpen;
      this.$emit('changeSelected', this.selected);
    },
    openMenu() {
      this.isOpen = !this.isOpen;
    },
    close(e) {
      if (!this.$el.contains(e.target)) {
        this.isOpen = false;
      }
    },
  },
  computed: {
    ...mapGetters(['getSelectedCurencySymbols']),
    getCurrencyIcon() {
      switch (this.selected) {
        case 'USD':
          return 'currency-usd';
        case 'EUR':
          return 'currency-eur';
        case 'UAH':
          return 'currency-uah';
        case 'GBP':
          return 'currency-gbp';
        case 'BTC':
          return 'currency-btc';
        case 'ETH':
          return 'currency-eth';
        case 'BNB':
          return 'alpha-b-circle-outline';
        case 'XRP':
          return 'alpha-x-circle-outline';
        default:
          return 'currency-usd';
      }
    },
  },
  mounted() {
    document.addEventListener('click', this.close);
  },
  beforeDestroy() {
    document.removeEventListener('click', this.close);
  },
};
</script>

<style lang="scss" scoped>
@media (min-width: 320px) {
  .dropdown__container {
    position: relative;
    display: flex;
    &__button {
      display: flex;
      justify-items: center;
      align-items: center;
      width: 100%;
      color: $second-color;
      background-color: $first-color;
      font-size: 16px;
      line-height: 16px;
      padding: 0.3rem;
      font-weight: 700;
      border-radius: 0.3rem;
      cursor: pointer;
      position: relative;
      &:hover {
        color: $fourth-color;
      }

      &__icon__currency {
        margin-right: 0.1rem;
        &:hover {
          color: $fourth-color;
        }
      }
      &__icon__chevron {
        margin-left: 0.2rem;
        transition: 0.3s all ease;
        &:hover {
          color: $fourth-color;
        }
      }
      &__icon__chevron-rotate {
        transform: rotateZ(-180deg);
      }
    }
    &__menu {
      position: absolute;
      top: 2.5rem;
      right: 0;
      width: 14rem;
      margin-top: 0.2rem;
      border-radius: 0.3rem;
      box-shadow: 0px 0px 4px -2px rgba(0, 0, 0, 0.5);
      background-color: $first-color;
      transition: 0.5s all ease;
      z-index: 10;

      ul {
        list-style: none;
        overflow: hidden;
        border-radius: 0.3rem;
        z-index: 10;
      }

      span {
        display: block;
        color: $second-color;
        font-size: 16px;
        line-height: 16px;
        padding: 0.4rem;
        font-weight: 300;
        box-shadow: 0px 0px 3px -1px rgba(255, 255, 255, 0.8);
        transition: all ease 0.5s;
        cursor: pointer;
        position: relative;
        transition: 0.5s all ease;

        &:hover,
        &:active,
        &:focus {
          background-color: $fourth-color;
          color: $second-color;
        }
      }
    }

    .menu-enter-active {
      transform-origin: top center;
      animation: rotateMenu 0.5s ease-in-out forwards;
    }

    .menu-leave-active {
      transform-origin: center top;
      animation: rotateMenu 0.5s ease-in-out reverse;
    }

    @keyframes rotateMenu {
      0% {
        transform: rotateX(-90deg);
      }
      70% {
        transform: rotateX(20deg);
      }
      100% {
        transform: rotateX(0deg);
      }
    }
  }
}

@media (min-width: 481px) {
}

@media (min-width: 768px) {
  .dropdown__container {
    &__button {
      font-size: 18px;
      line-height: 18px;
      padding: 0.5rem;
    }
    &__menu {
      top: 2.5rem;
      right: inherit;
      left: -50%;

      span {
        font-size: 18px;
        line-height: 18px;
      }
    }
  }
}

@media (min-width: 992px) {
  .dropdown__container {
    &__button {
      font-size: 20px;
      line-height: 20px;
      padding: 0.5rem;
    }
    &__menu {
      top: 3rem;
      width: 18rem;

      span {
        font-size: 20px;
        line-height: 20px;
      }
    }
  }
}

@media (min-width: 1200px) {
}
</style>