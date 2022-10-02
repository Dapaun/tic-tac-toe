import { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { SiOpsgenie } from 'react-icons/si';

const TopBar = () => {
    const userContext = useContext(UserContext);
    const {
        isAuthenticated,
        user,
    } = userContext;
    console.log(user);
    return (
        <div className="w-full h-20 bg-slate-600 flex justify-between">
            <p className="text-white my-auto ml-5 text-lg cursor-default">Tic Tac Toe</p>
            {isAuthenticated && user && <button className="text-white h-full px-5 my-auto text-lg hover:bg-slate-400 transition duration-1000">
                <div className="flex">
                    <div  className="mt-1 mr-1" >
                        <SiOpsgenie/>
                    </div>
                    {user.firstName} {user.lastName}
                </div>
            </button>}
        </div>
    )
}

export default TopBar;