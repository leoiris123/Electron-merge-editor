<template>
  <div class="main">
    <el-container style="height:100%;weight100%">
      <el-header height="6%" class="top-list">
        <el-button @click="open" type="success" icon="el-icon-position"
          >合并操作</el-button
        >
        <el-button
          @click="checkExcelJson"
          type="warning"
          icon="el-icon-position"
          >对比检测</el-button
        >
        <el-button @click="saveResource" plain icon="el-icon-folder-checked"
          >保存</el-button
        >
        <el-button @click="exportResource" plain icon="el-icon-upload2"
          >导出</el-button
        >
        <el-button plain icon="el-icon-chat-line-round" @click="goDialogView"
          >对白库</el-button
        >
      </el-header>
      <el-container>
        <el-aside style="width: auto" max-width="25%">
          <aside-list></aside-list>
        </el-aside>
        <el-container>
          <el-header height="4%">
            <header-view> </header-view>
          </el-header>
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
import event from "../../script/tool/event.js";
import { PATH_CONFIG } from "../../script/config/config.js";
import BackBtn from "@/components/BackBtn.vue";
import AsideList from "@/components/AsideList.vue";
import SectionEdit from "@/components/SectionEdit";
import { loader } from "../../script/load/load.js";
import { exportutil } from "../../script/load/exportfile.js";
const { dialog } = window.require("electron").remote;
import { filtertool } from "../../script/tool/filterempty";
import { myfs } from "../../script/tool/myfs.js";
import HeaderView from "../views/HeaderView.vue";
const fs = window.require("fs");
// const { dialog } = require('electron')
export default {
  name: "MainView",
  components: {
    // DialogView,
    BackBtn,
    HeaderView,
    AsideList,
    SectionEdit,
  },
  data() {
    return {
      rootPath: "kong",
    };
  },
  mounted() {
    //根据选择的章节来加载数据
    let chapter = this.$route.params.chapter;
    console.log("chapter:", chapter);
  },
  methods: {
    checkExcelJson() {
      this.$confirm("id不存在于excel的数据将被删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "正在对比删除请等待",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },

    open() {
      this.$confirm("此操作将重写导出总文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          event.$emit("MergeFiles");
          this.$message({
            type: "success",
            message: "正在重写总数据!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消",
          });
        });
    },

    handleReplaceDialog() {
      let rootPath = localStorage.getItem("rootPath");
      //获取本地数据
      let sectionListAll = this.$store.getters["section/sectionListGet"];
      filtertool.filterindex(sectionListAll);
      let dialogEditListAll = this.$store.getters["section/dialogEditListGet"];
      filtertool.filterempty(dialogEditListAll);
      let dialogListArrange =
        this.$store.getters["section/dialogListArrangeGet"];

      let dialogpath = rootPath + "/replace/dialogEditData.json";
      let scencepah = rootPath + "/replace/conversation.json";
      let lanpath = rootPath + "/replace/DialogCharacterConfigs.json";

      // 获取外部数据;
      Promise.all([
        myfs.readfile(dialogpath),
        myfs.readfile(scencepah),
        myfs.readfile(lanpath),
      ]).then((reslist) => {
        this.aimDialog = reslist[0];
        this.aimScene = reslist[1];
        this.lan = reslist[2];
        for (let key in sectionListAll) {
          if (Object.prototype.hasOwnProperty.call(this.aimScene, key)) {
            sectionListAll[key] = this.aimScene[key];
          }
        }

        for (let key in dialogEditListAll) {
          if (Object.prototype.hasOwnProperty.call(this.aimDialog, key)) {
            dialogEditListAll[key] = this.aimDialog[key];
          }
        }

        for (let key in dialogListArrange) {
          if (Object.prototype.hasOwnProperty.call(this.lan, key)) {
            dialogListArrange[key] = this.lan[key];
          }
        }

        this.$store.dispatch("section/SET_SECTION_LIST", sectionListAll);
        this.$store.dispatch("section/SET_DIALOG_EDIT_LIST", dialogEditListAll);
        this.$store.dispatch(
          "section/SET_DIALOG_LIST_ARRANGE",
          dialogListArrange
        );
      });
    },

    exportResource() {
      console.log("=>导出资源");
      let rootPath = localStorage.getItem("rootPath");
      let sectionListAll = this.$store.getters["section/sectionListGet"];
      filtertool.filterindex(sectionListAll);
      let sectionDataStr = JSON.stringify(sectionListAll);
      exportutil.exportJSON(rootPath, "sectionData", sectionDataStr);

      let dialogEditListAll = this.$store.getters["section/dialogEditListGet"];
      filtertool.filterempty(dialogEditListAll);
      let dialogEditListStr = JSON.stringify(dialogEditListAll);
      exportutil.exportJSON(rootPath, "dialogEditList", dialogEditListStr);

      // dialogListArrange
      let dialogListArrange =
        this.$store.getters["section/dialogListArrangeGet"];
      let dialogListArrangeStr = JSON.stringify(dialogListArrange);
      exportutil.exportJSON(
        rootPath,
        "dialogListArrange",
        dialogListArrangeStr
      );
    },
    saveResource() {
      console.log("=>保存资源");
      let rootPath = localStorage.getItem("rootPath");
      let sectionListAll = this.$store.getters["section/sectionListGet"];
      filtertool.filterindex(sectionListAll);
      let sectionDataStr = JSON.stringify(sectionListAll);
      exportutil.saveJSON(rootPath, "sectionData", sectionDataStr);

      let dialogEditListAll = this.$store.getters["section/dialogEditListGet"];
      filtertool.filterempty(dialogEditListAll);
      let dialogEditListStr = JSON.stringify(dialogEditListAll);
      exportutil.saveJSON(rootPath, "dialogEditList", dialogEditListStr);

      let dialogConfig = this.$store.getters["section/dialogListArrangeGet"];
      let dialogConfigStr = JSON.stringify(dialogConfig);
      exportutil.saveJSON(rootPath, "dialogConfig", dialogConfigStr);
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
  background-color: #89a5d8;
  color: #333;
  text-align: center;
  line-height: 60px;
  /* width:; */
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 20px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  padding: 0;
  margin: 0;
  /* line-height: 160px; */
}

body > .el-container {
  margin-bottom: 40px;
}

.top-list {
  background-color: #8195b9;
  padding: 0;
  margin: 0;
}
</style>
