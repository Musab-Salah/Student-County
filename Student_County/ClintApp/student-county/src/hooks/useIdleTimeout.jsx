import { useContext, useState } from "react";
import { useIdleTimer } from "react-idle-timer";
import AuthCxt from "../context/AuthCommon";

/**
 * @param onIdle - function to notify user when idle timeout is close
 * @param idleTime - number of seconds to wait before user is logged out
 */

const useIdleTimeout = ({ onIdle, idleTime = 1 }) => {
  const idleTimeout = 1000 * idleTime;
  const [isIdle, setIdle] = useState(false);
  const { isLogout, isLogin } = useContext(AuthCxt);

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
