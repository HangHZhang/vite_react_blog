
export default function nestObjArr(arr, target) {
    let res = [...arr].reduce((pre,cur) => { /* index当前索引，arr 当前元素所属的数组对象 */
        if (!pre.some(item=>item[target] === cur[target])) pre.push(cur)
        return pre
    },[])
    return res;
};
