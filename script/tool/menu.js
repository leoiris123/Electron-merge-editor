const ContextMenu = function (options) {
    // 唯一实例
    let instance;
    if (document.querySelector("#menu_ul")) {
        instance = document.querySelector("#menu_ul")
    }
    // 创建实例方法
    function createMenu(node) {
        const ul = document.createElement("ul");
        ul.classList.add("custom-context-menu");
        ul.setAttribute("id", "menu_ul")
        const { menus } = options;
        if (menus && menus.length > 0) {
            for (let menu of menus) {
                const li = document.createElement("li");
                li.textContent = menu.name;
                li.onclick = menu.onClick;
                ul.appendChild(li);
            }
        }
        let body
        if (node) {
            body = node;
        } else {
            body = document.querySelector("body")
        }
        body.appendChild(ul);
        return ul;
    }


    return {
        // 获取实例的唯一方式
        getInstance: function (node) {
            console.log("测试", instance)
            if (!instance) {
                instance = createMenu(node);
                console.log("重新", instance)
            } else {
                console.log("旧的", instance)
            }

            return instance;
        },
    };
};


// const menuSinglton = ContextMenu({
//     menus: [
//         {
//             name: "custom menu 1",
//             onClick: function (e) {
//                 console.log("menu1 clicked");
//             },
//         },
//         {
//             name: "custom menu 2",
//             onClick: function (e) {
//                 console.log("menu2 clicked");
//             },
//         },
//         {
//             name: "custom menu 3",
//             onClick: function (e) {
//                 console.log("menu3 clicked");
//             },
//         },
//     ],
// });

// let menu = menuSinglton.getInstance()
export default ContextMenu

