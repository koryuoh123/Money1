<template>
  <div>
    <div class="form-wrapper">
      <div class="navBar">
        <Icon @click="goBack" class="leftIcon" name="left" />
        <span class="title">编辑账单</span>
        <span class="rightIcon"></span>
      </div>
      <div class="formItem-wrapper">
        <div class="antvue-wrapper">
          <a-radio-group :default-value="type" button-style=solid>
            <span class="name">{{ "类型：" }}</span>
            <a-radio-button
              v-for="item in typeList"
              :key="item.text"
              :value="item.value"
              @click="select(item.value)"
            >
              {{ item.text }}
            </a-radio-button>
          </a-radio-group>
        </div>
        <div class="createdAt">
          <FormItem
            field-name="日期："
            type="date"
            placeholder="在这里输入日期"
            :value="time"
            @update:value="updateDate"
          />
        </div>
        <FormItem
          field-name="金额："
          type="number"
          placeholder="请输入金额"
          :amount="amount"
          @update:value="updateAmount"
        />
        <FormItem
          field-name="备注:"
          placeholder="请输入备注"
          :value="note"
          @update:value="updateNote"
        />
      </div>
      <div class="button-wrapper">
        <Button @click="remove">删除记账</Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FormItem from "@/components/Money/FormItem.vue";
@Component({
  components: { FormItem },
})
export default class EditRecord extends Vue {
  id = this.$route.params.id;
  typeList = [
    { text: "支出", value: "-" },
    { text: "收入", value: "+" },
  ];
    created() {
    this.$store.commit("fetchRecords");
    if (!this.currentrecord) {
      this.$router.replace("/404");
    }
  }
  get currentrecord() {
    this.$store.commit("setCurrentRecord", this.id);
    return this.$store.state.currentRecord;
  }

  select(value: string) {
    this.updateType(value);
  }
  remove() {
    if (this.currentrecord) {
      this.$store.commit("removeRecord", this.currentrecord.ids);
    }
  }
  updateTags(value: string[]) {
    this.$store.commit("updateTags", { id: this.id, value: value });
  }
  updateAmount(value: number) {
    this.$store.commit("updateAmount", { id: this.id, value: value });
  }
  updateType(value: string) {
    this.$store.commit("updateType", { id: this.id, value: value });
  }
  updateDate(value: string) {
    this.$store.commit("updateDate", { id: this.id, value: value });
  }
  updateNote(value: string) {
    this.$store.commit("updateNote", { id: this.id, value: value });
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get taglist() {
    //数组
    return this.recordList
      .filter((t) => t.ids === this.id)
      .map((t) => t.tags)[0];
  }
  get time() {
    return this.recordList
      .filter((t) => t.ids === this.id)
      .map((t) => t.createdAt)[0];
  }
  get type() {
    return this.recordList
      .filter((t) => t.ids === this.id)
      .map((t) => t.types)[0];
  }
  get amount() {
    return this.recordList
      .filter((t) => t.ids === this.id)
      .map((t) => t.amounts)[0];
  }
  get note() {
    return this.recordList
      .filter((t) => t.ids === this.id)
      .map((t) => t.notes)[0];
  }
  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.form-wrapper{
  background: rgb(245,245,245);
}
.formItem-wrapper {
  display: flex;
  flex-flow: column;
  background: white;
  margin-top: 20px;
  margin-left: 10px;
  margin-right: 10px;
  border: 1px solid white;
  border-radius: 5px;
  .formItem {
    margin-top: 10px;
    font-size: 16px;
    border-bottom: 1px solid #e6e6e6;
  }
  .antvue-wrapper {
    margin-top: 10px;
    
    border-bottom: 1px solid #e6e6e6;
    .name {
      color:black;
      font-size: 16px;
      padding-left: 16px;
      padding-right: 16px; //让input的文字不要贴备注二字
    }
  }
}
.navBar {
  color: white;
  text-align: center;
  font-size: 20px;
  padding: 12px 16px;
  background: rgb(251, 114, 153);
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  > .leftIcon {
    width: 20px;
    height: 20px;
  }
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
  button {
    background: #767676;
    color: white;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;
  }
}
</style>
