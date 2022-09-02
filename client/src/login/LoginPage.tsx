import React from 'react';
import styles from './LoginPage.module.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/userContext';

const LoginPage = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    const body = JSON.stringify({ email, password });
    const navigate = useNavigate();
    const { changeAuthenticationStatus } = React.useContext(UserContext);

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Submitted email: ', email, ' pass: ', password);
        axios.post(
            '/auth',
            body,
            {
                headers: {
                    'Content-type': 'application/json'
                }
            })
            .then((response) => {
                const user = {
                    id: response.data.user.id,
                    firstName: response.data.user.firstName,
                    lastName: response.data.user.lastName,
                    email: response.data.user.email,
                };
                changeAuthenticationStatus(user);
                navigate('/');
            })
            .catch((e) => {
                //TODO SHARE ERROR 
                console.log(e);
            })
    };
    const handleEmailChange = (e: any) => {
        setEmail(e.target.value);
    }
    const handlePasswordChange = (e: any) => {
        setPassword(e.target.value);
    }

    return (
        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <label>Email</label>
            <br></br>
            <input type="text" value={email} onChange={handleEmailChange} />
            <br></br>
            <label>Password</label>
            <br></br>
            <input type="password" value={password} onChange={handlePasswordChange} />
            <br></br>
            <input type="submit" value="Login" />
        </form>
    )

}

export default LoginPage;