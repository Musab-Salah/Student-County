import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BsCheckCircle } from "react-icons/bs";
import "./Success.css";
const Success = () => {
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let navigate = useNavigate();

  useEffect(() => {
    sleep(5000).then(() => {
      navigate("/sign_in");
    }); // eslint-disable-next-line
  }, []);

  return (
    <>
      <div className="success">
        <BsCheckCircle className="success-icon" />
        <div className="success-message">
          Success You will be taken after 5 seconds
        </div>
      </div>
    </>
  );
};

export default Success;
