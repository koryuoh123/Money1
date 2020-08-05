<template>
  <div class="numberPad">
    <div class="output">{{output}}</div>
    <div class="buttons">
      <button @click="inputContent">1</button>
      <button @click="inputContent">2</button>
      <button @click="inputContent">3</button>
      <button @click="remove">删除</button>
      <button @click="inputContent">4</button>
      <button @click="inputContent">5</button>
      <button @click="inputContent">6</button>
      <button @click="clear">清空</button>
      <button @click="inputContent">7</button>
      <button @click="inputContent">8</button>
      <button @click="inputContent">9</button>
      <button class="ok" @click="ok">OK</button>
      <button class="zero" @click="inputContent">0</button>
      <button @click="inputContent">.</button>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import {Component, Prop} from 'vue-property-decorator';

@Component
export default class NumberPad extends Vue {
  output = '0';

  inputContent(event: MouseEvent){
    const button = (event.target as HTMLButtonElement);//强行声明是非空按钮元素
    const input = button.textContent;

    if(this.output === '0' && input){//初始状态
      if( input!=='.'){
        this.output = input;
      }
      else this.output += input; 
    }
    else if(this.output.length>0){
      if(input === '.' && this.output.indexOf('.')>=0){return;}//不许出现第二个小数点
      else this.output = this.output + input;
    }
  }
  remove(){
    if (this.output.length > 1){ 
      
      this.output = this.output.slice(0, -1);
      }
    else this.output = '0';
  }
  clear(){
    this.output = '0'
  }
   ok(){console.log('等隔壁页面实现')}
 
}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.numberPad {
  .output {
    @extend %clearFix;
    @extend %innerShadow;
    font-size: 28px;
    font-family: Consolas, monospace; //output显示的字体是等宽编程字体
    padding: 9px 16px;
    text-align: right; //将100放到最右边
    height: 58px;
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