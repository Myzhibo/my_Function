<template>
  <div>
    = HOME =
    <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="../assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
    <br>
    <hr>
    <LongPress/>
    <br>
    <hr>
    <Choice/>
    <hr>
    <CreateWatcher/>
  </div>
</template>

<script setup lang="ts">
import LongPress from './components/LongPress.vue';
import Choice from './components/Choice.vue';
import CreateWatcher from './components/CreateWatcher.vue';
</script>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
