export default function debounce(fn, delay=3000) {
  let timer = null;
  return function() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      /* 
        将 fn 的 this 指向改变为当前对象的 this 指向
      */
      fn.apply(this, arguments); /* 改变 this 指向 arguments 为 伪数组*/
    }, delay);
  }
}