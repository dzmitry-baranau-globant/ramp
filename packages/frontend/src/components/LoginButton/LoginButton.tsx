import React, { useState } from 'react';
import {
  Box, Button, Fade, FormControl, Modal, TextField, Typography,
} from '@mui/material';
import { Person } from '@material-ui/icons';
import styles from './LoginButton.module.scss';

export interface ILoginButtonProps {}

/**
 * Login Button
 */
function LoginButton(props: ILoginButtonProps) {
  const [formValue, setFormValue] = useState({ username: '', password: '' });
  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormValue({ ...formValue, [id]: value });
  };
  const handleFormSubmit = () => {};
  const [isOpen, setIsOpen] = useState(true);
  const handleModalChange = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <Button className={styles.root} onClick={handleModalChange}>
        <Typography marginRight="4px">Login</Typography>
        <Person />
      </Button>
      <Modal open={isOpen} onClose={handleModalChange}>
        <Box className={styles.modal}>
          <Typography marginBottom="18px" variant="h4" fontWeight={800}>
            Login
          </Typography>

          <form onChange={handleFormChange}>
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
            <Button variant="outlined">Sign In</Button>
          </form>
        </Box>
      </Modal>
    </>
  );
}

export default LoginButton;
