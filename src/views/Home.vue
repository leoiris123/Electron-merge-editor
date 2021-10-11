<template>
  <div class="home">
    <el-row type="flex">
      <el-button @click="importResource">导入路径</el-button>
      <el-input :value="rootPath" placeholder="请选择"></el-input>
    </el-row>
    <!-- <el-button plain icon="el-icon-chat-line-round" @click="goMainView"
      >进入主界面</el-button
    > -->
    <el-row style="top: 5%">
      <el-row v-for="(chapter, index) in dirList" :key="index" class="row">
        <el-button
          type="primary"
          icon="el-icon-chat-line-round"
          @click="goMainView(chapter)"
          v-loading.fullscreen.lock="fullscreenLoading"
          >{{ chapter }}</el-button
        >
      </el-row>
    </el-row>

    <div></div>
    <p></p>
  </div>
</template>

<script>
import { PATH_CONFIG } from "../../script/config/config.js";
import { loader } from "../../script/load/load.js";
const { dialog } = window.require("electron").remote;
const fs = window.require("fs");
export default {
  name: "Home",
  components: {},
  data() {
    return {
      fullscreenLoading: false,
      rootPath: "",
      dirList: [],
    };
  },
  mounted() {
    let rootPath = localStorage.getItem("rootPath");
    if (rootPath && rootPath !== "") {
      this.rootPath = rootPath;
    }
    this.finddirList();
  },
  computed: {},
  methods: {
    finddirList() {
      let dirList = [];
      if (this.rootPath !== "") {
        fs.readdir(this.rootPath + PATH_CONFIG.localDataPath, (err, files) => {
          if (err) {
            console.log(err);
          } else {
            dirList = files
              .map((item) => {
                if (!item.indexOf("chapter_")) {
                  return item;
                }
              })
              .filter((item) => {
                return item !== undefined;
              });
            console.log(files, "files");
            console.log(dirList, "dirList ");
          }
        });
        this.dirList = dirList;
      }
      setTimeout(() => {
        this.dirList = dirList;
      }, 0);
    },
    goMainView(chapter) {
      console.log("==>进入主界面");
      localStorage.setItem("chapter", chapter);
      //加载逻辑迁移到此处
      this.fullscreenLoading = true;
      let rootPath2 = this.rootPath + PATH_CONFIG.localDataPath + "/" + chapter;
      Promise.all([
        loader.loadFile(rootPath2, "conversation"),
        loader.loadFile(rootPath2, "dialogEditData"),
        // loader.loadXML(rootPath, "excelDialog");
        //导入资源配置文件
        loader.loadFile(rootPath2, "configuration"),
        loader.loadXML(rootPath2, "dialogConfig"),
        loader.loadXML(rootPath2, "textConfig"),
      ]).then((res) => {
        this.fullscreenLoading = false;
        this.$router.push({ name: "MainView", params: { chapter: chapter } });

        console.log("res---", res);
      });
    },
    importResource() {
      console.log("=>导入路径/资源");

      dialog
        .showOpenDialog({
          properties: ["openFile", "openDirectory"],
        })
        .then((result) => {
          console.log(result.canceled, "1");
          if (!result.canceled) {
            this.rootPath = result.filePaths[0];
            // this.loadFile(this.rootPath);
            localStorage.setItem("rootPath", this.rootPath);
            this.finddirList();
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
  },
  beforeRouteEnter(to, from, next) {
    console.log("to,from", to, from);
    next((vm) => {
      if (from.name == "MainView") {
        window.location.reload(); //章节切换清空store
      }
      // 通过 `vm` 访问组件实例
    });
  },
};
</script>
<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;

  position: absolute;
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
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.top-list {
  background-color: #f1bcd7;
}
/* -------- */
// .g-container
//     -for(var i=0; i<50; i++)
//         p

/* @import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@200&display=swap'); */

$str: "别催了，我正在！！正在全速加载加载！！！";
$length: str-length($str);
$n: 50;
$animationTime: 3;
$perColumnNums: 25;

@function randomChar() {
  $r: random($length);
  @return str-slice($str, $r, $r);
}

@function randomChars($number) {
  $value: "";

  @if $number > 0 {
    @for $i from 1 through $number {
      $value: $value + randomChar();
    }
  }
  @return $value;
}

body,
html {
  width: 100%;
  height: 100%;
  background: rgb(235, 228, 228);
  display: flex;
  overflow: hidden;
}

.g-container {
  width: 100vw;
  display: flex;
  justify-content: space-between;
  flex-wrap: nowrap;
  flex-direction: row;
  font-family: "Inconsolata", monospace, sans-serif;
}

p {
  position: relative;
  width: 2vh;
  height: 100vh;
  text-align: center;
  font-size: 2vh;
  word-break: break-all;
  white-space: pre-wrap;

  &::before,
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
  }
}

@for $i from 0 through $n {
  $content: randomChars($perColumnNums);
  $contentNext: randomChars($perColumnNums);
  $delay: random($n);
  $randomAnimationTine: #{$animationTime + random(20) / 10 - 1}s;

  p:nth-child(#{$i})::before {
    content: $content;
    color: rgb(231, 5, 73);
    text-shadow: 0 0 1px #fff, 0 0 2px #fff, 0 0 5px currentColor,
      0 0 10px currentColor;
    animation: typing-#{$i}
      $randomAnimationTine
      steps(20, end)
      #{$delay *
      0.1s *
      -1}
      infinite;
    z-index: 1;
  }

  // p:nth-child(#{$i})::after {
  //     // $alpha: random(40) / 100 + 0.6;
  //     $alpha:0.3;
  //     content: '';
  //     background: linear-gradient(rgba(0, 0, 0, $alpha), rgba(0, 0, 0, $alpha), rgba(0, 0, 0, $alpha), transparent 75%, transparent);
  //     background-size: 100% 220%;
  //     background-repeat: no-repeat;
  //     animation: mask $randomAnimationTine infinite #{($delay - 2) * 0.1s * -1} linear;
  //     z-index: 2;
  // }

  @keyframes typing-#{$i} {
    0% {
      height: 0;
    }
    25% {
      height: 100%;
    }
    100% {
      height: 100%;
      content: $contentNext;
    }
  }
}

@keyframes mask {
  0% {
    background-position: 0 220%;
  }
  30% {
    background-position: 0 0%;
  }
  100% {
    background-position: 0 0%;
  }
}
.row {
  margin: 9px;
}
</style>
