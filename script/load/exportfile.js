const fs = window.require("fs");
const path = require("path");
import event from "../tool/event";
import { PATH_CONFIG } from "../../script/config/config.js";

let exportPath = {
  sectionData: "/exportSection.json",
  dialogEditList: "/exportDialoglib.json",
  dialogListArrange: "/exportDialogConfig.json"
};
let savePath = {
  sectionData: "/conversation.json",
  dialogEditList: "/dialogEditData.json",
  dialogConfig: "/dialogConfig.json"
};
function getexportPath(filename) {
  //后续优化
  if (filename === 'sectionData') {
    exportPath[filename] = `/exportSection${getchapterNum()}.json`
  } else if (filename === 'dialogEditList') {
    exportPath[filename] = `/exportDialoglib${getchapterNum()}.json`
  } else if (filename === 'dialogListArrange') {
    exportPath[filename] = `/exportDialogConfig${getchapterNum()}.json`
  }
}

function getsavePath(filename) {
  //后续优化
  if (filename === 'sectionData') {
    savePath[filename] = `/conversation${getchapterNum()}.json`
  } else if (filename === 'dialogEditList') {
    savePath[filename] = `/dialogEditData${getchapterNum()}.json`
  } else if (filename === 'dialogConfig') {
    savePath[filename] = `/dialogConfig${getchapterNum()}.json`
  }
}
function getchapterNum() {
  let chapter = localStorage.getItem("chapter").replace("chapter", "")
  console.log("chapter11", chapter)
  return chapter
}
export const exportutil = {

  exportJSON(rootpath, fileName, str) {
    let chapter = this.getChapter()
    getexportPath(fileName)
    const sectionDataPath = path.join(rootpath + PATH_CONFIG.exportChapterDataPath + "/" + chapter, exportPath[fileName]);

    console.log("exportPath[fileName]", exportPath[fileName])

    fs.writeFileSync(sectionDataPath, str)
    event.$notify({
      title: "导出成功",
      message: "导出成功",
      type: "success",
      duration: 1100,
    });
  },



  saveJSON(rootpath, fileName, str) {
    let chapter = this.getChapter()
    getsavePath(fileName)
    console.log(savePath[fileName], "savePath[fileName]")
    const sectionDataPath = path.join(rootpath + PATH_CONFIG.localDataPath + "/" + chapter, savePath[fileName]);
    console.log("sectionDataPath:", sectionDataPath)

    fs.writeFileSync(sectionDataPath, str)
    event.$notify({
      title: "保存成功",
      message: "保存成功",
      type: "success",
      duration: 1100,
    });
  },

  getChapter() {
    return localStorage.getItem("chapter")
  }
};
