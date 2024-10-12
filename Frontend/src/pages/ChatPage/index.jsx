import './styles.css';
import { useState, useEffect, useRef, useMemo } from 'react';
import { useGetUserChatRoom } from '../../hooks/chat.hooks';
import { useLoggedInUser } from '../../hooks/auth.hooks';
import io from 'socket.io-client';

const ChatPage = () => {
    const socket = useMemo(() => io('http://localhost:9000'), []);
    const { data: user } = useLoggedInUser();
    const userMemo = useMemo(() => {
        // This will only run once when the component initially mounts
        return user;
    }, [user]);
    const { data: chatRooms } = useGetUserChatRoom(); // State to store the list of users
    const [selectedUser, setSelectedUser] = useState(null); // State to store the selected user
    const [message, setMessage] = useState(''); // State to store the message
    const [messages, setMessages] = useState([]); // State to store the messages
    const chatBoxRef = useRef(null); // Ref to the chat box
    const [room, setRoom] = useState(null); // State to store the chat room

    useEffect(() => {
        socket.on('message', handleIncommingMessage);
        return () => {
            socket.off('message', handleIncommingMessage);
        };
    }, []);

    const handleIncommingMessage = (data) => {
        setMessages((prev) => [...prev, data]);
    };

    const handleUserSelect = (data) => {
        console.log('data', data);
        socket.emit('join-room', data._id);
        setRoom(data._id);
        setSelectedUser(data.reciver);
    };

    const handleInputChange = (e) => {
        e.preventDefault();
        setMessage(e.target.value);
    };

    const handleSendMessage = () => {
        socket.emit('recieve-message', {
            message,
            roomId: room,
            sender: user._id,
        });
        setMessage('');
    };

    return (
        <div className="flex justify-center h-full">
            <div className="flex main-container border">
                <div className="user-container border">
                    <h3>User List</h3>

                    {chatRooms?.map((room) => (
                        <div key={room._id}>
                            {room.ownerId === userMemo._id ? (
                                <div
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleUserSelect({
                                            me: user._id,
                                            reciver: room.userId,
                                            _id: room._id,
                                        });
                                    }}
                                >
                                    {room.userId}
                                </div>
                            ) : (
                                <div
                                    onClick={(e) => {
                                        e.preventDefault();
                                        handleUserSelect({
                                            me: user._id,
                                            reciver: room.ownerId,
                                            _id: room._id,
                                        });
                                    }}
                                >
                                    {' '}
                                    {room.ownerId}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="chat-container flex justify-center h-full w-full">
                    {selectedUser && ( // Only render chat container if a user is selected
                        <div className="h-full w-full flex flex-col">
                            <div className="chat-header h-14 bg-secondary">
                                <h1 className="text-white text-2xl p-2">
                                    {selectedUser}
                                </h1>
                            </div>
                            <div
                                className="chat-box flex-1 overflow-y-auto p-2"
                                ref={chatBoxRef}
                            >
                                {messages?.map((data, index) => (
                                    <div key={index} className="message">
                                        {data.sender === user._id ? (
                                            <div className="chat chat-end">
                                                <div className="chat-bubble chat-bubble-primary">
                                                    {data.message}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="chat chat-start">
                                                <div className="chat-bubble chat-bubble-secondary">
                                                    {data.message}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                            <div className="input-area flex p-3">
                                <input
                                    type="text"
                                    className="input w-full border-b border-b-secondary"
                                    placeholder="Type a message"
                                    value={message}
                                    onChange={handleInputChange}
                                />
                                <button
                                    className="btn"
                                    onClick={handleSendMessage}
                                >
                                    Send
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ChatPage;
