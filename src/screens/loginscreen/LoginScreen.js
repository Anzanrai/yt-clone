import React, { useEffect } from 'react';
import './_loginscreen.scss';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/auth.action';
import { useHistory } from 'react-router-dom';

function LoginScreen() {
  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const handleLogin = () => {
    dispatch(login());
  };
  const history = useHistory();
  useEffect(() => {
    if (accessToken) {
      history.push('/');
    }
  }, [accessToken, history]);
  return (
    <div className="login">
      <div className="login__container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
          alt="logo"
        />
        <button onClick={() => handleLogin()}>Login with google</button>
      </div>
    </div>
  );
}

export default LoginScreen;
