export default function throttle(fn, delay=3000) {
  let flag = true;
  return function() {
    if (flag) {
      /* 异步任务 */
      setTimeout(() => {
        fn.apply(this, arguments); /* 定时器结合后执行 */
        vaild = true;
      }, delay)
      /* 同步任务 */
      vaild = false;
    }
  }
}