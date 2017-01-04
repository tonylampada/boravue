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

</style>
