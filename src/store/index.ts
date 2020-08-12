import Vue from "vue";
import Vuex from "vuex";
import clone from "@/lib/clone";
import createId from "@/lib/createId";
import router from "@/router";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    recordList: [],
    createRecordError: null,
    createTagError: null,
    tagList: [],
    currentTag: undefined,
    currentRecord:undefined,
  } as RootState,

  mutations: {
    fetchRecords(state) {
      state.recordList = JSON.parse(
        window.localStorage.getItem("recordList") || "[]"
      ) as RecordItem[];
    },
    createRecord(state, record: RecordItem) {
      const record2 = clone(record);
      record2.createdAt = new Date().toISOString();
      record2.ids = createId().toString();
      state.recordList.push(record2);
      store.commit("saveRecords");
    },
    saveRecords(state) {
      window.localStorage.setItem(
        "recordList",
        JSON.stringify(state.recordList)
      );
    },
    fetchTags(state) {
      state.tagList = JSON.parse(
        window.localStorage.getItem("tagList") || "[]"
      );
      if (!state.tagList || state.tagList.length === 0) {
        store.commit("createTag", "衣");
        store.commit("createTag", "食");
        store.commit("createTag", "住");
        store.commit("createTag", "行");
      }
    },
    createTag(state, name: string) {
      state.createTagError = null;
      const names = state.tagList.map((item) => item.name);
      if (names.indexOf(name) >= 0) {
        state.createTagError = new Error("tag name duplicated");
        return;
      }
      const id = createId().toString();
      state.tagList.push({ id, name: name });
      store.commit("saveTags");
    },
    saveTags(state) {
      window.localStorage.setItem("tagList", JSON.stringify(state.tagList));
    },
    setCurrentRecord(state, id: string) {
      state.currentRecord = state.recordList.filter((t) => t.ids === id)[0];
    },
    setCurrentTag(state, id: string) {
      state.currentTag = state.tagList.filter((t) => t.id === id)[0];
    },
    updateType(state, payload: { id: string; value: string }) {

      const { id, value } = payload;
      const currentRecord = state.recordList.filter((t) => t.ids === id)[0];
      currentRecord.types = value;
      store.commit("saveRecords");
    },
    updateAmount(state, payload: { id: string; value: number }) {
      const { id, value } = payload;
      const currentRecord = state.recordList.filter((t) => t.ids === id)[0];
      currentRecord.amounts = value;
      store.commit("saveRecords");
    },
    updateNote(state, payload: { id: string; value: string }) {
      const { id, value } = payload;
      const currentRecord = state.recordList.filter((t) => t.ids === id)[0];
      currentRecord.notes = value;
      store.commit("saveRecords");
    },
    updateDate(state, payload: { id: string; value: string }) {
      const { id, value } = payload;
      const currentRecord = state.recordList.filter((t) => t.ids === id)[0];
 
      currentRecord.createdAt = value;
  
      store.commit("saveRecords");
    },
    updateTag(state, payload: { id: string; name: string }) {
      const { id, name } = payload;
      const idList = state.tagList.map((item) => item.id);
      if (idList.indexOf(id) >= 0) {
        const names = state.tagList.map((item) => item.name);
        if (names.indexOf(name) >= 0) {
          window.alert("标签名重复了");
        } else {
          const tag = state.tagList.filter((item) => item.id === id)[0];
          tag.name = name;
          store.commit("saveTags");
        }
      }
    },
    removeRecord(state,id: string){
      let index = -1;
      for (let i = 0; i < state.recordList.length; i++) {
        if (state.recordList[i].ids === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.recordList.splice(index, 1);
        store.commit("saveRecords");
        router.back();
      } else {
        window.alert("删除失败");
      }
    },
    removeTag(state, id: string) {
      let index = -1;
      for (let i = 0; i < state.tagList.length; i++) {
        if (state.tagList[i].id === id) {
          index = i;
          break;
        }
      }
      if (index >= 0) {
        state.tagList.splice(index, 1);
        store.commit("saveTags");
        router.back();
      } else {
        window.alert("删除失败");
      }
    },
  },
});
export default store;
