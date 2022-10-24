import React, { useContext } from 'react';
import styles from './Modal.module.scss';
import { SocketContext } from "../../context/socketContext";
import { GameContext } from '../../context/gameContext';


interface ModalProps {
    message: string;
    setShowModal: any;
}

const Modal = (props: ModalProps) => {
    const {
        message,
        setShowModal,
    } = props;

    const [timer, setTimer] = React.useState<number | undefined>(10);
    const socket = useContext(SocketContext);
    const {
        challengerRoom,
    } = useContext(GameContext);

    React.useEffect(() => {
        const interval = setInterval(() => {
            setTimer(timer as any - 1);
        }, 1000);

        if (timer && timer <= 0) {
            setTimer(undefined);
            setShowModal(false);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleDecilne = () => {
        setTimer(undefined);
        setShowModal(false);
    }

    const handleAccept = () => {
        socket.emit('challengeAccepted', socket.id, challengerRoom );
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