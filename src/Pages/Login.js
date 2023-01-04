import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../authProvider/AuthProvider';
import google from '../assets/google.png'
import facebook from '../assets/facebook.png'
import apple from '../assets/apple.png'

const Login = () => {
  const { googleProviderLogin } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  

  const handleGoogleLogin = () => {
    googleProviderLogin()
      .then((result) => {
        const user = result.user;
          console.log(user);
          navigate(from, { replace: true });
        toast.success("Successfully login..");
      })
      .catch((err) => {
        console.error(err);
        toast.error(err.message);
      });
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <button onClick={handleGoogleLogin} className="mb-2">
        <img src={google} alt="" />
      </button>
      <button className="mb-2">
        <img src={facebook} alt="" />
      </button>
      <button className="mb-2">
        <img src={apple} alt="" />
      </button>
    </div>
  );
};
export default Login;