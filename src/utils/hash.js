import SparkMD5 from 'spark-md5';

/* 切勿直接计算整个文件的hash（文件大小不可控），针对每一个分块的hash，针对每一个分块计算一个结果，计算过后这块数据就不用了，~~~ 增量算法 */
// export default hash = chunks => {
//   const spark = new SparkMD5();
//   function _read(i) {
//     if (i >= chunks.length) {
//       console.log(spark.end());
//       return; // 读取完成
//     }
//     const blob = chunks[i];
//     const reader = new FileReader();
//     /* 异步读取 */
//     reader.onload = e => {
//       const bytes = e.target.result;
//       spark.append(bytes);
//       _read(i+1)
//     }
//     reader.readAsArrayBuffer(blob);
//   }
//   _read(0);
// }

/* 由于执行 spark.end() 是需要一定时间的，所以将该方法封装为异步的*/
const hash = chunks => {
  new Promise(resolve => {
    const spark = new SparkMD5();
    function _read(i) {
      if (i >= chunks.length) {
        // console.log(spark.end());
        resolve(spark.end());
        return; // 读取完成
      }
      const blob = chunks[i];
      const reader = new FileReader();
      /* 异步读取 */
      reader.onload = e => {
        const bytes = e.target.result;
        spark.append(bytes);
        _read(i+1)
      }
      reader.readAsArrayBuffer(blob);
    }
    _read(0);
  })
}

/* web worker 再开一个线程完成 文件 hash 计算*/

export default hash;