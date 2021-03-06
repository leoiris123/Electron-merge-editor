const characterList = ["left1", "right1", "left2", "right2"]
import store from "../../src/store";

export const filtertool = {
    filterempty(data) {

        const configuration = store.getters["configuration/configurationGet"]
        console.log(configuration, "configuration")
        for (let key in data) {
            characterList.map(character => {
                if (data[key][character] && (data[key][character] === {} || data[key][character].char == "")) {
                    delete data[key][character]
                } else if (data[key][character] && (!data[key][character].skin || data[key][character].skin === "")) {
                    if (configuration[data[key][character].char] == undefined) {
                        console.warn(data[key][character].char, "错误角色-请更新角色配置表")
                    }
                    data[key][character].skin = configuration[data[key][character].char].spine.skin[0]
                }
            })
        }
    },
    filterindex(data) {
        for (let key in data) {
            for (let key2 in data[key].states) {
                data[key].states[key2].map(item => {
                    if (!(item.row_index == null)) {
                        delete item.row_index
                    }
                })
            }

        }
        console.log(data, "after")
    }
}