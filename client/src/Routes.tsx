import {
    Routes,
    Route,
  } from 'react-router-dom';
import LoginPage from './login/LoginPage';
import Grid from './components/Grid/Grid';

const Router = () => {
    return (
        <Routes>
            <Route path='/login' element={<LoginPage />} />
            <Route  path='/' element={<Grid />} />
        </Routes>
    )
};

export default Router;