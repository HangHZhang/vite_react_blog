import {useEffect, useRef, useState} from 'react';

const useSyncState = (state) => {
  const cbRef = useRef();
  const [data, setData] = useState(state);

  useEffect(() => {
    cbRef.current && cbRef.current(data);
  }, [data]);

  return [
    data,
    (val, callback) => {
      cbRef.current = callback;
      setData(val);
    }
  ];
}

export default useSyncState;