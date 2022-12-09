<template>
  <div class="search">
    <div class="search__wrapper">
      <mdicon name="magnify" class="search__input__icon" />
      <input
        class="search__input"
        type="text"
        v-model="inputValue"
        placeholder="Search currencies..."
        @input="searchFilter"
      />
    </div>
    <div class="search__list">
      <ul>
        <li
          v-for="(item, idx) in slicedSortedCurrencies"
          :key="idx"
          @click="$emit('click', item.code)"
        >
          <p>{{ item.code }} - {{ item.name }}</p>
        </li>
      </ul>
    </div>
    <span class="error" v-if="slicedSortedCurrencies.length === 0">
      No result found!
    </span>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'TheSearchComponent',
  data() {
    return {
      inputValue: '',
      sortedCurrencies: [],
    };
  },
  computed: {
    slicedSortedCurrencies() {
      if (this.inputValue === '') {
        return this.getCurencySymbolsFull.slice(0, 6);
      } else {
        return this.sortedCurrencies.slice(0, 6);
      }
    },
    ...mapGetters(['getCurencySymbolsFull']),
  },
  methods: {
    searchFilter() {
      this.sortedCurrencies = this.getCurencySymbolsFull.filter((cur) => {
        return cur.name.toLowerCase().includes(this.inputValue.toLowerCase());
      });
    },
  },
  mounted() {},
};
</script>

<style lang="scss" scoped>
@media (min-width: 320px) {
  .search {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__wrapper {
      width: 100%;
      display: flex;
      align-items: center;
      margin: 0.3rem;
      font-size: 16px;
      line-height: 16px;
      background-color: $first-color;
      border: 1px solid $second-color;
      border-radius: 0.3rem;
      transition: 0.3s border-color;
      &:hover,
      &:active,
      &:focus-within {
        border: 1px solid $fourth-color;
      }
    }
    &__input {
      width: 100%;
      padding: 0.3rem;
      font-size: 16px;
      line-height: 16px;
      border: none;
      color: $second-color;
      border-radius: 0.3rem;
      background-color: $first-color;
      &:focus {
        outline: none;
      }
      &__icon {
        padding: 0.3rem;
        svg {
          width: 20px;
          height: 20px;
          path {
            fill: $second-color;
          }
        }
      }
    }
    &__list {
      margin-top: 0.3rem;
      border-radius: 0.5rem;
      width: 100%;
      ul {
        width: 100%;
        background-color: $first-color;
        list-style: none;
        border-radius: 0.5rem;

        transition: 0.5s all ease;

        &__span {
          color: $danger-color;
          background-color: $third-color;
        }
        li {
          padding: 0.4rem;
          text-align: center;
          color: $second-color;
          background-color: $first-color;
          font-weight: 300;
          box-shadow: 0px 0px 3px -1px rgba(255, 255, 255, 0.8);
          cursor: pointer;
          &:first-child {
            border-radius: 0.5rem 0.5rem 0 0;
          }
          &:last-child {
            border-radius: 0 0 0.5rem 0.5rem;
          }
          &:hover,
          &:active,
          &:focus {
            background-color: $fourth-color;
          }
          p {
            font-size: 16px;
            line-height: 16px;
          }
        }
      }
    }
  }

  .error {
    color: $danger-color;
    font-size: 18px;
    line-height: 18px;
    font-weight: 500;
  }
}

@media (min-width: 481px) {
}

@media (min-width: 768px) {
  .search {
    &__wrapper {
      font-size: 18px;
      line-height: 18px;
    }
    &__input {
      font-size: 18px;
      line-height: 18px;
    }
    &__list {
      ul {
        li {
          p {
            font-size: 18px;
            line-height: 18px;
          }
        }
      }
    }
  }
}

@media (min-width: 992px) {
  .search {
    &__wrapper {
      font-size: 20px;
      line-height: 20px;
    }
    &__input {
      font-size: 20px;
      line-height: 20px;
      &__icon {
        svg {
          width: 22px;
          height: 22px;
        }
      }
    }
    &__list {
      ul {
        li {
          p {
            font-size: 20px;
            line-height: 20px;
          }
        }
      }
    }
  }
}

@media (min-width: 1200px) {
}
</style>