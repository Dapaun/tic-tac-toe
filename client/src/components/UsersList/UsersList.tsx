import { SocketContext } from "../../context/socketContext";
import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from 'react-router-dom';
import styles from './UsersList.module.scss';

const UsersList = (props: any) => {
    const {
        className
    } = props;

    const [usersList, setUsersList] = React.useState([]);
    const socket = useContext(SocketContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    // maybe move this inside the context? same for the users list
    React.useEffect(() => {
        user && user.id && socket.emit('send-user-data', user);
    }, [socket, user]);

    React.useEffect(() => {
        console.log('HOOK');
        socket.emit('data-update');
        socket.on('send-online-list', (data: any) => {
            console.log('DATA ', data, 'socket id ', socket.id);
            setUsersList(data);
        });
    }, [socket, navigate]);
    console.log('locl user ', user);
    console.log('Users list ', usersList);
    const handleChallenge = (challengedUserRoom: string) => {
        console.log(
            `Challenged user ${challengedUserRoom}`
        );
        socket.emit('challenge', challengedUserRoom, socket.id, `${user.firstName} ${user.lastName}` );
    } 
    return (
        <div className={styles[className]}>
            <h3>Online users</h3>
            <div className={styles.listWrapper}>
                {usersList.map((userData: any) =>
                    user && user.id !== userData.user.id &&
                    <div className={styles.userListWrapper}>
                        <p className={styles.userName}>{userData.user.firstName} {userData.user.lastName}</p>
                        <button className={styles.challengeButton} onClick={() => handleChallenge(userData.socketId)}>
                            Challenge!
                        </button>
                    </div>
                )}
            </div>

            <button onClick={() => navigate('/')}>
                Go to grid
            </button>
        </div>
    )
}

export default UsersList;