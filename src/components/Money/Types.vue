<template>
  <ul class="types">
    <li :class="value === '-' && 'selected'" @click="selectType('-')">支出</li>
    <li :class="value ==='+' && 'selected'" @click="selectType('+')">收入</li>

  </ul>
</template>

<script lang="ts">
import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator';

@Component
export default class Types extends Vue {
@Prop() readonly value!: string;
  selectType(type: string) {
      if (type !== "-" && type !== "+") {
        throw new Error("type is unknown");
      }

      this.$emit('update:value',type)
    }
}
</script>

<style lang="scss" scoped>
.types {
  display: flex;
  background: #c4c4c4;
  > li {
    text-align: center;
    font-size: 24px;
    height: 50px;
    width: 50%;
    //下面三行代码是使text居中
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    //使用伪元素画那条下划线
    &.selected::after {
      content: "";
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