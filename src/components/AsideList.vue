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
    <el-row type="flex" style="margin-top:10px">
      <el-button @click="addSection" plain icon="el-icon-plus"
        >新增场景</el-button
      >
      <el-input v-model="inputaddSection" placeholder="请输入内容"></el-input>
    </el-row>
    <el-row type="flex" style="margin-top:10px"> 
       <el-button @click="deleteSection" plain icon="el-icon-delete-solid"
        >删除场景</el-button
      >
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
      inputaddSection: "",
      sectionListAllUpdata : this.$store.getters["section/sectionListGet"],
      sectionListTemp:[]
    };
  },

  mounted() {
    event.$on("sectionChange",(val)=>{
       this.sectionListAll = val
    })
    // console.log(this.textConfig,this.sectionList,"textConfig---sectionList---------++++++++++")
  },
  computed: {
  
    textConfig: {
      get() {
        let textConfig = this.$store.getters["configuration/textConfigGet"];
        return textConfig;
      },
    },
    sectionListAll:{
      get(){
        return this.$store.getters["section/sectionListGet"]
      },
      set(val){
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
        this.sectionListTemp = sectionList
      }
    },
    sectionList:{
      get(){
         
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
        // this.sectionList = sectionList
        // if(this.sectionListTemp == sectionList  ){
        //   return this.sectionListTemp
        // }
        //缓存
        return this.sectionListTemp.length>0?this.sectionListTemp:sectionList
      },
      set(){

      }
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
          describe: id,
        };
        this.$store.dispatch("section/UPDATA_SECTION", msg);
      });
      console.log(lostsectionIDList, "找不到");
    },
    sectionListAllUpdata(){
        console.log("this.$forceUpdate();")
       
    }
  },
  methods: {

    restoreData(){
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

    deleteSection(){
      console.log(this.selectName,"this.selectName")
      if(!this.selectName){
        return
      }
      let msg={
        type:"delete_section",
        sectionName:this.selectName
      }
      this.$store.dispatch("section/UPDATA_SECTION", msg);
    },
    addSection() {
      if (this.inputaddSection == false) {
        return;
      }

      let addsectionName = this.inputaddSection;

      let msg = {
        type: "add_section",
        describe: addsectionName,
      };
      this.$store.dispatch("section/UPDATA_SECTION", msg);

    },
    handleNodeClick(data) {
      let sectionListAll = this.$store.getters["section/sectionListGet"];
      console.log(this.textConfig, "-textConfig");

      console.log(
        sectionListAll,
        Object.keys(sectionListAll),
        "-sectionListAll"
      );
      this.selectName = data.sectionName;
      event.$emit("selectNameChange", this.selectName);
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
