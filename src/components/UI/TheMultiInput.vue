<template>
  <div class="multiinput">
    <label for="currency" class="multiinput__label">{{ label }}</label>
    <div class="multiinput__wrapper">
      <input
        v-if="!error"
        type="number"
        id="currency"
        class="multiinput__wrapper__input"
        @focus="$emit('focus', $event)"
        @input="$emit('input', +$event.target.value)"
        :value="Math.floor(this.value * 1000) / 1000"
      />
      <span v-if="error" class="multiinput__wrapper__span"></span>
      <TheDropdown
        :defaultCurrency="defaultCurrency"
        @changeSelected="$emit('changeSelected', $event)"
      />
    </div>
    <p v-if="error" class="multiinput__error" @click="reload">
      Max number of currency 10 000$
      <mdicon
        v-if="error"
        name="reload"
        size="22"
        class="multiinput__error__icon"
      />
    </p>
  </div>
</template>

<script>
import TheDropdown from './TheDropdown.vue';

export default {
  name: 'TheDropdownComponent',
  components: { TheDropdown },
  props: {
    label: {
      type: String,
      required: true,
    },
    defaultCurrency: {
      type: String,
      required: true,
    },
    error: {
      type: Boolean,
    },
    model: {
      prop: 'value',
      event: 'input',
    },
    value: Number,
  },
  methods: {
    reload() {
      this.$emit('error', false);
    },
  },
};
</script>

<style lang="scss" scoped>
@media (min-width: 320px) {
  .multiinput {
    width: 100%;
    &__wrapper {
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
      &__icon {
        padding: auto;
      }
      &__input {
        padding: 0.3rem;
        font-size: 16px;
        line-height: 16px;
        width: 100%;
        border: none;
        color: $second-color;
        border-radius: 0.3rem;
        background-color: $first-color;
        &:focus {
          outline: none;
        }
      }
      &__span {
        margin: 0.3rem;
        padding: 0.3rem;
        width: 100%;
      }
    }
    &__error {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 0.5rem;
      font-size: 16px;
      line-height: 16px;
      color: $danger-color;
      cursor: pointer;
      &__icon {
        margin-left: 0.5rem;
        cursor: pointer;
      }
    }
    &__label {
      font-size: 16px;
      line-height: 16px;
      margin-left: 0.3rem;
      font-weight: 700;
      color: $second-color;
    }
  }
}

@media (min-width: 481px) {
}

@media (min-width: 768px) {
  .multiinput {
    &__wrapper {
      font-size: 18px;
      line-height: 18px;
      &__input {
        padding: 0.5rem;
        font-size: 18px;
        line-height: 18px;
      }
    }
    &__label {
      font-size: 18px;
      line-height: 18px;
      font-weight: 700;
    }
  }
}

@media (min-width: 992px) {
  .multiinput {
    &__label {
      font-size: 20px;
      line-height: 20px;
      font-weight: 700;
    }
  }
}

@media (min-width: 1200px) {
}
</style>