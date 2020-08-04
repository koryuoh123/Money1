<template>
  <div class="numberPad">
    <div class="output">100</div>
    <div class="buttons">
      <button>1</button>
      <button>2</button>
      <button>3</button>
      <button>删除</button>
      <button>4</button>
      <button>5</button>
      <button>6</button>
      <button>清空</button>
      <button>7</button>
      <button>8</button>
      <button>9</button>
      <button class="ok">OK</button>
      <button class="zero">0</button>
      <button>.</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "NumberPad"
};
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 36px;
    font-family: Consolas, monospace; //output显示的字体是等宽编程字体
    padding: 9px 16px;
    text-align: right; //将100放到最右边
  }
  .buttons {
    @extend %clearFix;
    > button {
      width: 25%; //只有宽度能设置百分比，高度不可以,注意设计师通常按iphone6/7/8为标准
      height: 64px;
      float: left; //float定位配合OK按钮变大，0补上空隙，代替flex
      background: transparent;
      border: none;
      $bg: #f2f2f2;
      &.ok {
        height: 64 * 2px; //我们想让ok自己变大点，但这会导致0换行了，这说明需要使用float定位代替flex
        float: right; //配合
      }
      &.zero {
        width: 25 * 2%;
      }
      &:nth-child(1) {
        background: $bg;
      }
      &:nth-child(2),
      &:nth-child(5) {
        background: darken($bg, 4%);
      }
      &:nth-child(3),
      &:nth-child(6),
      &:nth-child(9) {
        background: darken($bg, 4 * 2%);
      }
      &:nth-child(4),
      &:nth-child(7),
      &:nth-child(10) {
        background: darken($bg, 4 * 3%);
      }
      &:nth-child(8),
      &:nth-child(11),
      &:nth-child(13) {
        background: darken($bg, 4 * 4%);
      }
      &:nth-child(14) {
        background: darken($bg, 4 * 5%);
      }
      &:nth-child(12) {
        background: darken($bg, 4 * 6%);
      }
    }
  }
}
</style>