<template>
  <label class="notes"> 
    <span class="name">备注</span>
    <input v-model="value" type="text" placeholder="在这里输入备注" />
  </label>
</template>

<script lang='ts'>

import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  value = '';
}
</script>

<style lang="scss" scoped>
.notes {
  font-size: 14px;
  background: #f5f5f5;
  padding-left: 16px;
  //下面两行代码是为了让儿子处于父组件在垂直方向上居中
  display: flex;
  align-items: center;
  > .name {
    padding-right: 16px; //让input的文字不要贴备注二字
  }
  > input {
    height: 64px;
    flex-grow: 1;
    background: transparent;
    border: none;

    padding-right: 16px; //让input的文字不要贴右边
  }
}
</style>