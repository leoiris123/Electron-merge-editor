const SET_CONFIGURATION = "set_configuration" // 人物 音效等配置
const state = {
    configuration:{}
};

const mutations = {
    [SET_CONFIGURATION](state,data){
        console.log(data,"<==执行了SET_CONFIGURATION")
        state.configuration = data
    }
};
const getters = {
    configurationGet(state){
        console.log("执行了==>configurationGet");
        return state.configuration
    }
};
const actions = {
    SET_CONFIGURATION({ commit }, data) {
        commit(SET_CONFIGURATION, data);
    },
};

export default {
  namespaced: true,
  state,
  mutations,
  getters,
  actions,
};