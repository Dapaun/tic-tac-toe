import { SocketContext } from "../../context/socketContext";
import React, { useContext } from "react";
import { UserContext } from "../../context/userContext";
import { useNavigate } from 'react-router-dom';
import styles from './UsersList.module.scss';
import UserListComponent from "../UserListComponent/UserListComponent";

interface UsersListInterface {
    showModal: boolean;
}

const UsersList = (props: UsersListInterface) => {
    const {
        showModal,
    } = props;
    const [usersList, setUsersList] = React.useState([]);
    const socket = useContext(SocketContext);
    const { user } = useContext(UserContext);
    const navigate = useNavigate();

    // maybe move this inside the context? same for the users list
    React.useEffect(() => {
        user && user.id && socket.emit('send-user-data', user);
    }, [socket, user]);

    React.useEffect(() => {
        socket.emit('data-update');
        socket.on('send-online-list', (data: any) => {
            console.log('DATA ', data, 'socket id ', socket.id);
            setUsersList(data);
        });
    }, [socket, navigate]);


    let mockList = [{
        socketId: '1',
        user: {
            id: '1',
            firstName: 'Test',
            lastName: 'Test'
        }
    },
    {
        socketId: '2',
        user: {
            id: '2',
            firstName: 'Test2',
            lastName: 'Test2'
        }
    },
    {
        socketId: '3',
        user: {
            id: '3',
            firstName: 'Test3',
            lastName: 'Test3'
        }
    },
    {
        socketId: '42',
        user: {
            id: '42',
            firstName: 'Test42',
            lastName: 'Test42'
        }
    },
    {
        socketId: '1',
        user: {
            id: '1',
            firstName: 'Test',
            lastName: 'Test'
        }
    },
    {
        socketId: '2',
        user: {
            id: '2',
            firstName: 'Test2',
            lastName: 'Test2'
        }
    },
    {
        socketId: '3',
        user: {
            id: '3',
            firstName: 'Test3',
            lastName: 'Test3'
        }
    },
    {
        socketId: '42',
        user: {
            id: '42',
            firstName: 'Test42',
            lastName: 'Test42'
        }
    },
    {
        socketId: '1',
        user: {
            id: '1',
            firstName: 'Test',
            lastName: 'Test'
        }
    },
    {
        socketId: '2',
        user: {
            id: '2',
            firstName: 'Test2',
            lastName: 'Test2'
        }
    },
    {
        socketId: '3',
        user: {
            id: '3',
            firstName: 'Test3',
            lastName: 'Test3'
        }
    },
    {
        socketId: '42',
        user: {
            id: '42',
            firstName: 'Test42',
            lastName: 'Test42'
        }
    },
    ];
    // WIll use newlist to reporduce bugs
    let newList = [...usersList, ...mockList];

    return (
       <>
       {usersList.length > 1 && <div className={styles.listWrapper}>
            <div className="h-screen">
                <h3 className={styles.listHeader}>Online users</h3>
                <>
                    {usersList.map((userData: any) =>
                        user && user.id !== userData.user.id &&
                        <UserListComponent userData={userData} showModal={showModal}/>
                    )}
                </>
            </div>
        </div>}
        </>
    )
}

export default UsersList;