import React from 'react';
import {
  Box, Button, Modal, TextField, Typography,
} from '@mui/material';
import { Person } from '@material-ui/icons';
import useLogin from '@components/LoginButton/hooks/useLogin';
import styles from './LoginButton.module.scss';

export interface ILoginButtonProps {}

/**
 * Login Button
 */
function LoginButton(props: ILoginButtonProps) {
  const {
    handleFormSubmit, handleFormChange, handleModalChange, formValue, isOpen, isLoggedIn,
  } = useLogin();
  return (
    <>
      <Button className={styles.root} onClick={handleModalChange}>
        <Typography marginRight="4px">
          {' '}
          {isLoggedIn ? 'Logout' : 'Login'}
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
