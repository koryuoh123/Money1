<template>
  <div class="nav-wrapper">
    <div class="content">
      <p>Money.vue</p>
    </div>
    <Nav />
  </div>
</template>

<script>
export default {
  name: "Money"
};
</script>

<style lang="scss" scoped>
.nav-wrapper {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.content {
  border: 2px solid blue;
  overflow: auto;
  flex-grow: 1;
}
</style>