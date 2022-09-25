import {
    Routes,
    Route,
  } from 'react-router-dom';
import LoginPage from './login/LoginPage';
import Grid from './components/Grid/Grid';
import UsersList from './components/UsersList/UsersList';

const Router = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route path='/list' element={<UsersList className='fixed' />} />
            <Route  path='/' element={<Grid />} />
        </Routes>
    )
};

export default Router;