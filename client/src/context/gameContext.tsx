import React from "react";
import { PossibleValue } from "../components/Grid/Grid";

interface GameContextProps {
    nextValue: PossibleValue;
    setNextValue: any;
    gridArray: string[];
    setGridArray: any;
    gameHasEnded: any;
    setGameHasEnded: any;
    showModal: any;
    setShowModal: any;
    canInput: any;
    setCanInput: any;
    enemy: any;
    setEnemy: any;
    gameHasStarted: any;
    setGameHasStarted: any;
    enemyName: any;
    setEnemyName: any;
    challengerRoom: any;
    setChallengerRoom: any;
    challengeMessage: any;
    setChallengeMessage: any;
}

export const GameContext = React.createContext<GameContextProps>(undefined as any);

const GameContextProvider = (props: any) => {
    const [nextValue, setNextValue] = React.useState<PossibleValue>(PossibleValue.x);
    const [gridArray, setGridArray] = React.useState(['', '', '', '', '', '', '', '', '']);
    const [gameHasEnded, setGameHasEnded] = React.useState(false);
    // const [winner, setWinner] = React.useState<PossibleValue | undefined>();
    const [showModal, setShowModal] = React.useState<boolean>(false);
    const [canInput, setCanInput] = React.useState<boolean>(false);
    const [enemy, setEnemy] = React.useState('');
    const [displayGrid, setDisplayGrid] = React.useState<boolean>(false);
    const [gameHasStarted, setGameHasStarted] = React.useState<boolean>(false)
    const [enemyName, setEnemyName] = React.useState<string>('');
    const [challengerRoom, setChallengerRoom] = React.useState<string>('');
    const [challengeMessage, setChallengeMessage] = React.useState<string>('');

    const gameContextValues = {
        nextValue,
        setNextValue,
        gridArray,
        setGridArray,
        gameHasEnded,
        setGameHasEnded,
        showModal,
        setShowModal,
        canInput,
        setCanInput,
        enemy,
        setEnemy,
        gameHasStarted,
        setGameHasStarted,
        enemyName,
        setEnemyName,
        challengerRoom,
        setChallengerRoom,
        challengeMessage,
        setChallengeMessage,
    };

    return (
        <GameContext.Provider value={gameContextValues}>
            {props.children}
        </GameContext.Provider>
    )
};

export default GameContextProvider;