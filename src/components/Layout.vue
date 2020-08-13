<template>
 <div class="layout-wrapper" :class="classPrefix && `${classPrefix}-wrapper`">
    <div class="content" :class="classPrefix && `${classPrefix}-content`   ">
     <slot/>
    </div>
    <div class="nav-wrapper">
    <Nav />
    </div>
  </div>
</template>

<script lang="ts">
  export default {
    props: ['classPrefix'],
    name: 'Layout'
  };
</script>

<style lang="scss" scoped>
  ::v-deep nav{
  position:fixed;
  width:100%;
  bottom:0px;
  background:white;
  
  }
.layout-wrapper {
  display: flex;
  flex-direction: column;
   min-height: 100vh;
   
.nav-wrapper{
  height:60px;
  width:100%;
  background:white;
  
  
}
}
.content {
  
  overflow: auto;
  flex-grow: 1;
}
</style>