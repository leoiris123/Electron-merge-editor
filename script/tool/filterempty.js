const characterList = ["left1", "right1", "left2", "right2"]
export const filtertool = {
    filterempty(data){
        for(let key in data){
            characterList.map(character=>{
                if( data[key][character]  &&  (data[key][character]==={}||data[key][character].char=="")){
                    delete data[key][character]
                }
            }) 
        }
    }
}