<template>
  <Layout class-prefix="layout">
    <NumberPad :value.sync="record.amounts" @submit="saveRecord" :reset.sync="reset" />
    <Tabs classPrefix="type" :data-source="recordTypeList" :value.sync="record.types" />
    <div class="notes">
      <FormItem field-name="备注" placeholder="在这里输入备注" :value.sync="record.notes" />
    </div>
    <Tags :value.sync="record.tags" />
  </Layout>
</template>



<script lang='ts'>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tags from "@/components/Money/Tags.vue";
import FormItem from "@/components/Money/FormItem.vue";
import Tabs from "@/components/Tabs.vue";
import NumberPad from "@/components/Money/NumberPad.vue";
import recordTypeList from "@/constants/recordTypeList";
@Component({
  components: { Tags, FormItem, Tabs, NumberPad }
})
export default class Money extends Vue {
  recordTypeList = recordTypeList;
  reset = true;
  record: RecordItem = {
    tags: [],
    notes: "",
    types: "-",
    amounts: 0,
    ids:"",
   createdAt: new Date().toISOString()
  };
  get recordList() {
    return this.$store.state.recordList;
  }

  created() {
    this.$store.commit("fetchRecords");
  }

  Confirm() {
    if (confirm("真的不需要标签吗？")) {
      this.$store.commit("createRecord", this.record);
      if (this.$store.state.createRecordError === null) {
        this.record.notes = "";
        this.reset = !this.reset;
        window.alert("已保存");
      }
    } else {
      return;
    }
  }

  saveRecord() {
    if (!this.record.tags || this.record.tags.length === 0) {
      this.Confirm();
    } else {
      this.$store.commit("createRecord", this.record);
      if (this.$store.state.createRecordError === null) {
        this.record.notes = "";
        window.alert("已保存");
        this.reset = !this.reset;
      }
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .layout-content {
  display: flex;
  flex-direction: column-reverse;

}

.notes {
  padding: 12px 0;
}
</style>


<style lang="scss" scoped>
::v-deep {
  .tags {
    background: white;
    > .current {
      > li {
        background: rgba(250, 156, 183);
        color: white;
      }
    }
  }
  .tabs {
    background: white;
  }
  .notes {
    background: white;
  }
  .type-tabs-item {
    background: rgba(248, 207, 214, 0.651);
    &.selected {
      background: rgb(251, 114, 153);
      color: white;
      &::after {
        display: none;
      }
    }
  }
}
</style>