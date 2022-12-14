import { useContext } from "react";
import { PossibleValue } from "../Grid/Grid";
import styles from "./Cell.module.scss";
import { SocketContext } from "../../context/socketContext";
import { GameContext } from "../../context/gameContext";

interface CellInterface {
    id: number;
    setGridValue: any;
}

const Cell = (props: CellInterface) => {
    const {
        id,
        setGridValue,
    } = props;

    const {
        nextValue,
        setNextValue,
        gridArray,
        gameHasEnded,
        enemy,
        canInput,
        setCanInput,
    } = useContext(GameContext);

    const socket = useContext(SocketContext);
    const handleClick = () => {
        if (canInput && !gameHasEnded && gridArray[id] === '') {
            setGridValue(id, nextValue);
            nextValue === PossibleValue.x ? setNextValue(PossibleValue.o) : setNextValue(PossibleValue.x);
            setCanInput(false);
            socket.emit('insertedValue', gridArray, socket.id, enemy, nextValue === PossibleValue.x ? PossibleValue.o : PossibleValue.x);
        }
    }
    return (
        <div className={styles.cell} onClick={handleClick}>
            {gridArray[id]}
        </div>
    )
}

export default Cell;