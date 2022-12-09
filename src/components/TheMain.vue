<template>
  <main class="main">
    <div class="container">
      <div class="background"></div>
      <h2 class="main__title">Currency Exchange</h2>
      <TheFormCard>
        <div class="main__wrapper">
          <TheMultiInput
            :label="'From'"
            :defaultCurrency="'USD'"
            :error="isError"
            v-model="fromInput"
            @input="
              convert();
              validate();
            "
            @changeSelected="setFromCurrency"
            @focus="inputSelected = true"
            @error="changeIsError"
          />
          <TheButton icon :iconName="'swap-horizontal'"></TheButton>
          <TheMultiInput
            :label="'To'"
            :defaultCurrency="'BTC'"
            :error="isError"
            v-model="toInput"
            @input="
              convert();
              validate();
            "
            @changeSelected="setToCurrency"
            @focus="inputSelected = false"
            @error="changeIsError"
          />
        </div>
      </TheFormCard>
    </div>
    <div class="container">
      <TheFormCard>
        <h2 class="main__courses__title">Main currencies</h2>
        <div class="main__courses__wrapper">
          <TheCard
            v-for="(obj, idx) in getMainCurrencies"
            @click="
              changeActive(idx, obj.code);
              updateMainCurrencies();
            "
            :key="idx"
            :title="obj.code"
            :amount="obj.value"
            :isActive="obj.isActive"
          ></TheCard>
        </div>
        <h2 class="main__courses__title">List of currency</h2>
        <TheButton :prependIcon="'magnify-plus-outline'" @click="showModal"
          >Search</TheButton
        >
        <TheButton
          :disabled="isDisabled"
          :prependIcon="'reload'"
          @click="reloadClick"
          >Reload</TheButton
        >
        <span class="error" v-if="isErrorList">
          You cannot add the same currency!
        </span>
        <div class="main__courses__wrapper">
          <TheCard
            v-for="(obj, idx) in getDefaultListOfCurrencies"
            :key="idx"
            :title="obj.code"
            :amount="obj.value"
          ></TheCard>
        </div>
      </TheFormCard>
    </div>
    <TheModal v-if="isModal">
      <template #header>
        <p>Search for available currencies</p>
      </template>
      <template #main>
        <TheSearch @click="addCurrency"></TheSearch>
      </template>
      <template #footer>
        <TheButton @click="closeModal">Close</TheButton>
      </template>
    </TheModal>
  </main>
</template>

<script>
import { mapActions, mapGetters, mapMutations } from 'vuex';

import TheFormCard from '@/components/UI/TheFormCard.vue';
import TheMultiInput from '@/components/UI/TheMultiInput.vue';
import TheButton from './UI/TheButton.vue';
import TheCard from './UI/TheCard.vue';
import TheModal from './UI/TheModal.vue';
import TheSearch from './UI/TheSearch.vue';

