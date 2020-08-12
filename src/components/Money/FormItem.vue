<template>
  <label class="formItem">
    <span class="name">{{this.fieldName}}</span>
    <template v-if="type === 'date'">
      <input
        :type="type || 'text'"
        :value="beautifyDate(value)"
        @input="onValueChanged($event.target.value)"
        :placeholder="this.placeholder"
      />
    </template>

    <template v-else-if="type === 'checkbox'">
      <select :value="value" @input="onValueChanged($event.target.value)">
        <option v-for="item in typeList" :value="item.value" :key="item.value">{{item.text}}</option>
      </select>
    </template>

    <template v-else>
      <input
        :type="type || 'text'"
        :value="value"
        @input="onValueChanged($event.target.value)"
        :placeholder="this.placeholder"
      />
    </template>
  </label>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import dayjs from "dayjs";
@Component
export default class FormItem extends Vue {
  @Prop({ default: "" }) readonly value!: string;
  @Prop({ required: true }) fieldName!: string;
  @Prop() placeholder?: string;
  @Prop() type?: string;
  @Prop() taglist!: Tag[];

  typeList = [
    { text: "支出", value: "-" },
    { text: "收入", value: "+" }
  ];

  onValueChanged(value: string) {
    this.$emit("update:value", value);
  }
  beautifyDate(isoString: string) {
   
    return dayjs(isoString).format("YYYY-MM-DD");
  }
  beautifyType(type: string) {
    return this.typeList.filter(t => t.value === type).map(t => t.text)[0];
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