import Vue from 'vue';
import Vuex from 'vuex';
import { HTTP } from '@/services/axios.js';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    curencySymbolsFull: null,
    selectedCurencySymbols: null,
    mainCurrencies: [],
    defaultListOfCurrencies: null,
    currenciesData: null,
  },
  getters: {
    getCurencySymbolsFull(state) {
      const newArr = [];
      for (const key in state.curencySymbolsFull) {
        newArr.push(state.curencySymbolsFull[key]);
      }
      return newArr;
    },
    getSelectedCurencySymbols(state) {
      return state.selectedCurencySymbols;
    },
    getMainCurrencies(state) {
      return state.mainCurrencies;
    },
    getDefaultListOfCurrencies(state) {
      return state.defaultListOfCurrencies;
    },
    getCurrenciesData(state) {
      return state.currenciesData;
    },
  },
  mutations: {
    setCurencySymbolsFull(state, payload) {
      state.curencySymbolsFull = payload;
    },
    setSelectedCurencySymbols(state, payload) {
      state.selectedCurencySymbols = payload;
    },
    setMainCurrencies(state, payload) {
      state.mainCurrencies = payload;
    },
    setDefaultListOfCurrencies(state, payload) {
      state.defaultListOfCurrencies = payload;
    },
    setCurrenciesData(state, payload) {
      state.currenciesData = payload;
    },
    changeStatusMainCurrencies(state, idx) {
      state.mainCurrencies.map((el, i) => {
        if (idx === i) {
          el.isActive = true;
        } else {
          el.isActive = false;
        }
      });
    },
  },
  actions: {
    async getCurencySymbols({ commit }) {
      const key = 'xVkRD9xhaplqEDhFrqhF41Xd2pM07KCdRJ8PCpqg';
      const responseSymbols = await HTTP.get(`currencies?apikey=${key}`);
      const { USD, EUR, UAH, GBP, BTC, ETH, BNB, XRP } =
        responseSymbols.data.data;
      const selectedCurencySymbols = {
        USD,
        EUR,
        UAH,
        GBP,
        BTC,
        ETH,
        BNB,
        XRP,
      };

      commit('setCurencySymbolsFull', responseSymbols.data.data);
      commit('setSelectedCurencySymbols', selectedCurencySymbols);
    },
    async getMainCurrenciesData({ commit }, payload) {
      const key = 'xVkRD9xhaplqEDhFrqhF41Xd2pM07KCdRJ8PCpqg';
      const currencies = ['USD', 'EUR', 'UAH', ...payload.list].join(',');

      const response = await HTTP.get(
        `latest?apikey=${key}&base_currency=${payload.base}&currencies=${currencies}`
      );

      const { USD, EUR, UAH } = response.data.data;
      const mainCurrencies = { USD, EUR, UAH };

      let newMainCurrencies = [];
      Object.values(mainCurrencies).forEach((el) => {
        let isActive = true;
        if (el.code === payload.base) {
          isActive = true;
          newMainCurrencies.push({ ...el, isActive });
        } else {
          isActive = false;
          newMainCurrencies.push({ ...el, isActive });
        }
      });

      let newDefaultListOfCurrencies = [];

      for (const key of payload.list) {
        const val = payload.list.find((el) => el === key);
        newDefaultListOfCurrencies.push(response.data.data[val]);
      }

      commit('setMainCurrencies', newMainCurrencies);
      commit('setDefaultListOfCurrencies', newDefaultListOfCurrencies);
    },
    async currenciesDataFull({ commit }) {
      const key = 'xVkRD9xhaplqEDhFrqhF41Xd2pM07KCdRJ8PCpqg';
      const response = await HTTP.get(`latest?apikey=${key}`);

      commit('setCurrenciesData', response.data.data);
    },
  },
  modules: {},
});