export default {
  name: 'TheMainComponent',
  components: {
    TheFormCard,
    TheMultiInput,
    TheButton,
    TheCard,
    TheModal,
    TheSearch,
  },
  data() {
    return {
      isModal: false,
      isError: false,
      isErrorList: false,
      isDisabled: false,
      inputSelected: true,
      selectedFrom: 'USD',
      selectedTo: 'BTC',
      fromInput: 100,
      toInput: 0.005,
      mainCurrencies: [],
      selectedMainCurrency: 'USD',
      listOfCurrencies: ['GBP', 'BTC', 'ETH', 'BNB', 'XRP'],
    };
  },
  computed: {
    ...mapGetters([
      'getMainCurrencies',
      'getDefaultListOfCurrencies',
      'getCurrenciesData',
    ]),
  },
  methods: {
    setFromCurrency(name) {
      this.selectedFrom = name;
      this.convert();
    },
    setToCurrency(name) {
      this.selectedTo = name;
      this.convert();
    },
    changeActive(idx, code) {
      this.selectedMainCurrency = code;
      this.changeStatusMainCurrencies(idx);
    },
    updateMainCurrencies() {
      this.getMainCurrenciesData({
        base: this.selectedMainCurrency,
        list: this.listOfCurrencies,
      });
    },
    convert() {
      console.log(this.getCurrenciesData);
      if (this.inputSelected) {
        if (this.selectedFrom === 'USD') {
          this.toInput =
            this.fromInput * this.getCurrenciesData[this.selectedTo].value;
          console.log(this.getCurrenciesData[this.selectedTo].value);
        }
        const coefficient =
          this.getCurrenciesData[this.selectedTo].value /
          this.getCurrenciesData[this.selectedFrom].value;

        this.toInput = this.fromInput * coefficient;
      } else {
        const coefficient =
          this.getCurrenciesData[this.selectedFrom].value /
          this.getCurrenciesData[this.selectedTo].value;

        this.fromInput = this.toInput * coefficient;
      }
    },
    validate() {
      if (this.inputSelected) {
        if (
          this.toInput >=
          this.getCurrenciesData[this.selectedTo].value * 10001
        ) {
          this.isError = true;
        } else {
          this.isError = false;
        }
      } else {
        if (
          this.fromInput >=
          this.getCurrenciesData[this.selectedFrom].value * 10001
        ) {
          this.isError = true;
        } else {
          this.isError = false;
        }
      }
    },
    changeIsError() {
      this.fromInput = this.getCurrenciesData[this.selectedFrom].value * 10000;
      this.toInput = this.getCurrenciesData[this.selectedTo].value * 10000;
      this.isError = false;
      this.convert();
    },
    showModal() {
      this.isModal = true;
    },
    closeModal() {
      this.isModal = false;
    },
    addCurrency(code) {
      this.isModal = false;
      const result = this.listOfCurrencies.find((el) => el === code);

      if (result) {
        this.isErrorList = true;
      } else {
        this.listOfCurrencies.push(code);
        this.isErrorList = false;
        this.saveToLocaleStorage();
      }

      this.updateMainCurrencies();
    },
    saveToLocaleStorage() {
      const parsed = JSON.stringify(this.listOfCurrencies);
      sessionStorage.setItem('listOfCurrencies', parsed);
    },
    reloadClick() {
      if (this.isDisabled) {
        return 1;
      }
      this.isDisabled = true;
      setTimeout(() => {
        this.isDisabled = false;
      }, 5000);

      this.getCurencySymbols();
      this.getMainCurrenciesData({
        base: this.selectedMainCurrency,
        list: this.listOfCurrencies,
      });
      this.currenciesDataFull();
    },
    ...mapMutations(['changeStatusMainCurrencies']),
    ...mapActions([
      'getCurencySymbols',
      'getMainCurrenciesData',
      'currenciesDataFull',
    ]),
  },
  created() {
    this.getCurencySymbols();
    this.getMainCurrenciesData({
      base: this.selectedMainCurrency,
      list: this.listOfCurrencies,
    });
    this.currenciesDataFull();
  },
  mounted() {
    if (sessionStorage.getItem('listOfCurrencies')) {
      this.listOfCurrencies = JSON.parse(
        sessionStorage.getItem('listOfCurrencies')
      );
      this.updateMainCurrencies();
    }
    this.mainCurrencies = this.getMainCurrencies;
  },
};
</script>

<style lang="scss" scoped>
@media (min-width: 320px) {
  .main {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    padding-top: 1rem;
    padding-bottom: 1rem;
    gap: 2rem;
    background: linear-gradient(0deg, $second-color 60%, $first-color 40%);
    z-index: 1;
    &__title {
      margin-left: 0.5rem;
      font-size: 18px;
      line-height: 18px;
      font-weight: 500;
      color: $second-color;
      margin-bottom: 1rem;
    }
    &__wrapper {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 0.5rem;
    }
    &__courses {
      &__title {
        margin: 0.3rem;
        font-size: 16px;
        line-height: 16px;
        color: $second-color;
      }
      &__wrapper {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
      }
    }
  }
}

.error {
  color: $danger-color;
  font-size: 16px;
  font-weight: 500;
  margin-left: 1rem;
}

@media (min-width: 481px) {
  .main {
    &__title {
      font-size: 24px;
    }
    &__courses {
      &__title {
        font-size: 18px;
        line-height: 18px;
      }
    }
  }
}

@media (min-width: 768px) {
  .main {
    &__title {
      font-size: 32px;
      line-height: 32px;
    }
    &__wrapper {
      display: grid;
      flex-direction: inherit;
      grid-template-columns: 14rem auto 14rem;
      justify-items: center;
      align-items: end;
    }
    &__courses {
      &__wrapper {
        display: grid;
        flex-direction: inherit;
        grid-template-columns: 1fr 1fr;
        gap: 0.5rem;
      }
    }
  }
}

@media (min-width: 992px) {
  .main {
    &__title {
      font-size: 36px;
      line-height: 36px;
    }
    &__wrapper {
      grid-template-columns: 20rem auto 20rem;
    }
    &__courses {
      &__title {
        font-size: 20px;
        line-height: 20px;
      }
      &__wrapper {
        display: grid;
        flex-direction: inherit;
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  }
}

@media (min-width: 1200px) {
  .main {
    &__wrapper {
      grid-template-columns: 25rem auto 25rem;
    }
  }
}
</style>