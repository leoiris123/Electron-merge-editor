const fs = window.require("fs");
import XLSX from "xlsx";
import store from "../../src/store";
import {sorttool} from "../tool/sortData.js"
const fileList = {
  mainQuest: {
      localPath:"/section-1/MainQuestStarters.json",
      storeScript:"section/SET_MAINQUEST"
  },  
  conversation: {
    localPath:"/section-1/conversation.json",
    storeScript:"section/SET_SECTION_LIST"
  },
  dialogEditData:{
    localPath:"/section-1/dialogEditData.json",
    storeScript:"section/SET_DIALOG_EDIT_LIST"
  },
  configuration:{
    localPath:"/section-1/DialogCharacterConfigs.json",
    storeScript:"configuration/SET_CONFIGURATION" 
  }
};
const XMLList = {
//   excelDialog: "/section-1/Dialog.xls",
  dialogConfig:{
    localPath:"/section-1/dialogConfig.xls",
    storeScript:"section/SET_DIALOG_LIST"
  },
  textConfig:{
    localPath:"/section-1/textConfig.xlsx",
    storeScript:"configuration/SET_TEXT_CONFIG" 
  }
};

export const loader = {
  // 加载XML文件
  loadXML(rootpath, XMLname) {
    console.log("==>XMLname", XMLname);
    fs.readFile(rootpath + XMLList[XMLname].localPath, (err, data) => {
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
      if(XMLname =="textConfig"){
     
       let after =  sorttool.sortXML(result)
       store.dispatch(XMLList[XMLname].storeScript, after);
       console.log(result,after,"after---------**")
        return
      }
      //对导入的excel数据进行整理
      console.log(result,wb,"--------------------------------")
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
      store.dispatch(XMLList[XMLname].storeScript, dialog);
   
    });
  },
  // 加载json文件
  loadFile(rootpath, filename) {
    console.log("==>rootpath,", rootpath);
    console.log("==>filename", filename);
    fs.readFile(rootpath + fileList[filename].localPath, "utf-8", (err, data) => {
      if (err) {
        console.warn("err", err);
      } else {
        store.dispatch(fileList[filename].storeScript, JSON.parse(data));
      }
    });
  },
};
