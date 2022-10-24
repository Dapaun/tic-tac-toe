
import styles from './UserListComponent.module.scss';
import React, { useContext } from "react";
import { GameContext } from "../../context/gameContext";
import { SocketContext } from "../../context/socketContext";
import { UserContext } from "../../context/userContext";

interface UserListComponentInterface {
    userData: any;
    showModal: boolean;
}

const UserListComponent = (props: UserListComponentInterface) => {

    const {
        userData,
        showModal,
    } = props;
    const [timer, setTimer] = React.useState<number | undefined>();

    const {
        gameHasStarted,
        setEnemyName,
    } = useContext(GameContext);

    const socket = useContext(SocketContext);
    const { user } = useContext(UserContext);


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

    React.useEffect(() => {
        socket.on('gameStart', () => {
            setTimer(undefined);
        });
    }, [socket]);

    return (
        <div className={styles.listUserName}>
            <p className="text-base mb-1">{userData.user.firstName} {userData.user.lastName}</p>
            {(!showModal && !gameHasStarted) &&
                <button disabled={!!timer} className={styles.listApplyButton} onClick={() => handleChallenge(userData)}>
                    Challenge!
                </button>}
            {!!timer &&
                <p>
                    The challenge will expire in {timer} seconds
                </p>}
        </div>
    )
}

export default UserListComponent;