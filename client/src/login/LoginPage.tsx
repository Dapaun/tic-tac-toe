import React from 'react';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');

    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log('Submitted email: ', email, ' pass: ', password);
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
            <input type="submit" value="Login"/>
        </form>
    )

}

export default LoginPage;