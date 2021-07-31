const fs = window.require('fs')
// import XLSX from  'xlsx'
const fileList ={
    mainQuest:"/section-1/MainQuestStarters.json",
    conversation:"/section-1/conversation.json"
}

export const loader ={

    // 加载json文件
    loadFile(rootpath){
        console.log("==>rootpath",rootpath)
        console.log("rootpath+fileList.mainQuest",rootpath+fileList.mainQuest)
        fs.readFile(rootpath+fileList.mainQuest,"utf-8",(err,data)=>{
            if(err){
                console.log("err",err)
            }
            console.log(data,"导入信息详情");
        })
    }
}

