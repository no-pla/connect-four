import { useEffect, useRef, useState } from "react";

export function useInterval(
  callback: () => void,
  condition: boolean,
  stop: boolean
) {
  const savedCallback = useRef<() => void>();
  const isStop = useRef<boolean>();
  // useRef에 콜백을 저장해서 setInterval이 최신 캡처를 가져오지 못하는 문제를 해결한다.
  const [timeOver, setTimeOver] = useState(false);

  savedCallback.current = callback;
  isStop.current = stop;

  useEffect(() => {
    function tick() {
      if (callback === undefined) return;

      if (condition) {
        callback();
      } else {
        if (!timeOver) {
          callback(); // 타임오버 시 forceDrop 실행
          setTimeOver(true);
        }
      }
    }
    if (!stop) {
      const time = setInterval(tick, 1000);
      setTimeOver(false);
      return () => clearInterval(time);
    }
  }, [timeOver, condition, stop]);
}
