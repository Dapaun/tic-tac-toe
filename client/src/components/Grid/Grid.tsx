import Cell from "../Cell/Cell";
import styles from "./Grid.module.scss";
import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { SocketContext } from "../../context/socketContext";
import UsersList from "../UsersList/UsersList";
import Modal from "../Modal/Modal";
import { GameContext } from "../../context/gameContext";
import { useNavigate } from "react-router-dom";

export enum PossibleValue {
    x = 'X',
    o = 'O',
}

const Grid = () => {
    const {
        user,
        isAuthenticated,
        isLoading,
    } = useContext(UserContext);

    const {
        nextValue,
        setNextValue,
        gridArray,
        setGridArray,
        gameHasEnded,
        setGameHasEnded,
        showModal,
        setShowModal,
        setEnemy,
        setGameHasStarted,
        enemyName,
        setEnemyName,
        canInput,
        setCanInput,
        setChallengerRoom,
    } = useContext(GameContext);

    const [winner, setWinner] = React.useState<PossibleValue | undefined>();

    const socket = useContext(SocketContext);
    const [challengeMessage, setChallengeMessage] = React.useState<string>('');
    const [displayGrid, setDisplayGrid] = React.useState<boolean>(false);

    const navigate = useNavigate();

    console.log('-------');
    console.log('isAuthenticated ', isAuthenticated);
    console.log('User ', user);
    console.log('IsLoading ', isLoading);

    React.useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/login');
        }
    }, [isAuthenticated, isLoading, navigate]);

    React.useEffect(() => {
        user && user.id && socket.emit('send-user-data', user);
    }, [socket, user]);

    React.useEffect(() => {
        socket.on('challenged', (message: string, challangerUserRoom: string, challengerName: string) => {
            setChallengeMessage(message);
            setChallengerRoom(challangerUserRoom);
            setShowModal(true);
            setEnemyName(challengerName);
        })
    }, [socket]);

    React.useEffect(() => {
        console.log('Game start');
        socket.on('gameStart', (challenged: string, challenger: string, gridArray: [], canStartGame: boolean) => {
            setDisplayGrid(true);
            setGameHasStarted(true);
            if (canStartGame) {
                setGridArray(gridArray);
                if (socket.id === challenger) {
                    setCanInput(true);
                    setEnemy(challenged);
                } else {
                    setCanInput(false);
                    setEnemy(challenger);
                }
            }
        });
    }, [socket]);

    React.useEffect(() => {
        socket.on('dataSync', (gridArray: [], enemy: string, currentPlayer: string, value: PossibleValue) => {
            setGridArray(gridArray);
            setEnemy(enemy);
            setNextValue(value);
            setCanInput(true);
        })
    }, [socket]);

    const validateGame = () => {
        if (
            (gridArray[0] === gridArray[1] && gridArray[1] === gridArray[2] && gridArray[0]) ||
            (gridArray[3] === gridArray[4] && gridArray[4] === gridArray[5] && gridArray[3]) ||
            (gridArray[6] === gridArray[7] && gridArray[7] === gridArray[8] && gridArray[6]) ||
            (gridArray[0] === gridArray[3] && gridArray[3] === gridArray[6] && gridArray[0]) ||
            (gridArray[1] === gridArray[4] && gridArray[4] === gridArray[7] && gridArray[1]) ||
            (gridArray[2] === gridArray[5] && gridArray[8] === gridArray[2] && gridArray[2]) ||
            (gridArray[0] === gridArray[4] && gridArray[4] === gridArray[8] && gridArray[0]) ||
            (gridArray[2] === gridArray[4] && gridArray[6] === gridArray[2] && gridArray[2])
        ) {
            setGameHasEnded(true);
            setGameHasStarted(false);
            setWinner(nextValue === PossibleValue.o ? PossibleValue.x : PossibleValue.o);
        } else {
            if (gridArray.every(element => element === PossibleValue.o || element === PossibleValue.x)) {
                setGameHasEnded(true);
                setGameHasStarted(false);
            }
        }
    }

    const setGridValue = (id: number, value: PossibleValue) => {
        gridArray[id] = value;
        setGridArray(gridArray);
    }

    React.useEffect(() => {
        validateGame();
    }, [nextValue]);

    const handleTryAgain = () => {
        window.location.reload();
    }

    return (
        <>
            {displayGrid && <div>
                {winner &&
                    <h2>
                        {canInput === true ? 'You lost, beeter luck next time!' : 'You win! Congrats!'}
                    </h2>
                }
                {gameHasEnded && !winner && <h2> Draw, try another match! </h2>}
                {!gameHasEnded && 
                    <h2>
                        {canInput === true ? 'Make your move!' : `Waiting for ${enemyName}'s move`}
                    </h2>
                }
                <div className={styles.table}>
                    <div className={styles.row}>
                        <Cell id={0} setGridValue={setGridValue}  />
                        <Cell id={1} setGridValue={setGridValue}  />
                        <Cell id={2} setGridValue={setGridValue}  />
                    </div>
                    <div className={styles.row}>
                        <Cell id={3} setGridValue={setGridValue}  />
                        <Cell id={4} setGridValue={setGridValue}  />
                        <Cell id={5} setGridValue={setGridValue}  />
                    </div>
                    <div className={styles.row}>
                        <Cell id={6} setGridValue={setGridValue}  />
                        <Cell id={7} setGridValue={setGridValue}  />
                        <Cell id={8} setGridValue={setGridValue}  />
                    </div>
                </div>
                {gameHasEnded &&
                    <button className={styles.playAgainButton} onClick={handleTryAgain}>
                        Play again?
                    </button>}
            </div>}
            <UsersList />
            {showModal && <Modal message={challengeMessage} />}
        </>

    )
}

export default Grid;