<template>
  <Layout class-prefix="layout">
    {{tags}}
    <NumberPad :value.sync="record.amounts" @submit="saveRecord" />
    <Types :value.sync="record.types" />
    <Notes :value.sync="record.notes" />
    <Tags :dataSource.sync="tags" :value.sync="record.tags" />
  </Layout>
</template>



<script lang='ts'>
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import Notes from "@/components/Money/Notes.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import recordListModel from "@/models/recordListModel.ts";
import tagListModel from "@/models/tagListModel";

const localRecordList = recordListModel.fetch();
const tagList = tagListModel.fetch();

@Component({
  components: { Tags, Notes, Types, NumberPad }
})
export default class Money extends Vue {
  recordList: RecordItem[] = localRecordList;
  tags = tagList;
  record: RecordItem = {
    currentTags: ["衣", "食", "住", "行"], //这是可供选择的标签
    tags: [],
    notes: "",
    types: "-",
    amounts: 0
  };

  saveRecord() {
    const record2: RecordItem = recordListModel.clone(this.record);
    record2.createdAt = new Date();
    this.recordList.push(record2);
    console.log(this.recordList);
  }
  @Watch("recordList")
  onRecordListChange() {
    recordListModel.save(this.recordList);
  }
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>