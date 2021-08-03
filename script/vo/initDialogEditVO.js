const initchar = {
          char: "",
            emotion: "",
            isMain: false
}

class initDialogEditVO {
    constructor (id){
    //    this[id] = {
    //     left1:initchar,
    //     left2:initchar,
    //     right1=initchar,
    //     right2initchar,
        
    //    }
       this.shake = false
        this.left1={
            char: "",
            emotion: "",
            isMain: false
        }
        this.left2={
            char: "",
            emotion: "",
            isMain: false
        }
        this.right1={
            char: "",
            emotion: "",
            isMain: false
        }
        this.right2={
            char: "",
            emotion: "",
            isMain: false
        }
       

    
    }
}

export  default initDialogEditVO
