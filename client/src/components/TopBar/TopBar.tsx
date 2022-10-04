import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { SiOpsgenie } from 'react-icons/si';
import styles from './TopBar.module.scss';

const TopBar = () => {
    const userContext = useContext(UserContext);
    const {
        isAuthenticated,
        user,
    } = userContext;
    const [displayUserPopup, setDisplayPopup] = React.useState(false);

    const handleClick = () => {
        setDisplayPopup(!displayUserPopup);
    };

    return (
        <div className={styles.topBarWrapper}>
            <p className={styles.gameNameText}>Tic Tac Toe</p>
            {isAuthenticated && user &&
                <button className={styles.userNameButton} onClick={handleClick}>
                    <div className="flex">
                        <div className="mt-1 mr-1" >
                            <SiOpsgenie />
                        </div>
                        {user.firstName} {user.lastName}
                    </div>
                </button>}
            {displayUserPopup &&
                <div className={styles.userNameButtonPopup}>
                    <div className="border-b-2 border-b-white cursor-pointer pb-2">
                        Log out
                    </div>
                    <div className="cursor-pointer mt-2">
                        Change details
                    </div>
                </div>}
        </div>
    )
}

export default TopBar;