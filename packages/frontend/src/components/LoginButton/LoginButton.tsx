import React, { useState } from 'react';
import {
  Box, Button, Modal, TextField, Typography,
} from '@mui/material';
import { Person } from '@material-ui/icons';
import { Routes } from '@ramp/utils/types/routes';
import { IUserLogin } from '@ramp/utils/types/userLogin';
import { useDispatch, useSelector } from 'react-redux';
import styles from './LoginButton.module.scss';
import { setJWT } from '../../store/reducers/sessionSlice';
import { RootState } from '../../store';

export interface ILoginButtonProps {}

/**
 * Login Button
 */
function LoginButton(props: ILoginButtonProps) {
  const [formValue, setFormValue] = useState<IUserLogin>({ username: '', password: '' });
  const dispatch = useDispatch();
  const jwtToken = useSelector((state: RootState) => state.session.jwt);
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormValue({ ...formValue, [id]: value });
  };
  const [isOpen, setIsOpen] = useState(false);
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}${Routes.LOGIN}`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(formValue),
    }).catch(console.error);
    if (res) {
      const jwt = await res.json();
      if (jwt) {
        dispatch(setJWT(jwt));
        setIsOpen(false);
      }
    }
  };
  const handleModalChange = () => {
    if (jwtToken) {
      return dispatch(setJWT(null));
    }
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button className={styles.root} onClick={handleModalChange}>
        <Typography marginRight="4px">
          {' '}
          {jwtToken ? 'Logout' : 'Login'}
        </Typography>
        <Person />
      </Button>
      <Modal open={isOpen} onClose={handleModalChange}>
        <Box className={styles.modal}>
          <Typography marginBottom="18px" variant="h4" fontWeight={800}>
            Login
          </Typography>

          <form onChange={handleFormChange} onSubmit={handleFormSubmit}>
            <TextField
              value={formValue.username}
              required
              className={styles.input}
              type="email"
              fullWidth
              label="Username"
              id="username"
              autoFocus
              variant="standard"
            />
            <TextField
              value={formValue.password}
              required
              className={styles.input}
              type="password"
              margin="normal"
              color="warning"
              fullWidth
              label="Password"
              id="password"
              variant="standard"
            />
            <Button variant="outlined" type="submit">
              Sign In
            </Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default LoginButton;
