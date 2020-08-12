<template>
  <div>
    <Add />
    <Tabs class-prefix="type" :data-source="recordTypeList" :value.sync="type" />
    <ol v-if="groupedList.length>0">
      <li v-for="(group, index) in groupedList" :key="index">
        <h3 class="title">
          {{beautify(group.title)}}
          <span>{{type+'￥'}}{{group.total}}</span>
        </h3>
        <ol>
          <router-link v-for="item in group.items" :key="item.id" class="record" :to="`/statistics/edit/${item.ids}`" >
            <span class="tag">{{tagString(item.tags)}}</span>
            <span class="notes">{{item.notes}}</span>
            <span class="amount">{{type+'￥'}}{{item.amounts}}</span>
          </router-link>
        </ol>
      </li>
    </ol>
    <div v-else class="noResult">目前没有相关记录,快去添加一笔吧！！</div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import Tabs from "@/components/Tabs.vue";
import intervalList from "@/constants/intervalList.ts";
import recordTypeList from "@/constants/recordTypeList.ts";
import dayjs from "dayjs";
import clone from "@/lib/clone.ts";
import Add from "@/components/Add.vue";
@Component({
  components: { Tabs, Add }
})
export default class Statistic extends Vue {
  type = "-";

  recordTypeList = recordTypeList;

  tagString(tags: Tag[]) {
    return tags.length === 0 ? "无" : tags.map(t => t.name).join(",");
  }
  beautify(string: string) {
    const day = dayjs(string);
    const now = dayjs();
    if (day.isSame(now, "day")) {
      return "今天";
    } else if (day.isSame(now.subtract(1, "day"), "day")) {
      return "昨天";
    } else if (day.isSame(now.subtract(2, "day"), "day")) {
      return "前天";
    } else if (day.isSame(now, "year")) {
      return day.format("M月D日");
    } else {
      return day.format("YYYY年M月D日");
    }
  }
  get recordList() {
    return (this.$store.state as RootState).recordList;
  }
  get groupedList() {
    type Result = { title: string; total?: number; items: RecordItem[]}[];
    const { recordList } = this;
    
    if (recordList.length === 0) {
      return [];
    }
    const newList = clone(recordList)
      .filter(r => r.types === this.type)
      .sort(
        (a, b) => dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
      );

    if (newList.length === 0) {
      return [];
    }
    const result: Result = [
      {
        title: dayjs(newList[0].createdAt).format("YYYY-MM-DD"),
        items: [newList[0]]
      }
    ];

    for (let i = 1; i < newList.length; i++) {
      const current = newList[i];
      const last = result[result.length - 1];
      if (dayjs(last.title).isSame(dayjs(current.createdAt), "day")) {
        last.items.push(current);
      } else {
        result.push({
          title: dayjs(current.createdAt).format("YYYY-MM-DD"),
          items: [current]
        });
      }
    }
    result.map(group => {
      
      group.total = group.items.reduce((sum, item) => {
        return sum + item.amounts;
      }, 0);
    });
    return result;
  }
  beforeCreate() {
    this.$store.commit("fetchRecords");
  }

}
</script>

<style lang="scss" scoped>
@import "~@/assets/style/helper.scss";
.noResult {
  padding: 16px;
  text-align: center;
}

::v-deep {
  .tabs {
    background: white;
  }
  .type-tabs-item {
    background: #f7f5f5;
    &.selected {
      background: rgb(251, 114, 153);
      color: white;
      &::after {
        display: none;
      }
    }
  }
}
%item {
  //列表每一项

  padding: 8px 16px;
  line-height: 24px;
  display: flex;
  justify-content: space-between;
  align-content: center;
}
.title {
  @extend %item;
  @extend %innerShadow;
  font-size: 19px;
}
.record {
  background: white;
  @extend %item;
  border-bottom: 1px solid #e6e6e6;
  &:hover {
    background: #f6f6f6;
  }
}
.tag {
  font-size: 19px;
  background: rgb(251, 114, 153);
  color: white;
  border: 2px solid rgb(251, 114, 153);
  padding: 0 4px;
  border-radius: 0.8em;
}
.amount {
  font-size: 17.5px;
}
.notes {
  margin-right: auto;
  margin-left: 16px;
  color: rgb(126, 125, 125);
}
</style>
<style lang="scss" scoped></style>
