import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@store/store';
import { useState } from 'react';
import { IUserLogin } from '@ramp/utils/types/userLogin';
import { Routes } from '@ramp/utils/types/routes';
import { setJWT } from '@store/reducers/sessionSlice';
import { fetchRecommendations } from '@components/App/hooks/useRecommendationsData';
import { setRecommendations } from '@store/reducers/recommendationsSlice';

const useLogin = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [formValue, setFormValue] = useState<IUserLogin>({ username: '', password: '' });
  const dispatch = useDispatch();
  const jwtToken = useSelector((state: RootState) => state.session.jwt);
  const isLoggedIn = Boolean(jwtToken);

  const handleFormChange = (e) => {
    const { id, value } = e.target;
    setFormValue({ ...formValue, [id]: value });
  };
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
        fetchRecommendations(dispatch);
      }
    }
  };

  const handleLogout = () => dispatch(setJWT(null));
  const handleModalChange = () => {
    if (jwtToken) {
      return handleLogout();
    }
    return setIsOpen(!isOpen);
  };

  return {
    handleModalChange,
    formValue,
    handleFormSubmit,
    handleFormChange,
    isLoggedIn,
    isOpen,
  };
};

export default useLogin;
