import Vue from './vue.esm.browser.js';

const app = new Vue({
  data: () => ({
    counterValue: 0
  }),
  methods: {
    updateCounter() {
      this.counterValue++
    }
  }
})


app.$mount('#app')
