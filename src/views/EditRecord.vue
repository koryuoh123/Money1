<template>
  <div>
    <div class="form-wrapper">
      <div class="navBar">
        <Icon @click="goBack" class="leftIcon" name="left" />
        <span class="title">编辑账单</span>
        <span class="rightIcon"></span>
      </div>
      <div class="formItem-wrapper">
        <FormItem
          field-name="类型名："
          type="checkbox"
          placeholder="请输入类型名"
          :value="type"
          @update:value="updateType"
        />
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
          placeholder="请输入金额"
          :value="amount"
          @update:value="updateAmount"
        />
        <FormItem field-name="备注:" placeholder="请输入备注" :value="note" @update:value="updateNote" />
      </div>
      <div class="button-wrapper">
        <Button @click="remove">删除记账</Button>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import FormItem from "@/components/Money/FormItem.vue";


@Component({
  components: { FormItem }
})
export default class EditRecord extends Vue {
  
  id = this.$route.params.id;

  get currentrecord() {
    this.$store.commit("setCurrentRecord", this.id);
    return this.$store.state.currentRecord;
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
    return this.recordList.filter(t => t.ids === this.id).map(t => t.tags)[0];
  }
  get time() {
      return this.recordList
      .filter(t => t.ids === this.id)
      .map(t => t.createdAt)[0];
    
  }
  get type() {
    return this.recordList.filter(t => t.ids === this.id).map(t => t.types)[0];
  }
  get amount() {
    return this.recordList
      .filter(t => t.ids === this.id)
      .map(t => t.amounts)[0];
  }
  get note() {
    return this.recordList.filter(t => t.ids === this.id).map(t => t.notes)[0];
  }
  goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
.formItem-wrapper {
  
  display: flex;
  flex-flow: column;
    background: white;
    margin-top: 20px;
    margin-left:10px;
    margin-right:10px;
    border: 1px solid white;
    border-radius: 5px;
  .formItem {
  
    margin-top: 10px;
    font-size: 16px;
     border-bottom: 1px solid #e6e6e6;
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
  box-shadow: 0 0 3px rgba(0,0,0,0.25);
  > .leftIcon {
    width: 20px;
    height: 20px;
  }
}
.button-wrapper {
  text-align: center;
  padding: 16px;
  margin-top: 44-16px;
  button{
       background: #767676;
    color: white;
    border-radius: 4px;
    border: none;
    height: 40px;
    padding: 0 16px;
  }
}
</style>