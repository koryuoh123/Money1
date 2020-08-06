<template>
  <label class="formItem">
    <span class="name">{{this.fieldName}}</span>
    <input v-model="value" type="text" :placeholder="this.placeholder" />
  </label>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Watch, Prop } from "vue-property-decorator";

@Component
export default class FormItem extends Vue {
  value = "";
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;

  @Watch("value")
  onValueChange(value: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style lang="scss" >
.formItem {
  font-size: 14px;

  padding-left: 16px;
  //下面两行代码是为了让儿子处于父组件在垂直方向上居中
  display: flex;
  align-items: center;
  > .name {
    padding-right: 16px; //让input的文字不要贴备注二字
  }
  > input {
    height: 40px;
    flex-grow: 1;
    background: transparent;
    border: none;

    padding-right: 16px; //让input的文字不要贴右边
  }
}
</style>
<style lang="scss" scoped>
formItem {
  background: #f5f5f5;
}
</style>