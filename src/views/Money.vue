<template>
  <Layout class-prefix="layout">
    {{record}}
    <NumberPad :value.sync="record.amounts" @submit="saveRecord" />
    <Types :value.sync="record.types" />
    <div class="notes">
      <FormItem field-name="备注" placeholder="在这里输入备注" :value.sync="record.notes" />
    </div>
    <Tags />
  </Layout>
</template>



<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Types from "@/components/Money/Types.vue";
import NumberPad from "@/components/Money/NumberPad.vue";

@Component({
  components: { Tags, FormItem, Types, NumberPad }
})
export default class Money extends Vue {
  get recordList() {
    return this.$store.state.recordList;
  }

  record: RecordItem = {
    tags: [],
    notes: "",
    types: "-",
    amounts: 0
  };
  created() {
    this.$store.commit("fetchRecords");
  }

  saveRecord() {
    this.$store.state.createRecord(this.record);
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