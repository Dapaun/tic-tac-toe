import React from "react";
import { PossibleValue } from "../Grid/Grid";
import styles from "./Cell.module.scss";

interface CellInterface {
    id: number;
    nextValue: PossibleValue;
    gameHasEnded: boolean;
    setNextValue: any;
    setGridValue: any;
}

const Cell = (props: CellInterface) => {
    const {
        id,
        nextValue,
        setNextValue,
        setGridValue,
        gameHasEnded,
    } = props;

    const [hasClickedOnCell, setHasClickedOnCell] = React.useState<boolean>(false); 
    const [cellValue, setCellValue] = React.useState<PossibleValue>();

    const handleClick = () => {
        if (!hasClickedOnCell && !gameHasEnded) {
            setHasClickedOnCell(true);
            setCellValue(nextValue);
            setGridValue(id, nextValue);
            nextValue === PossibleValue.x ? setNextValue(PossibleValue.o) : setNextValue(PossibleValue.x);
        }
    }
    return (
        <div className={styles.cell} onClick={handleClick}>
         {hasClickedOnCell && cellValue}
        </div>
    )
}

export default Cell;