<template>
  <header class="header">
    <h1>{{title}}</h1>
  </header>
</template>

<script>
  import {
    ref
  } from 'vue';
  import {useStore} from 'vuex';
  export default {
    setup() {

      const title = ref('');
      const store = useStore();
      title.value = store.state.headerText
      return {
        title
      }
    }
  }
</script>

<style scoped>
  h1 {
    font-weight: 700;
    text-align: center;
  }
</style>>