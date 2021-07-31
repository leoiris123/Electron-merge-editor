const SET_SECTION_LIST = "set_section_list"; //设置引入的对话数据
const SET_DIALOG_LIST = "set_dialog_list"; //设置引入的对话数据
const state = {
    sectionList: {}, //场景列表数据
    dialogList: {}, // 对话数据
};

const mutations = {
  [SET_SECTION_LIST](state, data) {
      console.log(data,"执行了==>SET_SECTION_LIST")
    state.sectionList = data;
    console.log(state.sectionList,"sectionList")
  },
  [SET_DIALOG_LIST](state, data) {
    console.log(data,"执行了==>SET_DIALOG_LIST")
  state.dialogList = data;
},
};
const getters = {
    sectionListGet(state){
        console.log("执行了==>sectionListGet")
        return state.sectionList
    }
};
const actions = {
  SET_SECTION_LIST({ commit }, data) {
    commit(SET_SECTION_LIST, data);
  },
  SET_DIALOG_LIST({ commit }, data) {
    commit(SET_DIALOG_LIST, data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
