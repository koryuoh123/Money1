<template>
  <Layout class-prefix="layout">
    {{Record}}
    <NumberPad :value.sync="record.amounts" />
    <Types :value.sync="record.types" />
    <Notes :value.sync="record.notes" />
    <Tags :dataSource.sync="record.currentTags" :value.sync="Record.tags" />
  </Layout>
</template>



<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
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
};

@Component({
  components: { Tags, Notes, Types, NumberPad }
})
export default class Money extends Vue {
  record: Record = {
    currentTags: ["衣", "食", "住", "行"], //这是可供选择的标签
    tags: [],
    notes: "",
    types: "-",
    amounts: 0
  };
}
</script>

<style lang="scss">
.layout-content {
  display: flex;
  flex-direction: column-reverse;
}
</style>