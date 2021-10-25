<template>
  <div>
    <div v-if="!fold" id="aside">
      <el-row type="flex"
        ><el-input
          placeholder="输入关键字进行过滤"
          v-model="filterText"
          size="large"
          clearable
          @input="filterTextChange"
        ></el-input>
        <el-button
          @click="handleFold"
          size="mini"
          class="el-icon-d-arrow-left"
        ></el-button
      ></el-row>

      <el-tree
        :data="sectionList"
        :props="defaultProps"
        @node-click="handleNodeClick"
        :highlight-current="true"
        node-key="id"
        ref="aside"
        class="aside_main"
        :filter-node-method="filterNode"
      ></el-tree>

      <el-row type="flex" style="margin-top: 5px">
        <el-button @click="deleteSection" plain icon="el-icon-delete-solid"
          >删除场景</el-button
        >
      </el-row>
    </div>
    <div v-else>
      <el-button
        @click="handleFold"
        style="position: absolute"
        class="el-icon-d-arrow-right"
      ></el-button>
    </div>
  </div>
</template>

<script>
import event from "../../script/tool/event";

export default {
  name: "AsideList",

  components: {},

  directives: {},

  data() {
    return {
      fold: false,
      defaultProps: {
        children: "children",
        label: "label",
      },
      selectName: "",
      inputaddSection: "",
      sectionListAllUpdata: this.$store.getters["section/sectionListGet"],
      sectionListTemp: [],
      filterText: "",
    };
  },

  mounted() {
    event.$on("sectionChange", (val) => {
      this.sectionListAll = val;
      this.$forceUpdate();
    });
  },
  computed: {
    textConfig: {
      get() {
        let textConfig = this.$store.getters["configuration/textConfigGet"];
        return textConfig;
      },
    },
    sectionListAll: {
      get() {
        return this.$store.getters["section/sectionListGet"];
      },
      set(val) {
        let sectionListAll = val;
        let sectionList = [];
        Object.keys(sectionListAll).map((item, index) => {
          let temp = {
            id: index,
            label: this.textConfig[item] ? item + this.textConfig[item] : item,
            sectionName: item,
          };
          sectionList.push(temp);
        });
        this.sectionListTemp = sectionList;
      },
    },
    sectionList: {
      get() {
        let sectionListAll = this.sectionListAll;
        let sectionList = [];
        Object.keys(sectionListAll).map((item, index) => {
          let temp = {
            id: index,
            label: this.textConfig[item] ? item + this.textConfig[item] : item,
            sectionName: item,
          };
          sectionList.push(temp);
        });
        // console.log(sectionListAll, "sectionListAll");
        // console.log(sectionList, "sectionList");
        // this.sectionList = sectionList
        // if(this.sectionListTemp == sectionList  ){
        //   return this.sectionListTemp
        // }
        //缓存
        return this.sectionListTemp.length > 0
          ? this.sectionListTemp
          : sectionList;
      },
      set() {},
    },
  },
  watch: {
    textConfig(newval) {
      let sectionListAll = this.$store.getters["section/sectionListGet"];
      let lostsectionIDList = [];
      Object.keys(newval).map((id) => {
        if (!sectionListAll[id]) {
          lostsectionIDList.push(id);
        }
      });
      lostsectionIDList.map((id) => {
        let msg = {
          type: "add_section",
          sectionName: id,
        };
        this.$store.dispatch("section/UPDATA_SECTION", msg);
      });
      console.log(lostsectionIDList, "找不到");
    },
    sectionListAllUpdata() {
      console.log("this.$forceUpdate();");
    },
  },
  methods: {
    handleFold() {
      this.fold = !this.fold;
      console.log("this.fold", this.fold);
    },
    filterTextChange(val) {
      this.$refs.aside.filter(val);
      // throttle(this.$refs.aside.filter(val), 10000);
    },
    // 搜索框使用
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    restoreData() {
      let sectionListAll = this.sectionListAll;

      let sectionList = [];
      Object.keys(sectionListAll).map((item, index) => {
        let temp = {
          id: index,
          label: this.textConfig[item] ? item + this.textConfig[item] : item,
          sectionName: item,
        };
        sectionList.push(temp);
      });
      console.log(sectionListAll, "sectionListAll");
      console.log(sectionList, "sectionList");
      return sectionList;
    },

    deleteSection() {
      console.log(this.selectName, "this.selectName");
      if (!this.selectName) {
        return;
      }
      let msg = {
        type: "delete_section",
        sectionName: this.selectName,
      };
      this.$store.dispatch("section/UPDATA_SECTION", msg);
    },

    handleNodeClick(data) {
      let sectionListAll = this.$store.getters["section/sectionListGet"];
      // console.log(this.textConfig, "-textConfig");

      // console.log(
      //   sectionListAll,
      //   Object.keys(sectionListAll),
      //   "-sectionListAll"
      // );
      this.selectName = data.sectionName;
      event.$emit("selectNameChange", this.selectName);

      /* eslint-disable */
      event.$emit("headerShowName", data.label);
      /* eslint-disable */
    },
  },
};
</script>

<style lang="scss">
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #8fc5e9 !important;
}
.el-tree-node__label {
  font-size: 14px;
  line-height: 14px;
}
#aside {
  height: 94vh;
  // overflow: scroll;
}
.aside_main {
  height: 85vh;
  overflow: scroll;
}
.el-tree-node.is-current.is-focusable {
  background: rgb(157, 203, 228) !important;
}
</style>
