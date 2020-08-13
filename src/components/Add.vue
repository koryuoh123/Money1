<template>
  <div>
    <router-link to="/money" class="item">
      <Icon name="add3" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: "Add"
};
</script>

<style lang="scss" scoped>
.item {
  .icon {
    z-index: 1;
    width: 42px;
    height: 42px;
    position: fixed;
    bottom: 7vh;
    left: 50vw;
    margin-left: -21px;
    fill: rgb(118, 118, 118);
  }
}
</style>