import { SocketContext } from "../../context/socketContext";
import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from 'react-router-dom';
import styles from './UsersList.module.scss';

interface UserListProps {
    setEnemyName?: any;
    className: string;
    gameHasStarted?: boolean;
    showModal?: boolean;
}

const UsersList = (props: UserListProps) => {
    const {
        className,
        setEnemyName,
        gameHasStarted,
        showModal,
    } = props;

    const [usersList, setUsersList] = React.useState([]);
    const socket = useContext(SocketContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();
    const [timer, setTimer] = React.useState<number | undefined>();

    // maybe move this inside the context? same for the users list
    React.useEffect(() => {
        user && user.id && socket.emit('send-user-data', user);
    }, [socket, user]);

    React.useEffect(() => {
        socket.emit('data-update');
        socket.on('send-online-list', (data: any) => {
            console.log('DATA ', data, 'socket id ', socket.id);
            setUsersList(data);
        });
    }, [socket, navigate]);

    
    React.useEffect(() => {
        socket.on('gameStart', () => {
            setTimer(undefined);
        });
    }, [socket]);

    console.log('local user ', user);
    console.log('Users list ', usersList);
    const handleChallenge = (userData: any) => {
        setEnemyName(userData.user.firstName + userData.user.lastName);
        setTimer(10);
        socket.emit('challenge', userData.socketId, socket.id, `${user.firstName} ${user.lastName}`);
    };

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTimer(timer as any - 1);
        }, 1000);

        if (timer && timer <= 0) {
            setTimer(undefined);
        }
        return () => clearInterval(interval);
    }, [timer]);

    return (
        <div className={styles[className]}>
            <h3>Online users</h3>
            <div className={styles.listWrapper}>
                {usersList.map((userData: any) =>
                    user && user.id !== userData.user.id &&
                    <div className={styles.userListWrapper}>
                        <p className={styles.userName}>{userData.user.firstName} {userData.user.lastName}</p>
                        {(!showModal && !gameHasStarted) && <button disabled={!!timer} className={styles.challengeButton} onClick={() => handleChallenge(userData)}>
                            Challenge!
                        </button>}
                        {!!timer && 
                        <p className={styles.timerMessage}>
                            The challenge will expire in {timer} seconds
                        </p>}
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