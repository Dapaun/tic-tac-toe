import Cell from "../Cell/Cell";
import styles from "./Grid.module.scss";
import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { SocketContext } from "../../context/socketContext";
import UsersList from "../UsersList/UsersList";
import Modal from "../Modal/Modal";
import { GameContext } from "../../context/gameContext";

export enum PossibleValue {
    x = 'X',
    o = 'O',
}

const Grid = () => {
    const {
        user
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
    } = useContext(GameContext);

    // const [gameHasEnded, setGameHasEnded] = React.useState(false);
    const [winner, setWinner] = React.useState<PossibleValue | undefined>();

    const socket = useContext(SocketContext);
    // const [showModal, setShowModal] = React.useState<boolean>(false);
    const [challengeMessage, setChallengeMessage] = React.useState<string>('');
    const [challengerRoom, setChallengerRoom] = React.useState<string>('');
    const [canInput, setCanInput] = React.useState<boolean>(false);
    const [enemy, setEnemy] = React.useState('');
    const [displayGrid, setDisplayGrid] = React.useState<boolean>(false);
    const [gameHasStarted, setGameHasStarted] = React.useState<boolean>(false)
    const [enemyName, setEnemyName] = React.useState<string>('');

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
        // will assume that the challenger has the ability to start a game for now
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
                        <Cell  enemyPlayer={enemy} id={0} canInput={canInput} setCanInput={setCanInput}  setGridValue={setGridValue}  />
                        <Cell  enemyPlayer={enemy} id={1} canInput={canInput} setCanInput={setCanInput}  setGridValue={setGridValue}  />
                        <Cell  enemyPlayer={enemy} id={2} canInput={canInput} setCanInput={setCanInput}  setGridValue={setGridValue}  />
                    </div>
                    <div className={styles.row}>
                        <Cell  enemyPlayer={enemy} id={3} canInput={canInput} setCanInput={setCanInput}  setGridValue={setGridValue}  />
                        <Cell  enemyPlayer={enemy} id={4} canInput={canInput} setCanInput={setCanInput}  setGridValue={setGridValue}  />
                        <Cell  enemyPlayer={enemy} id={5} canInput={canInput} setCanInput={setCanInput}  setGridValue={setGridValue}  />
                    </div>
                    <div className={styles.row}>
                        <Cell  enemyPlayer={enemy} id={6} canInput={canInput} setCanInput={setCanInput}  setGridValue={setGridValue}  />
                        <Cell  enemyPlayer={enemy} id={7} canInput={canInput} setCanInput={setCanInput}  setGridValue={setGridValue}  />
                        <Cell  enemyPlayer={enemy} id={8} canInput={canInput} setCanInput={setCanInput}  setGridValue={setGridValue}  />
                    </div>
                </div>
                {gameHasEnded &&
                    <button className={styles.playAgainButton} onClick={handleTryAgain}>
                        Play again?
                    </button>}
            </div>}
            <UsersList className='fixed' setEnemyName={setEnemyName} gameHasStarted={gameHasStarted} />
            {showModal && <Modal message={challengeMessage} room={challengerRoom} />}
        </>

    )
}

export default Grid;