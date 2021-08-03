<template>
  <div class="main">
    <el-container style="height:100%;weight100%">
      <el-header height="10%" class="top-list">
        <el-button @click="importResource" plain icon="el-icon-download"
          >导入</el-button
        >
        <el-button @click="exportResource" plain icon="el-icon-upload2"
          >导出</el-button
        >
        <el-button @click="saveResource" plain icon="el-icon-folder-checked"
          >保存</el-button
        >
        <el-button plain icon="el-icon-chat-line-round" @click="goDialogView"
          >对白库</el-button
        >
      </el-header>
      <el-container>
        <el-aside width="25%">
          <aside-list></aside-list>
        </el-aside>
        <el-container>
          <el-header height="20%">Header</el-header>
          <el-main>
            <section-edit> </section-edit>
          </el-main>
        </el-container>
      </el-container>
    </el-container>
    <back-btn> </back-btn>
  </div>
</template>

<script>
import BackBtn from "@/components/BackBtn.vue";
import AsideList from "@/components/AsideList.vue";
import SectionEdit from "@/components/SectionEdit";
import { loader } from "../../script/load/load.js";
import { exportutil } from "../../script/load/exportfile.js";
const { dialog } = window.require("electron").remote;
import {filtertool} from "../../script/tool/filterempty"
// const { dialog } = require('electron')
export default {
  name: "MainView",
  components: {
    // DialogView,
    BackBtn,
    AsideList,
    SectionEdit,
  },
  data() {
    return {
      rootPath: "kong",
    };
  },
  methods: {
    loadFile(rootPath) {
      localStorage.setItem("rootPath", rootPath);
      //导入维护的文件
      loader.loadFile(rootPath, "conversation");
      loader.loadFile(rootPath, "dialogEditData");
      // loader.loadXML(rootPath, "excelDialog");
      //导入资源配置文件
      loader.loadFile(rootPath,"configuration")
      loader.loadXML(rootPath, "dialogConfig");
      // loader.loadXML(rootPath,"aa") //测试用
    },
    importResource() {
      console.log("=>导入资源");

      dialog
        .showOpenDialog({
          properties: ["openFile", "openDirectory"],
        })
        .then((result) => {
          console.log(result.canceled, "1");
          if (!result.canceled) {
            this.rootPath = result.filePaths[0];
            this.loadFile(this.rootPath);
            this.$notify({
              title: "导入成功",
              message: "读取路径成功",
              type: "success",
              duration: 1100,
            });
          } else {
            this.$notify({
              title: "已取消",
              message: "取消读取路径",
              type: "warning",
              duration: 900,
            });
          }
          console.log(result.filePaths, "2");
        })
        .catch((err) => {
          console.log(err, "3");
          this.$notify.error({
            title: "读取路径失败",
            message: "读取路径失败",
            duration: 1500,
          });
        });
    },
    exportResource() {
      console.log("=>导出资源");
      let rootPath = localStorage.getItem("rootPath");
      let sectionListAll = this.$store.getters["section/sectionListGet"];
      let sectionDataStr = JSON.stringify(sectionListAll);
      exportutil.exportJSON(rootPath, "sectionData", sectionDataStr);

      let dialogEditListAll = this.$store.getters["section/dialogEditListGet"];
         filtertool.filterempty(dialogEditListAll)
      let dialogEditListStr = JSON.stringify(dialogEditListAll);
      exportutil.exportJSON(rootPath, "dialogEditList", dialogEditListStr);
    },
    saveResource() {
      console.log("=>保存资源");
      let rootPath = localStorage.getItem("rootPath");
      let sectionListAll = this.$store.getters["section/sectionListGet"];
     
      let sectionDataStr = JSON.stringify(sectionListAll);
      exportutil.saveJSON(rootPath, "sectionData", sectionDataStr);
      
      let dialogEditListAll = this.$store.getters["section/dialogEditListGet"];
       filtertool.filterempty(dialogEditListAll)
      let dialogEditListStr = JSON.stringify(dialogEditListAll);
      exportutil.saveJSON(rootPath, "dialogEditList", dialogEditListStr);
    },
    goDialogView() {
      console.log("=>进入对白");
      this.$router.push({ path: "./DialogView" });
    },
  },
};
</script>
<style scoped>
.main {
  width: 100%;
  height: 100%;
  position: absolute;
  padding: 0;
  margin: 0;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 300px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  /* line-height: 260px; */
}

.el-container:nth-child(7) .el-aside {
  /* line-height: 320px; */
}
.top-list {
  background-color: #f1bcd7;
  padding: 0;
  margin: 0;
}
</style>
