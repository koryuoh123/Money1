<template>
  <ul class="types">
    <li class="selected">支出</li>
    <li>收入</li>
  </ul>
</template>

<script>
export default {
  nane: "Types"
};
</script>

<style lang="scss" scoped>
.types {
    display: flex;
    background: #c4c4c4;
    >li{
      text-align: center;
      font-size: 24px;
      height:64px;
      width:50%;
      //下面三行代码是使text居中
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      //使用伪元素画那条下划线
       &.selected::after {
        content: '';
        position: absolute;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 4px;
        background: #333;
      }
    }
  
}
</style>