import Cell from "../Cell/Cell";
import styles from "./Grid.module.scss";
import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { SocketContext } from "../../context/socketContext";
import UsersList from "../UsersList/UsersList";
import Modal from "../Modal/Modal";

export enum PossibleValue {
    x = 'X',
    o = 'O',
}

const Grid = () => {

    const [nextValue, setNextValue] = React.useState<PossibleValue>(PossibleValue.x);
    const [gridArray, setGridArray] = React.useState(['', '', '', '', '', '', '', '', '']);
    const [gameHasEnded, setGameHasEnded] = React.useState(false);
    const [winner, setWinner] = React.useState<PossibleValue | undefined>();
    const {
        user
    } = useContext(UserContext);
    const socket = useContext(SocketContext);
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [challengeMessage, setChallengeMessage] = React.useState<string>('');
    const [challengerRoom, setChallengerRoom] = React.useState<string>('');
    const [canInput, setCanInput] = React.useState<boolean>(false);
    const [enemy, setEnemy] = React.useState('');

    React.useEffect(() => {
        user && user.id && socket.emit('send-user-data', user);
    }, [socket, user]);

    React.useEffect(() => {
        socket.on('send-online-list', (data: any) => {
            console.log('DATA ', data, 'socket id ', socket.id);
        });
    }, [socket]);

    React.useEffect(() => {
        socket.on('challenged', (message: string, challangerUserRoom: string) => {
            setChallengeMessage(message);
            setChallengerRoom(challangerUserRoom);
            setShowModal(true);
            console.log('MESSAGE - ', message);
            console.log('challangerUserRoom', challangerUserRoom);
        })
    }, [socket]);

    React.useEffect(() => {
        // will assume that the challenger has the ability to start a game for now
        socket.on('gameStart', (challenged: string, challenger: string,  gridArray: []) => {
            setGridArray(gridArray);
            if (socket.id === challenger) {
                setCanInput(true);
                setEnemy(challenged);
            } else {
                setCanInput(false);
                setEnemy(challenger);
            }
        });
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
            setWinner(nextValue === PossibleValue.o ? PossibleValue.x : PossibleValue.o);
        } else {
            if (gridArray.every(element => element === PossibleValue.o || element === PossibleValue.x)) {
                setGameHasEnded(true)
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
            {winner && <h2>Player {winner} has won!</h2>}
            {gameHasEnded && !winner && <h2> Draw, try another match! </h2>}
            <div className={styles.table}>
                <div className={styles.row}>
                    <Cell gridArray={gridArray} enemyPlayer={enemy} id={0} canInput={canInput} setCanInput={setCanInput}  nextValue={nextValue} setNextValue={setNextValue} setGridValue={setGridValue} gameHasEnded={gameHasEnded} />
                    <Cell gridArray={gridArray} enemyPlayer={enemy} id={1} canInput={canInput} setCanInput={setCanInput} nextValue={nextValue} setNextValue={setNextValue} setGridValue={setGridValue} gameHasEnded={gameHasEnded} />
                    <Cell gridArray={gridArray} enemyPlayer={enemy} id ={2} canInput={canInput} setCanInput={setCanInput} nextValue={nextValue} setNextValue={setNextValue} setGridValue={setGridValue} gameHasEnded={gameHasEnded} />
                </div>
                <div className={styles.row}>
                    <Cell gridArray={gridArray} enemyPlayer={enemy} id={3} canInput={canInput} setCanInput={setCanInput} nextValue={nextValue} setNextValue={setNextValue} setGridValue={setGridValue} gameHasEnded={gameHasEnded} />
                    <Cell gridArray={gridArray} enemyPlayer={enemy} id={4} canInput={canInput} setCanInput={setCanInput} nextValue={nextValue} setNextValue={setNextValue} setGridValue={setGridValue} gameHasEnded={gameHasEnded} />
                    <Cell gridArray={gridArray} enemyPlayer={enemy} id={5} canInput={canInput} setCanInput={setCanInput} nextValue={nextValue} setNextValue={setNextValue} setGridValue={setGridValue} gameHasEnded={gameHasEnded} />
                </div>
                <div className={styles.row}>
                    <Cell gridArray={gridArray} enemyPlayer={enemy} id={6} canInput={canInput} setCanInput={setCanInput} nextValue={nextValue} setNextValue={setNextValue} setGridValue={setGridValue} gameHasEnded={gameHasEnded} />
                    <Cell gridArray={gridArray} enemyPlayer={enemy} id={7} canInput={canInput} setCanInput={setCanInput} nextValue={nextValue} setNextValue={setNextValue} setGridValue={setGridValue} gameHasEnded={gameHasEnded} />
                    <Cell gridArray={gridArray} enemyPlayer={enemy} id={8} canInput={canInput} setCanInput={setCanInput} nextValue={nextValue} setNextValue={setNextValue} setGridValue={setGridValue} gameHasEnded={gameHasEnded} />
                </div>
            </div>
            <UsersList className='fixed' />
            {showModal && <Modal message={challengeMessage} room={challengerRoom}/>}
            {gameHasEnded &&
                <button className={styles.playAgainButton} onClick={handleTryAgain}>
                    Play again?
                </button>}
        </>

    )
}

export default Grid;