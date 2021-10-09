

const fs = window.require("fs");
export const myfs = {
    readfile(path) {
        return new Promise((resolve, reject) => {
            fs.readFile(
                path,
                "utf-8",
                (err, data) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(JSON.parse(data))
                    }
                }
            );
        })
    }


}