export const sorttool = {
    sortXML(data){
        console.log(data,"XML初始数据")
        let result = data[0].list
        let output = {}
        result.map(item=>{
            output[item.property] = item.describe
        })
        return output
    }
}