const SET_SECTION_LIST = "set_section_list"; //设置对话场景数据
const SET_DIALOG_LIST = "set_dialog_list"; //设置对白资源
const SET_DIALOG_LIST_ARRANGE = "set_dialog_list_arrange"; //设置对白资源
const SET_DIALOG_EDIT_LIST = "set_dialog_edit_list"; //配置对白数据

const UPDATA_SECTION_LIST = "updata_section_list";
const UPDATA_DIALOG_LIST = "updata_dialog_list";
const UPDATA_SECTION = "updata_section";

import event from "../../../script/tool/event";

const state = {
  sectionList: {}, //场景列表数据
  dialogList: {}, // 对话分组数据
  dialogListArrange: {}, // 对话列表不分组数据
  dialogEditList: {}, //配置对白数据
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
  dialogListArrangeGet(state) {
    console.log("执行了==>dialogListArrangeget");
    return state.dialogListArrange;
  },
  dialogEditListGet(state) {
    console.log("执行了==>dialogEditListGet");
    return state.dialogEditList;
  },
};
const mutations = {
  [SET_DIALOG_EDIT_LIST](state, data) {
    console.log(data, "执行了==>SET_DIALOG_EDIT_LIST");
    state.dialogEditList = data;
  },
  [SET_SECTION_LIST](state, data) {
    console.log(data, "执行了==>SET_SECTION_LIST");
    state.sectionList = data;
    console.log(state.sectionList, "sectionList");
  },
  [SET_DIALOG_LIST](state, data) {
    console.log(data, "执行了==>SET_DIALOG_LIST");
    state.dialogList = data;
    let dialogListArrange = {};
    //生成不分组的对话列表
    for (let key in state.dialogList) {
      Object.assign(dialogListArrange, state.dialogList[key]);
    }

    state.dialogListArrange = dialogListArrange;
    console.log(
      state.dialogListArrange,
      "state.dialogListArrange==>组合后数据"
    );
  },

  [SET_DIALOG_LIST_ARRANGE](state, data) {
    state.dialogListArrange = data;
    console.log("state.dialogListArrange:", data)
  },
  [UPDATA_SECTION_LIST](state, data) {












    // if (data.type == "modify_normal") {
    //   state.sectionList[data.sectionName].states[data.stateGroupName][
    //     data.index
    //   ].messageId = data.messageId;
    // }
    // if (data.type == "add_normal") {
    //   state.sectionList[data.sectionName].states[data.stateGroupName].splice(
    //     data.index + 1,
    //     0,
    //     {
    //       messageId: data.messageId,
    //     }
    //   );
    // }
    // if (data.type == "delete_normal") {
    //   state.sectionList[data.sectionName].states[data.stateGroupName].splice(
    //     data.index,
    //     1
    //   );
    // }
    // if (data.type == "add_branch") {
    //   let currentid = state.sectionList[data.sectionName].states[data.stateGroupName][data.index]
    //   if (currentid["choice"]) {
    //     currentid["choice"].push(data.choice)
    //   } else {
    //     currentid["choice"] = []
    //     currentid["choice"].push(data.choice)
    //   }
    //   // ["choice"] = data.choice;
    //   console.log(
    //     state.sectionList[data.sectionName].states[data.stateGroupName],
    //     "state.sectionList[data.sectionName].states[data.stateGroupName]"
    //   );
    // }
    // if (data.type == "add_next") {
    //   state.sectionList[data.sectionName].states[data.stateGroupName][
    //     data.index
    //   ]["next"] = data.next;
    // }
    // if (data.type == "delete_next") {
    //   delete state.sectionList[data.sectionName].states[data.stateGroupName][
    //     data.index
    //   ]["next"];
    // }
    // console.log(data, "执行了==>UPDATA_SECTION_LIST");
    // event.$emit("sectionChange", state.sectionList);
    // state.dialogList = data;
  },
  [UPDATA_DIALOG_LIST](state, data) {
    console.log(data, "执行了==>UPDATA_DIALOG_LIST");
    // state.dialogList = data;
  },
  [UPDATA_SECTION](state, data) {
    console.log("更新section data =====>>", data)
    console.log("store-测试", state.sectionList)
    if (data.type == "delete_section") {
      if (state.sectionList[data.sectionName]) {
        delete state.sectionList[data.sectionName];
        console.warn("删除了", data.sectionName);
      }
      event.$message.success("Done");
      event.$emit("sectionChange", state.sectionList);
      return
    }
    if (data.type == "add_section") {
      if (!state.sectionList[data.sectionName]) {
        state.sectionList[data.sectionName] = {
          states: {
            "1": [{
              "messageId": "init"
            },]
          }
        };
        console.warn("自动生成了", data.sectionName);
      }
      event.$message.success("Done");
      event.$emit("sectionChange", state.sectionList);
      return
    }
    let sectionName = data.sectionName

    let groupName = data.groupName
    let index //查找原位置
    let statelist
    if (groupName) {

      statelist = state.sectionList[sectionName].states[groupName]
      statelist.map((item, i) => {
        if (item.messageId == data.messageId) {
          index = i
        }
      })
      console.log(index, "index")
    }


    if (data.type == "add_normal") {
      index = index + 1
      data.helper.map((item, i) => {
        let addmessageId = { messageId: item }
        statelist.splice(index + i, 0, addmessageId)
      })
      event.$message.success("Done");
    }
    if (data.type == "delete_normal") {
      statelist.splice(index, 1)
      event.$message.success("Done");
    }
    if (data.type == "replace_normal") {
      let replacemessageId = { messageId: data.helper[0] }
      statelist.splice(index, 1, replacemessageId)
      event.$message.success("Done");
    }
    if (data.type == "add_choice") {
      let add_choice_messageId = { messageId: data.helper[0], nextState: data.nextState }
      if (statelist[index].choice) {
        statelist[index].choice.push(add_choice_messageId)
      } else {
        statelist[index].choice = []
        statelist[index].choice.push(add_choice_messageId)
      }
      event.$message.success("Done");
    }
    if (data.type == "add_next") {
      statelist[index].next = data.nextState
      event.$message.success("Done");
    }
    if (data.type == "add_group") {
      if (!state.sectionList[sectionName].states[data.addGroupNum]) {
        state.sectionList[sectionName].states[data.addGroupNum] = [{ messageId: "init" }]
      }
      event.$message.success("Done");
    }
    if (data.type == "delete_choice") {
      if (statelist[index].choice) {
        delete statelist[index].choice
      }
      event.$message.success("Done");
    }
    if (data.type == "delete_next") {
      if (statelist[index].next) {
        delete statelist[index].next
      }
      event.$message.success("Done");
    }
    if (data.type == "delete_group") {
      if (statelist) {
        delete state.sectionList[sectionName].states[groupName]
      }
      event.$message.success("Done");
    }

    console.log(statelist, "statelist")

    event.$emit("sectionChange2", state.sectionList);



  },
};

const actions = {
  UPDATA_SECTION({ commit }, data) {
    commit(UPDATA_SECTION, data);
  },
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

  SET_DIALOG_LIST_ARRANGE({ commit }, data) {
    commit(SET_DIALOG_LIST_ARRANGE, data);
  },

  SET_DIALOG_EDIT_LIST({ commit }, data) {
    commit(SET_DIALOG_EDIT_LIST, data);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};
