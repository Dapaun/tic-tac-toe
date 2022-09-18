import React, { useContext } from 'react';
import styles from './Modal.module.scss';
import { SocketContext } from "../../context/socketContext";


interface ModalProps {
    message: string;
    room: string;
}

const Modal = (props: ModalProps) => {
    const {
        message,
        room,
    } = props;
    const [timer, setTimer] = React.useState<number | undefined>(10);
    const socket = useContext(SocketContext);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTimer(timer as any - 1);
        }, 1000);

        if (timer && timer <= 0) {
            setTimer(undefined);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleDecilne = () => {
        setTimer(undefined);
    }

    const handleAccept = () => {
        socket.emit('challengeAccepted', socket.id, room );
        setTimer(undefined);
    }

    return (
        <>
          {!!timer && <div className={styles.modalContainer}>
                <p className={styles.modalMessage}>
                    {message}
                </p>
                <p>You have  {timer} seconds to accept</p>
                <div>
                    <button className={styles.acceptButton} onClick={handleAccept}>
                        Accept
                    </button>
                    <button className={styles.declineButton} onClick={handleDecilne}>
                        Decline
                    </button>
                </div>
            </div> }
        </>
    )
}

export default Modal;