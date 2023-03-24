import { useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import useAuth from "../hooks/useAuth";

/**
 * @param onIdle - function to notify user when idle timeout is close
 * @param idleTime - number of seconds to wait before user is logged out
 */

const useIdleTimeout = ({ onIdle, idleTime = 60 * 30 }) => {
  const idleTimeout = 1000 * idleTime;
  const [isIdle, setIdle] = useState(false);
  const { isLogout, isLogin } = useAuth();

  const handleIdle = () => {
    if (!isLogout && isLogin) setIdle(true);
    console.log("ide" + isIdle);
  };

  const idleTimer = useIdleTimer({
    timeout: idleTimeout,
    promptTimeout: idleTimeout / 2,
    onPrompt: onIdle,
    onIdle: handleIdle,
    debounce: 500,
  });

  return {
    isIdle,
    handleIdle,
    setIdle,
    idleTimer,
  };
};

export default useIdleTimeout;
