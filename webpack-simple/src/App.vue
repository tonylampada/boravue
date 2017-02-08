<template>
  <MainLayout>
    <router-view></router-view>
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout.vue'
import VueRouter from 'vue-router'
import Vue from 'vue'

export default {
  data () {
    return {}
  },
  components: {
    MainLayout,
  }
}
</script>

<style lang="scss">


/*
@import '~bulma/sass/base/_all';
@import '~bulma/sass/utilities/_all.sass';
@import '~bulma/sass/elements/button.sass';
*/

@import '~bulma';
@import '~font-awesome/css/font-awesome.css';
@import '~animate.css';

/*
Esse '~' se refere a "node_modules/"
No caso, node_modules/bulma/package.json tem um atributo main = 'bulma.sass', portanto
@import '~bulma' eh equivalente a @import '~bulma/bulma.sass';
*/

</style>
