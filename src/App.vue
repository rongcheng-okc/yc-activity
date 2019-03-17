<template>
  <div>
    <component :is="currentComponentName"></component>
  </div>
</template>

<script>
import { getQueryObj } from './utils/query';
import getData from './util';
import MainPage from './pages/Main';
import GiftPage from './pages/Gift';

export default {
  name: 'app',
  data () {
    return {
      currentComponentName: 'MainPage'
    }
  },
  computed: {},
  created() {
    this.currentComponentName = this.isOverTime() ? 'GiftPage' : 'MainPage';
  },
  components: {
    MainPage,
    GiftPage
  },
  methods: {
    isOverTime() {
      let obj = getQueryObj(window.location.href);
      if (obj.date && Number(obj.date) > 20190320) return true;
      else return false;
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
}
</style>