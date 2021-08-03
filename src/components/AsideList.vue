<template>
  <div>
    <!-- @node-drag-end="handleDragEnd"  draggable
    :allow-drag="allowDrag" -->
    <el-tree
      :data="sectionList"
      :props="defaultProps"
      @node-click="handleNodeClick"
      :highlight-current="true"
      node-key="id"
      ref="aside"
    ></el-tree>
    <el-row type = "flex" style="margin-top:10px">
        <el-button @click="addSection" plain icon="el-icon-plus"
          >新增场景</el-button>
        <el-input v-model="inputaddSection" placeholder="请输入内容"></el-input>
    </el-row>
     
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
      defaultProps: {
        children: "children",
        label: "label",
      },
      selectName: "",
      inputaddSection:""
    };
  },

  mounted() {},
  computed: {
    sectionList: {
      get() {
        let sectionListAll = this.$store.getters["section/sectionListGet"];

        let sectionList = [];
        Object.keys(sectionListAll).map((item, index) => {
          let temp = {
            id: index,
            label: item,
          };
          sectionList.push(temp);
        });
        console.log(sectionListAll, "sectionListAll");
        console.log(sectionList, "sectionList");
        return sectionList;
      },
    },
  },
  methods: {
    addSection(){
      if(this.inputaddSection==false){
        return
      }

      let addsectionName =  this.inputaddSection
 
      let msg = {
        type:"add_section",
        describe:addsectionName
      }
      this.$store.dispatch('section/ADD_SECTION', msg);
      this.$nextTick(()=>{
           this.$forceUpdate();
      });
   
    },
    handleNodeClick(data) {
    //   console.log(data.label, "当前选择的selectName");
      this.selectName = data.label;
      event.$emit("selectNameChange", this.selectName);
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
