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
      if (savedCallback.current === undefined) return;

      if (condition) {
        savedCallback.current();
      } else {
        if (!timeOver) {
          savedCallback.current(); // 타임오버 시 forceDrop 실행
          setTimeOver(true);
        }
      }
    }
    if (!isStop.current) {
      const time = setInterval(tick, 1000);
      return () => clearInterval(time);
    }
  }, [timeOver, condition, stop]);
}
