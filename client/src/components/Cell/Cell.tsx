import React, { useContext } from "react";
import { PossibleValue } from "../Grid/Grid";
import styles from "./Cell.module.scss";
import { SocketContext } from "../../context/socketContext";

interface CellInterface {
    id: number;
    nextValue: PossibleValue;
    gameHasEnded: boolean;
    setNextValue: any;
    setGridValue: any;
    canInput: boolean;
    setCanInput: any;
    gridArray: any;
    enemyPlayer: string;
}

const Cell = (props: CellInterface) => {
    const {
        id,
        nextValue,
        setNextValue,
        setGridValue,
        gameHasEnded,
        canInput,
        setCanInput,
        gridArray,
        enemyPlayer,

    } = props;

    const socket = useContext(SocketContext);
    const handleClick = () => {
        if (canInput && !gameHasEnded && gridArray[id] === '') {
            setGridValue(id, nextValue);
            nextValue === PossibleValue.x ? setNextValue(PossibleValue.o) : setNextValue(PossibleValue.x);
            setCanInput(false);
            socket.emit('insertedValue', gridArray, socket.id, enemyPlayer, nextValue === PossibleValue.x ? PossibleValue.o : PossibleValue.x);
        }
    }
    return (
        <div className={styles.cell} onClick={handleClick}>
            {gridArray[id]}
        </div>
    )
}

export default Cell;