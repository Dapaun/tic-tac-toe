import { SocketContext } from "../../context/socketContext";
import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from 'react-router-dom';
import styles from './UsersList.module.scss';
import { GameContext } from "../../context/gameContext";

const UsersList = () => {

    const {
        showModal,
        gameHasStarted,
        setEnemyName,
    } = useContext(GameContext);

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

    let mockList = [{
        socketId: '1',
        user: {
            id: '1',
            firstName: 'Test',
            lastName: 'Test'
        }
    },
    {
        socketId: '2',
        user: {
            id: '2',
            firstName: 'Test2',
            lastName: 'Test2'
        }
    },
    {
        socketId: '3',
        user: {
            id: '3',
            firstName: 'Test3',
            lastName: 'Test3'
        }
    },
    {
        socketId: '42',
        user: {
            id: '42',
            firstName: 'Test42',
            lastName: 'Test42'
        }
    },
    {
        socketId: '1',
        user: {
            id: '1',
            firstName: 'Test',
            lastName: 'Test'
        }
    },
    {
        socketId: '2',
        user: {
            id: '2',
            firstName: 'Test2',
            lastName: 'Test2'
        }
    },
    {
        socketId: '3',
        user: {
            id: '3',
            firstName: 'Test3',
            lastName: 'Test3'
        }
    },
    {
        socketId: '42',
        user: {
            id: '42',
            firstName: 'Test42',
            lastName: 'Test42'
        }
    },
    {
        socketId: '1',
        user: {
            id: '1',
            firstName: 'Test',
            lastName: 'Test'
        }
    },
    {
        socketId: '2',
        user: {
            id: '2',
            firstName: 'Test2',
            lastName: 'Test2'
        }
    },
    {
        socketId: '3',
        user: {
            id: '3',
            firstName: 'Test3',
            lastName: 'Test3'
        }
    },
    {
        socketId: '42',
        user: {
            id: '42',
            firstName: 'Test42',
            lastName: 'Test42'
        }
    },
    ];
    // WIll use newlist to reporduce bugs
    let newList = [...usersList, ...mockList];

    return (
        <div className={styles.listWrapper}>
            <div className="h-screen">
                <h3 className={styles.listHeader}>Online users</h3>
                <>
                    {usersList.map((userData: any) =>
                        user && user.id !== userData.user.id &&
                        <div className={styles.listUserName}>
                            <p className="text-base mb-1">{userData.user.firstName} {userData.user.lastName}</p>
                            {(!showModal && !gameHasStarted) &&
                                <button disabled={!!timer} className={styles.listApplyButton} onClick={() => handleChallenge(userData)}>
                                    Challenge!
                                </button>}
                            {!!timer &&
                                <p className={styles.timerMessage}>
                                    The challenge will expire in {timer} seconds
                                </p>}
                        </div>
                    )}
                </>
            </div>
        </div>
    )
}

export default UsersList;