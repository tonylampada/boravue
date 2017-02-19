<template>
  <div>
      O componente aih:
      <component :is="getcomponent(name)"></component>
  </div>
</template>

<script>
import DocsRegistry from './docs-registry'

export default {
  data () {
    return {}
  },
  methods: {
    getcomponent(n){
      return DocsRegistry.get(n);
    }
  },
  components: {},
  props: ['name']
}
</script>
