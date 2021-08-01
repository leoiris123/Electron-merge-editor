const SET_SECTION_LIST = "set_section_list"; //设置引入的对话数据
const SET_DIALOG_LIST = "set_dialog_list"; //设置引入的对话数据

const UPDATA_SECTION_LIST = "updata_section_list";
const UPDATA_DIALOG_LIST = "updata_dialog_list";

const state = {
  sectionList: {}, //场景列表数据
  dialogList: {}, // 对话数据
};

const mutations = {
  [SET_SECTION_LIST](state, data) {
    console.log(data, "执行了==>SET_SECTION_LIST");
    state.sectionList = data;
    console.log(state.sectionList, "sectionList");
  },
  [SET_DIALOG_LIST](state, data) {
    console.log(data, "执行了==>SET_DIALOG_LIST");
    state.dialogList = data;
  },
  [UPDATA_SECTION_LIST](state, data) {
    if (data.type == "modify_normal") {
      state.sectionList[data.sectionName].states[data.stateGroupName][
        data.index
      ].messageId = data.messageId;
    }
    if (data.type == "add_normal") {
      state.sectionList[data.sectionName].states[data.stateGroupName].splice(
        data.index + 1,
        0,
        {
          messageId: data.messageId,
        }
      );
    }
    if (data.type == "delete_normal") {
      state.sectionList[data.sectionName].states[data.stateGroupName].splice(
        data.index,
        1
      );
    }
    if(data.type == "add_branch"){
        state.sectionList[data.sectionName].states[data.stateGroupName][
            data.index
          ]["choice"] = data.choice
          console.log( state.sectionList[data.sectionName].states[data.stateGroupName], " state.sectionList[data.sectionName].states[data.stateGroupName]");
    }
    console.log(data, "执行了==>UPDATA_SECTION_LIST");
    
    // state.dialogList = data;
  },
  [UPDATA_DIALOG_LIST](state, data) {
    console.log(data, "执行了==>UPDATA_DIALOG_LIST");
    // state.dialogList = data;
  },
};
const getters = {
  sectionListGet(state) {
    console.log("执行了==>sectionListGet");
    return state.sectionList;
  },
  dialogListGet(state) {
    console.log("执行了==>dialogListget");
    return state.dialogList;
  },
};
const actions = {
  UPDATA_SECTION_LIST({ commit }, data) {
    commit(UPDATA_SECTION_LIST, data);
  },
  UPDATA_DIALOG_LIST({ commit }, data) {
    commit(UPDATA_DIALOG_LIST, data);
  },
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
