import { useEffect } from "react"
import { useNavigate } from "react-router-dom";

const LoadingPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      navigate("/");
    }, 8000);

    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="flex justify-center items-center bg-gradient-to-b from-[#531B81] to-[#29184B] backdrop-opacity-60 w-screen h-screen text-2xl text-white">
      <div className="border-3 border-white border-t-transparent rounded-full w-10 h-10 animate-spin"></div>
    </div>
  )
}

export default LoadingPage