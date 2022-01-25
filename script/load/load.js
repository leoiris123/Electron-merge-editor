const fs = window.require("fs");
// import { reject, resolve } from "core-js/fn/promise";
import XLSX, { read } from "xlsx";
import store from "../../src/store";
import { sorttool } from "../tool/sortData.js";
let fileList = {
  mainQuest: {
    localPath: "/MainQuestStarters.json",
    storeScript: "section/SET_MAINQUEST",
  },
  conversation: {
    localPath: "/conversation.json",
    storeScript: "section/SET_SECTION_LIST",
  },
  dialogEditData: {
    localPath: '/dialogEditData.json',
    storeScript: "section/SET_DIALOG_EDIT_LIST",
  },
  configuration: {
    localPath: "/DialogCharacterConfigs.json",
    storeScript: "configuration/SET_CONFIGURATION",
  },
};
const XMLList = {
  //   excelDialog: "/localData/chapter_1/Dialog.xls",
  dialogConfig: {
    localPath: read("/dialogConfig.xlsx"),
    storeScript: "section/SET_DIALOG_LIST",
    sortType: { header: ["property", "id", "en", "zh", "pt", "ko", "de", "tr", "fr", "it", "ja", "es", "ru", "zh_t"] },
  },
  textConfig: {
    localPath: "/textConfig.xlsx",
    storeScript: "configuration/SET_TEXT_CONFIG",
  },
};
// function read(path){
//   //后续优化
//   return 
// }
function getLocalPath(filename) {
  if (filename === 'conversation') {
    fileList[filename].localPath = `/conversation${getchapterNum()}.json`
  } else if (filename === 'dialogEditData') {
    fileList[filename].localPath = `/dialogEditData${getchapterNum()}.json`
  } else if (filename === 'configuration') {
    fileList[filename].localPath = `/DialogCharacterConfigs${getchapterNum()}.json`
  }
}
function getExcelPath(filename) {
  if (filename === 'dialogConfig') {
    XMLList[filename].localPath = `/dialogConfig${getchapterNum()}.xlsx`
  } else if (filename === 'textConfig') {
    XMLList[filename].localPath = `/textConfig${getchapterNum()}.xlsx`
  }
}
function getchapterNum() {
  let chapter = localStorage.getItem("chapter").replace("chapter", "")
  console.log("chapter11", chapter)
  return chapter
}
export const loader = {
  // 加载XML文件
  loadXML(rootpath, XMLname) {
    return new Promise((resolve, reject) => {
      console.log("==>XMLname", XMLname);
      getExcelPath(XMLname)
      fs.readFile(rootpath + XMLList[XMLname].localPath, (err, data) => {
        if (err) {
          console.log("err", err);
        }
        let newtime = new Date().getTime();

        let wb = XLSX.read(data, { type: "buffer" });

        const result = [];
        // console.log(wb,"wb")
        wb.SheetNames.forEach((sheetName) => {
          //
          let list;
          if (XMLList[XMLname].sortType) {
            list = XLSX.utils.sheet_to_json(
              wb.Sheets[sheetName],
              XMLList[XMLname].sortType
            );
          } else {
            list = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
          }
          let aftertime = new Date().getTime();
          let secondes = (aftertime - newtime) / 1000;
          console.log("secondes", XMLname, secondes);
          result.push({
            name: sheetName,
            list,
            total: list.length || 0,
          });
        });

        if (XMLname == "textConfig") {
          let after = sorttool.sortXML(result);
          store.dispatch(XMLList[XMLname].storeScript, after);
          // console.log(result, after, "after---------**");
          return;
        }
        if (XMLname == "dialogConfig") {
          //对导入的excel数据进行整理
          // console.log(result, wb, "--------------------------------");
          let list = result[0].list;
          let dialog = {};
          list.map((item, index) => {
            //去除表头无关属性
            if (index < 6) return;
            if (item.property) {
              if (!dialog[item.property]) {
                dialog[item.property] = {};
                dialog[item.property][item.id] = item;
              } else {
                dialog[item.property][item.id] = item;
              }
            }
          });
          // console.log(list, "list");
          store.dispatch(XMLList[XMLname].storeScript, dialog);
        }

      });
      resolve("xml加载完成")
    })

  },
  // 加载json文件
  loadFile(rootpath, filename) {
    getLocalPath(filename)
    console.log("fileList[filename]", fileList[filename])
    return new Promise((resolve, reject) => {
      console.log("==>rootpath,", rootpath);
      console.log("==>filename", filename);
      fs.readFile(
        rootpath + fileList[filename].localPath,
        "utf-8",
        (err, data) => {
          if (err) {
            console.warn("err", err);
          } else {
            store.dispatch(fileList[filename].storeScript, JSON.parse(data));
          }
        }
      );
      resolve("json加载完成")
    })
  },


  // 

  loadFileSingle(itemPath) {
    return new Promise((resolve, reject) => {
      fs.readFile(
        itemPath,
        "utf-8",
        (err, data) => {
          if (err) {
            reject(itemPath)
            console.warn("err", err);
          } else {
            resolve(JSON.parse(data))
          }
        }
      );

    })
  },
};
