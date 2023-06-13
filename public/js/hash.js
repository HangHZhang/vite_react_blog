importScripts("/public/js/spark-md5.min.js")

onmessage = e => {
  const { chunks } = e.data;
  const spark = new SparkMD5();
  let percentage = 0;
  let count = 0;
  function _read(i) {
    const blob = chunks[i];
    const reader = new FileReader();
    /* 异步读取 */
    reader.onload = e => {
      count++;
      const bytes = e.target.result;
      spark.append(bytes);
      if (count === chunks.length) {
        self.postMessage({
          percentage: 100,
          hash: spark.end()
        });
        self.close();
      } else {
        percentage += 100 / chunks.length;
        self.postMessage({
          percentage
        })
        _read(i+1)
      }
    }
    reader.readAsArrayBuffer(blob);
  }
  _read(0);
}