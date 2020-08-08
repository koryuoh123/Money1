<template>
  <Layout>
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
    <Tabs classPrefix="item" :data-source="intervalList" :value.sync="interval" />
    <div></div>
  </Layout>
</template>

<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Types from "@/components/Money/Types.vue";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList.ts"
import recordTypeList from "@/constants/recordTypeList.ts"
@Component({
  components: { Types, Tabs }
})
export default class Statistic extends Vue {
  type = "-";
  interval = "day";
    intervalList = intervalList;
    recordTypeList = recordTypeList}
</script>

<style lang="scss" scoped>
::v-deep .type-tabs-item {
  background: white;
  &.selected {
    background: #c4c4c4;
    &::after {
      display: none;
    }
  }
}
</style>