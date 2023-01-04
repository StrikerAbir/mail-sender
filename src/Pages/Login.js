import React, { useContext } from 'react';
import { toast } from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../authProvider/AuthProvider';

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
    <div>
      <button
        onClick={handleGoogleLogin}
        className="btn btn-primary btn-outline w-full"
      >
        CONTINUE WITH GOOGLE
      </button>
    </div>
  );
};
export default Login;