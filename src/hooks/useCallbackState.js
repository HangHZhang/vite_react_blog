import {useEffect, useState, useRef} from 'react';

/* 
  useRef 创建了一个 cbRef 对象保存回调函数
  在 useEffect 中监听状态变化并调用回调函数
  setCallbackState用于更新状态并调用回调函数。
  返回一个数组

  第一个元素为最新状态值 data，第二个元素为更新状态的方法 setCallbackState。

  当需要同步获取最新状态值时，只需调用 data 即可  const currentValue = data
*/
function useCallbackState(state) {
  const cbRef = useRef();
  const [data, setData] = useState(state);

  useEffect(() => {
    cbRef.current && cbRef.current(data);
  },[data]);

  const setCallbackState = newState => {
    setData(newState);
    cbRef.current && cbRef.current(newState);
  }

  return [data, setCallbackState];
}

export default useCallbackState;