<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style>
.left{
  width: 20%;
  border: 1px gray solid;
  float: left;
}

html, body{
  height: 100%;
  min-width: 400px;
}
</style>
