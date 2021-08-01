const fs = window.require("fs");
import XLSX from "xlsx";
import store from "../../src/store";
const fileList = {
  mainQuest: "/section-1/MainQuestStarters.json",
  conversation: "/section-1/conversation.json",
};
const XMLList = {
  excelDialog: "/section-1/Dialog.xls",
  dialogConfig:"/section-1/dialogConfig.xls",
  aa:"/section-1/aa.xlsx"
};

export const loader = {
  // 加载XML文件
  loadXML(rootpath, XMLname) {
    console.log("==>XMLname", XMLname);
    fs.readFile(rootpath + XMLList[XMLname], (err, data) => {
      if (err) {
        console.log("err", err);
      }
      let wb = XLSX.read(data, { type: "buffer" });
      const result = [];
      // console.log(wb,"wb")
      wb.SheetNames.forEach((sheetName) => {
        const list = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]);
        result.push({
          name: sheetName,
          list,
          total: list.length || 0,
        });
      });
      //对导入的excel数据进行整理
      let list = result[0].list
      let dialog = {}
      list.map((item)=>{
          if(item.property){
              if(!dialog[item.property]){
                dialog[item.property] = {}
                dialog[item.property][item.id] = item
              }else{
                dialog[item.property][item.id] =item
              }
            
          }
      })
      console.log(list,"list")
      store.dispatch("section/SET_DIALOG_LIST", dialog);
   
    });
  },
  // 加载json文件
  loadFile(rootpath, filename) {
    console.log("==>rootpath,", rootpath);
    console.log("==>filename", filename);
    fs.readFile(rootpath + fileList[filename], "utf-8", (err, data) => {
      if (err) {
        console.warn("err", err);
      } else {
        store.dispatch("section/SET_SECTION_LIST", JSON.parse(data));
      }
    });
  },
};
