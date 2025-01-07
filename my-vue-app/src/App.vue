<template>
  <div id="app">
    <h1>Create Your AI Assistant</h1>
    <create-assistant />
  </div>
</template>

<script>
import CreateAssistant from './components/CreateAssistant.vue';

export default {
  components: {
    CreateAssistant,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
