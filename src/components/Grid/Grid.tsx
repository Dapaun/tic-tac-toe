import Cell from "../Cell/Cell";
import styles from "./Grid.module.scss";
import React from "react";

export enum PossibleValue {
    x = 'X',
    o = 'O',
}

const Grid = () => {
    const [nextValue, setNextValue] = React.useState<PossibleValue>(PossibleValue.x);
    const [gridArray, setGridArray] = React.useState(['', '', '', '', '', '', '', '', '']);
    const [gameHasEnded, setGameHasEnded] = React.useState(false);
    const [winner, setWinner] = React.useState<PossibleValue | undefined>();

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
                    <Cell id={0} nextValue={nextValue} setNextValue={setNextValue} setGridValue={setGridValue} gameHasEnded={gameHasEnded} />
                    <Cell id={1} nextValue={nextValue} setNextValue={setNextValue} setGridValue={setGridValue} gameHasEnded={gameHasEnded} />
                    <Cell id={2} nextValue={nextValue} setNextValue={setNextValue} setGridValue={setGridValue} gameHasEnded={gameHasEnded} />
                </div>
                <div className={styles.row}>
                    <Cell id={3} nextValue={nextValue} setNextValue={setNextValue} setGridValue={setGridValue} gameHasEnded={gameHasEnded} />
                    <Cell id={4} nextValue={nextValue} setNextValue={setNextValue} setGridValue={setGridValue} gameHasEnded={gameHasEnded} />
                    <Cell id={5} nextValue={nextValue} setNextValue={setNextValue} setGridValue={setGridValue} gameHasEnded={gameHasEnded} />
                </div>
                <div className={styles.row}>
                    <Cell id={6} nextValue={nextValue} setNextValue={setNextValue} setGridValue={setGridValue} gameHasEnded={gameHasEnded} />
                    <Cell id={7} nextValue={nextValue} setNextValue={setNextValue} setGridValue={setGridValue} gameHasEnded={gameHasEnded} />
                    <Cell id={8} nextValue={nextValue} setNextValue={setNextValue} setGridValue={setGridValue} gameHasEnded={gameHasEnded} />
                </div>
            </div>

            {gameHasEnded &&
                <button className={styles.playAgainButton} onClick={handleTryAgain}>
                    Play again?
                </button>}
        </>

    )
}

export default Grid;