<template>
  <Layout>
    <div class="wrapper">
    
    <div class="navBar">
      <Icon @click="goBack" class="leftIcon" name="left" />
      <span class="title">标签列表</span>
      <span class="rightIcon"></span>
    </div>
    <div class="tags">
      <router-link class="tag" v-for="tag in tags" :key="tag.id" :to="`/labels/edit/${tag.id}`">
        <span class="tagname">{{tag.name}}</span>
        <Icon name="right" />
      </router-link>
    </div>
    <div class="createTag-wrapper">
      <Button class="createTag" @click="createTag">新建标签</Button>
    </div>
    </div>
  </Layout>
</template>

<script lang='ts'>
import { Component } from "vue-property-decorator";
import Button from "@/components/Button.vue";
import { mixins } from "vue-class-component";
import TagHelper from "@/mixins/TagHelper";

@Component({
  components: { Button }
})
export default class Labels extends mixins(TagHelper) {
  get tags() {
    return this.$store.state.tagList;
  }

  beforeCreate() {
    this.$store.commit("fetchTags");
  }
    goBack() {
    this.$router.back();
  }
}
</script>

<style lang="scss" scoped>
::v-deep .content{
  
   background: rgb(248, 246, 246);
}
.navBar {
  text-align: center;
  font-size: 20px;
  padding: 12px 16px;
  background: rgb(251,114,153);
  color:white;
  display: flex;
  align-items: center;
  justify-content: space-between;
box-shadow: 0 0 3px rgba(0,0,0,0.25);
  > .leftIcon {
    width: 20px;
    height: 20px;
  }
  > .rightIcon {
    width: 24px;
    height: 24px;
  }
}
.tags {
  background: white;
  font-size: 16px;
  padding-left: 16px;
  > .tag {
    min-height: 44px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid #e6e6e6;
    margin-top: 8px;
    .tagname {
      font-size: 19px;
      background: rgb(251, 114, 153);
      color: white;
      border: 2px solid rgb(251, 114, 153);
      padding: 0 4px;
      border-radius: 0.8em;
    }

    svg {
      width: 18px;
      height: 18px;
      color: #666;
      margin-right: 16px;
    }
  }
}
.createTag {
  background: #767676;
  color: white;
  border-radius: 4px;
  border: none;
  height: 40px;
  padding: 0 16px;
  &-wrapper {
    text-align: center;
    padding: 16px;
    margin-top: 44-16px;
  }
}
</style>