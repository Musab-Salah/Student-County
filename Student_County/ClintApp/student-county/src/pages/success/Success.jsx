import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let navigate = useNavigate();

  useEffect(() => {
    sleep(5000).then(() => {
      navigate("/sign_in");
    }); // eslint-disable-next-line
  }, []);

  return <>{"Success You will be taken after 5 seconds"}</>;
};

export default Success;
