import { FunctionComponent, useEffect, useState } from 'react'
import { useNavigate, useLocation, Navigate } from 'react-router-dom';
import './Login.css';
import { login } from "../../../slices/auth.slice";
import { useAppDispatch, useAppSelector } from '../../../store';
import Loader from '../../sharedComponents/Loader';
import { Button } from '@mui/material';
import { useSnackbar } from 'notistack';
interface IFormValues {
  username: string;
  password: string;
}
const snackbarOptions = {anchorOrigin: { horizontal: 'right', vertical: 'top' } }
const Login: FunctionComponent = () => {
  const { isLoading } = useAppSelector((state) => state.auth);
  const { enqueueSnackbar } = useSnackbar();
  const [formValues, setFormValues] = useState<IFormValues>({
    username: '',
    password: ''
  });
  const [isFormEmpty, setIsFormEmpty] = useState<boolean>(true);
  let navigate = useNavigate();
  const { isLoggedIn } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { username, password } = formValues;
    dispatch(login({ username, password }))
      .unwrap()
      .then(() => {
        navigate("/search");
      })
      .catch((err) => {
         enqueueSnackbar('Incorrect username or password', { variant: 'error',anchorOrigin: { horizontal: 'right', vertical: 'top' }});
      });
  };

  if (isLoggedIn) {
    return <Navigate to="/search" />;
  }


  useEffect(() => {
    const formIncomplete = Object.values(formValues).some(value => !value.length)
    if (formIncomplete) {
      setIsFormEmpty(true)
    } else {
      setIsFormEmpty(false)
    }
  }, [formValues])


  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues((prevState) => ({ ...prevState, [name]: value }))
  }

  return (
    <div>
      {isLoading ?
        <Loader loaderState={isLoading} /> :
        <form onSubmit={handleLogin} className='kanun-form glass login-form'>
          <h2>Login</h2>
          <label htmlFor="userame">Username/ Email</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="abcd or abcd@mail.com"
            value={formValues?.username}
            onChange={handleInputChange}
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Minimum 6 characters"
            value={formValues?.password}
            onChange={handleInputChange}
          />

          <Button variant="contained" type="submit" disabled={isFormEmpty}>Sign In</Button>
        </form>
      }
    </div>
  );
}

export default Login;