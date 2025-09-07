import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { loadUser } from '../redux/authSlice';

export default function AppInitializer({ children }) {
  const dispatch = useDispatch();

  useEffect(() => {
    //Try loading user from AsyncStorage token
    dispatch(loadUser());
  }, [dispatch]);

  return children; //Just render the rest of app
}
