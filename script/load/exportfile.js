const fs = window.require("fs");
const path = require("path");
import event from "../tool/event";
import { PATH_CONFIG } from "../../script/config/config.js";

const exportPath = {
  sectionData: "/exportSection.json",
  dialogEditList: "/exportDialoglib.json",
  dialogListArrange: "/exportDialogConfig.json"
};
const savePath = {
  sectionData: "/conversation.json",
  dialogEditList: "/dialogEditData.json"
};
export const exportutil = {

  //   exportBuilding(exportPath,str){
  //     const buildingListPath = path.join(
  //         exportPath,
  //         "buildingList.json"
  //     )

  //     if(!fs.existsSync(exportPath)) {
  //         fs.mkdirSync(exportPath)
  //     }
  //     fs.writeFileSync(buildingListPath, str)
  // },


  exportJSON(rootpath, fileName, str) {
    let chapter = this.getChapter()

    const sectionDataPath = path.join(rootpath + PATH_CONFIG.exportChapterDataPath + "/" + chapter, exportPath[fileName]);
    console.log("chapter:", chapter)
    console.log("sectionDataPath:", sectionDataPath)

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
    const sectionDataPath = path.join(rootpath + PATH_CONFIG.localDataPath + "/" + chapter, savePath[fileName]);
    console.log("chapter:", chapter)
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
