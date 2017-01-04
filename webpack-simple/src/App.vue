<template>
  <div class="container">
  <section>
    <todo> </todo>
  </section>

  </div>
</template>

<script>
import Todo from './components/Todo.vue'

export default {
  data () {
    return {}
  },
  components: {
    Todo
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

/*
Esse '~' se refere a "node_modules/"
No caso, node_modules/bulma/package.json tem um atributo main = 'bulma.sass', portanto
@import '~bulma' eh equivalente a @import '~bulma/bulma.sass';
*/

</style>
