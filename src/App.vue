<template>
  <div id="app">
    <TheHeader></TheHeader>
    <TheMain></TheMain>
    <TheFooter></TheFooter>
  </div>
</template>

<script>
import TheHeader from './components/TheHeader.vue';
import TheMain from './components/TheMain.vue';
import TheFooter from './components/TheFooter.vue';

export default {
  components: {
    TheHeader,
    TheMain,
    TheFooter,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');

* {
  font-family: 'Quicksand', sans-serif;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html,
body {
  height: 100%;
}

#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}

.main {
  flex: 1 0 auto;
}

.footer {
  flex-shrink: 0;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

@media (min-width: 320px) {
  .container {
    max-width: 290px;
    margin: 0 auto;
  }
}

@media (min-width: 481px) {
  .container {
    max-width: 390px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 580px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 750px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1024px;
  }
}
</style>
