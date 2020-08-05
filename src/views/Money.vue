<template>
  <Layout class-prefix="layout">
    {{record}}
    <NumberPad :value.sync="record.amounts" @submit="saveRecord" />
    <Types :value.sync="record.types" />
    <Notes :value.sync="record.notes" />
    <Tags :dataSource.sync="record.currentTags" :value.sync="record.tags" />
  </Layout>
</template>



<script lang='ts'>
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";

type Record = {
  currentTags: string[];
  tags: string[];
  notes: string;
  types: string;
  amounts: number;
  createdAt?: Date;
};
// const recordList: Record[] = JSON.parse(
//   window.localStorage.getItem("recordList") || "[]"
// );
@Component({
  components: { Tags, Notes, Types, NumberPad }
})
export default class Money extends Vue {
  recordList: Record[] = JSON.parse(
  window.localStorage.getItem("recordList") || "[]"
);
  record: Record = {
    currentTags: ["衣", "食", "住", "行"], //这是可供选择的标签
    tags: [],
    notes: "",
    types: "-",
    amounts: 0
  };

  saveRecord() {
    const record2: Record = JSON.parse(JSON.stringify(this.record)); //深拷贝一个副本
    record2.createdAt = new Date();
    this.recordList.push(record2);
    console.log(this.recordList);
  }
  @Watch("recordList")
  onRecordListChange() {
    window.localStorage.setItem("recordList", JSON.stringify(this.recordList));
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>