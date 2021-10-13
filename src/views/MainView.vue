<template>
  <div class="main">
    <el-container style="height:100%;weight100%">
      <el-header height="10%" class="top-list">
        <el-button @click="dataCombine" type="primary" icon="el-icon-position"
          >导出合并</el-button
        >
        <el-button @click="dataReplace" plain icon="el-icon-download"
          >导入替换</el-button
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
        <el-aside width="25%">
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
    dataCombine() {
      let rootPath = localStorage.getItem("rootPath");
      //获取本地数据
      let sectionListAll = this.$store.getters["section/sectionListGet"];
      let dialogEditListAll = this.$store.getters["section/dialogEditListGet"];
      let dialogListArrange =
        this.$store.getters["section/dialogListArrangeGet"];

      let outaimDialogPath = rootPath + "/exportData/" + "exportDialoglib.json";
      let outaimScenePath = rootPath + "/exportData/" + "exportSection.json";
      let outaimlanPath = rootPath + "/exportData/" + "exportDialogConfig.json";

      // 获取外部数据;
      Promise.all([
        myfs.readfile(outaimDialogPath),
        myfs.readfile(outaimScenePath),
        myfs.readfile(outaimlanPath),
      ]).then((reslist) => {
        this.aimDialog = reslist[0];
        this.aimScene = reslist[1];
        this.aimlan = reslist[2];
        console.log(reslist, "list");
        for (let key in sectionListAll) {
          this.aimScene[key] = sectionListAll[key];
        }

        for (let key in dialogEditListAll) {
          this.aimDialog[key] = dialogEditListAll[key];
        }

        for (let key in dialogListArrange) {
          this.aimlan[key] = dialogListArrange[key];
        }

        //重写外部文件
        console.log(this.aimDialog, "JSON.stringify(this.aimDialog)");
        fs.writeFileSync(outaimDialogPath, JSON.stringify(this.aimDialog));
        fs.writeFileSync(outaimScenePath, JSON.stringify(this.aimScene));
        fs.writeFileSync(outaimlanPath, JSON.stringify(this.aimlan));
      });
    },
    dataReplace() {
      //此时其实没有对保存数据和导出数据作区分
      //因此可以直接对比修改
      //
      this.handleReplaceDialog();
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
  line-height: 20px;
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
