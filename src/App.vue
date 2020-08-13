<template>
  <div id="x">
    <div id = "y">
<router-view />
    </div>
    
  </div>
</template>
<script>
export default {
  
};
</script>
<style lang="scss">
@import "~@/assets/style/helper.scss"; //引用变量
@import "~@/assets/style/reset.scss";  //引用reset，直接生效
body{
  -webkit-font-smoothing:antialiased;
  -moz-osx-font-smoothing:grayscale;
  color:#333;
  font-family:$font-hei;
  font-size:16px;
  line-height: 1.5;
  background:#f5f5f5;
}
#x{
  /* 限制PC上的宽度*/
  max-width: 500px;
  margin:0 auto;

}
#y{
  background: white;
}
</style>
