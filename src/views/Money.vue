<template>
  <Layout class-prefix="layout">
    {{record}}
    <NumberPad :value.sync="record.amounts" @submit="saveRecord" />
    <Types :value.sync="record.types" />
    <div class="notes">
      <FormItem field-name="备注" placeholder="在这里输入备注" :value.sync="record.notes" />
    </div>
    <Tags :dataSource.sync="tags" :value.sync="record.tags" />
  </Layout>
</template>



<script lang='ts'>
import Vue from "vue";
import { Component, Watch } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import recordListModel from "@/models/recordListModel.ts";

const localRecordList = recordListModel.fetch();

@Component({
  components: { Tags, FormItem, Types, NumberPad }
})
export default class Money extends Vue {
  recordList = window.recordList;
  tags = window.tagList;
  record: RecordItem = {
    tags: [],
    notes: "",
    types: "-",
    amounts: 0
  };

  saveRecord() {
    window.createRecord(this.record);
  }

}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
.notes {
  padding: 12px 0;
}
</style>