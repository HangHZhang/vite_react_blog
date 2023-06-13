export function formateDate(time){
    if(!time) return '';
    let date = new Date(time);
        return date.getFullYear() + '-' + (date.getMonth()+1) +'-'+date.getDate() // 月份从 0 开始记
        +' '+date.getHours()+':'+(date.getMinutes()<10 ? '0'+date.getMinutes() : date.getMinutes())+':'+ (date.getSeconds()<10 ? '0' + date.getSeconds() : date.getSeconds());  
}

export function getDate(timeStump) {
    // console.log(timeStump)
    const newDate  = new Date(timeStump)
    return newDate.toLocaleDateString().replace(/\//g, '-') + ' ' + newDate.toTimeString().substring(0,8)
    // console.log(newDate.toLocaleString())
    // return newDate.toLocaleString().replace(/\//g,'-')  // 1974-4-27 16:57:21
}