<template>
  <MainMenu>
    <Todo></Todo>
  </MainMenu>
</template>

<script>
import Todo from './components/Todo.vue'
import MainMenu from './components/MainMenu.vue'

export default {
  data () {
    return {}
  },
  components: {
    Todo,
    MainMenu,
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
