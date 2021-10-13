function throttle(func, wait) {
    let timeout;
    return function () {
        let context = this;
        let args = arguments;
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null;
                func.apply(context, args)
            }, wait)
        }

    }
}
/**
 * 常量
 * @type {string}
 */
const TYPE_OBJECT = '[object Object]';
const TYPE_ARRAY = '[object Array]';
/**
 * 判断对象的类型
 * @param obj 来源对象
 * @returns {string} 对象类型
 */
function typeToString(obj) {
    return Object.prototype.toString.call(obj)
}

/**
 * 深克隆对象
 * @param oldObj 源对象
 * @returns {Object} 返回克隆后的对象
 */
function deepClone(oldObj) {
    let newObj;
    if (oldObj === null) {
        return null
    }
    if (typeof oldObj !== 'object') {
        return oldObj
    }
    switch (typeToString(oldObj)) {
        case TYPE_OBJECT:
            newObj = {}
            break;
        case TYPE_ARRAY:
            newObj = [];
            break;
    }
    for (let i in oldObj) {
        newObj[i] = deepClone(oldObj[i]);
    }
    return newObj
}


export { throttle, deepClone }