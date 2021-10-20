<template>
  <div>
    <div id="dialog_aside" v-if="!fold">
      <el-row type="flex">
        <el-input
          class="fixed"
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
        :data="dialogList"
        :props="defaultProps"
        @node-click="handleNodeClick"
        :highlight-current="true"
        :render-content="renderContent"
        :current-node-key="selectName"
        node-key="id"
        ref="aside_dialog"
        class="dialog_aside_main"
        :filter-node-method="filterNode"
      ></el-tree>
    </div>
    <div v-else>
      <el-button
        @click="handleFold"
        style="position: absolute"
        class="el-icon-d-arrow-right"
      ></el-button>
    </div>
    <!-- <button @click="test">test</button> -->
  </div>
</template>

<script>
import event from "../../script/tool/event";
export default {
  name: "AsidedialogList",

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
      filterText: "",
      checkdialogEditList: {},
    };
  },
  computed: {
    checkdialogEditGroup: {
      get() {
        let checkdialogEditList = Object.keys(this.checkdialogEditList);
        let dialogListAll = this.$store.getters["section/dialogListGet"];
        let checkdialogEditGroup = {};
        for (let key in dialogListAll) {
          dialogListAll[key];
          for (let key2 in dialogListAll[key]) {
            if (checkdialogEditList.indexOf(key2) < 0) {
              //只要有一条没配好
              checkdialogEditGroup[key] = true;
            }
          }
        }
        return checkdialogEditGroup;
      },
    },
    dialogList: {
      get() {
        let dialogListAll = this.$store.getters["section/dialogListGet"];
        let dialogList = [];

        Object.keys(dialogListAll).map((item, index) => {
          let temp = {
            id: item,
            label: item,
            icon: this.checkdialogEditGroup[item] && this.checkFlag,
          };
          dialogList.push(temp);
        });
        console.log("asd");
        return dialogList;
      },
    },
    // top: {
    //   get() {},
    // },
  },

  mounted() {
    console.log(this.checkdialogEditGroup, "a11111sdasdasd");
    event.$on("checkdialogEditList", (checkdialogEditList) => {
      this.checkdialogEditList = checkdialogEditList;
      this.checkFlag = true;
      // setCurrentKey
      // console.log(this.selectName, "this.selectName");
    });
  },

  methods: {
    handleFold() {
      this.fold = !this.fold;
      console.log("this.fold", this.fold);
    },
    renderContent(h, { node, data, store }) {
      return (
        <span class="quest-item">
          <i
            v-show={data.icon === true}
            class="header-icon el-icon-info"
            style="color: red"
          ></i>
          {node.label}
        </span>
      );
    },
    filterTextChange(val) {
      this.$refs.aside_dialog.filter(val);
      // throttle(this.$refs.aside.filter(val), 10000);
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    test() {
      console.log(this.dialogList, "this.dialogList");
    },
    handleNodeClick(data) {
      console.log(data.label, "当前选择的selectName");
      this.selectName = data.label;
      event.$emit("selectDialogNameChange", this.selectName);
      // if (this.$refs.aside_dialog && this.$refs.aside_dialog.getCurrentKey()) {
      //   this.$refs.aside_dialog.setCheckedKeys(
      //     this.$refs.aside_dialog.getCurrentKey(),
      //     true
      //   );
      // }
      // console.log(this.$refs.aside_dialog.setCheckedNodes, "setCheckedNodes");
      // let top = document.querySelector(".fixed");

      // console.log(top, top.getBoundingClientRect().top, "top.scrollTop");
      //   event.$on("countListObjChange", this.countListObjChange);
      //   let sectionListAll = this.$store.getters["section/sectionListGet"];
      //   let sectionName = Object.keys(sectionListAll);
      //   console.log(sectionListAll, "sectionListAll");
      //   console.log(this.sectionList, "sectionList");
    },
  },
};
</script>

<style lang="scss" >
// .el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
//   background-color: #f06060 !important;
// }
.el-tree-node__label {
  font-size: 14px;
  line-height: 14px;
}
#dialog_aside {
  height: 85vh;
}
.dialog_aside_main {
  height: 89vh;
  overflow: scroll;
}
.fixed {
  position: fixed;
  // top: ;
}
</style>
