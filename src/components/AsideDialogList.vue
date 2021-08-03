<template>
  <div>
      
    <el-tree
      :data="dialogList"
      :props="defaultProps"
      @node-click="handleNodeClick"
      :highlight-current="true"
      node-key="id"
      ref="aside_dialog"
    ></el-tree>
    <button @click="test">test</button>
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
      defaultProps: {
        children: "children",
        label: "label",
      },
      selectName: "",
    };
  },
  computed: {
    dialogList: {
      get() {
        let dialogListAll = this.$store.getters["section/dialogListGet"];
        let dialogList =[]
      
        Object.keys(dialogListAll).map((item, index) => {
          let temp = {
            id: index,
            label: item,
          };
          dialogList.push(temp);
        });

        return dialogList;
      },
    },
  },
  mounted() {},

  methods: {
      test(){
          console.log(this.dialogList, "this.dialogList");
      },
    handleNodeClick(data) {
      //   console.log(data.label, "当前选择的selectName");
      this.selectName = data.label;
      event.$emit("selectDialogNameChange", this.selectName);
      //   event.$on("countListObjChange", this.countListObjChange);
      //   let sectionListAll = this.$store.getters["section/sectionListGet"];
      //   let sectionName = Object.keys(sectionListAll);
      //   console.log(sectionListAll, "sectionListAll");
      //   console.log(this.sectionList, "sectionList");
    },
  },
};
</script>

<style lang="scss">
.el-tree--highlight-current .el-tree-node.is-current > .el-tree-node__content {
  background-color: #f06060 !important;
}
.el-tree-node__label {
  font-size: 14px;
  line-height: 14px;
}
</style>
