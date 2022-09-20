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

    const [hasClickedOnCell, setHasClickedOnCell] = React.useState<boolean>(false); 
    const [cellValue, setCellValue] = React.useState<PossibleValue>();
    const socket = useContext(SocketContext);

    const handleClick = () => {
        if (canInput && !hasClickedOnCell && !gameHasEnded) {
            setHasClickedOnCell(true);
            setCellValue(nextValue);
            setGridValue(id, nextValue);
            nextValue === PossibleValue.x ? setNextValue(PossibleValue.o) : setNextValue(PossibleValue.x);
            setCanInput(false);
            // socket.emit('insertedValue', gridArray, CurrentPlayer: socket.id, ChallengerPlayer: otherID, currentValue: x|o)
        }
    }
    return (
        <div className={styles.cell} onClick={handleClick}>
         {hasClickedOnCell && cellValue}
        </div>
    )
}

export default Cell;