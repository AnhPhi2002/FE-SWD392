import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

interface User {
  user_id: number;
  email: string;
  full_name: string;
  avatar_url?: string[];
}

interface Message {
  chat_id: number;
  user_id: number;
  recipient_id: number;
  messager_id: number;
  message: string;
  createdAt: string;
  updatedAt: string;
  user: User;
  recipient: User;
}

const ChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [messageId, setMessageId] = useState<number | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const recipientId = 2;

  useEffect(() => {
    fetchUserProfile();
    const storedMessageId = localStorage.getItem('messageId');
    if (storedMessageId) {
      setMessageId(Number(storedMessageId));
    }
  }, []);

  useEffect(() => {
    if (userId !== null && messageId !== null) {
      fetchMessages(messageId);
    }
  }, [userId, messageId]);

  useEffect(() => {
    if (roomId) {
      socket.emit('join room', roomId);
    }
  }, [roomId]);

  useEffect(() => {
    socket.on('chat message', (message: Message) => {
      setMessages((prevMessages) => [message, ...prevMessages]);
    });

    return () => {
      if (roomId) {
        socket.emit('leave room', roomId);
      }
      socket.off('chat message');
    };
  }, [roomId]);

  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5000/api/users/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      setUserId(data.user_id);
      setCurrentUser(data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  const fetchMessages = async (messageId: number) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:5000/api/chats/user/messagers/${messageId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data: Message[] = await response.json();
      const updatedMessages = data.map((message) => ({
        ...message,
        user: {
          ...message.user,
          full_name: message.user.full_name || 'Unknown User',
          avatar_url: message.user.avatar_url || ['default-avatar-url']
        },
        recipient: {
          ...message.recipient,
          full_name: message.recipient.full_name || 'Unknown User',
          avatar_url: message.recipient.avatar_url || ['default-avatar-url']
        }
      }));
      setMessages(updatedMessages.reverse());
      setRoomId(`room-${messageId}`);
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newMessage.trim()) return;

    const messageData = {
      recipient_id: recipientId,
      message: newMessage,
    };

    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5000/api/chats', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(messageData),
      });
      const data = await response.json();
      const messageWithUser: Message = {
        ...data,
        user: currentUser || { user_id: userId!, email: '', full_name: 'Unknown User', avatar_url: ['default-avatar-url'] },
        recipient: { user_id: recipientId, email: '', full_name: 'Unknown User', avatar_url: ['default-avatar-url'] }
      };
      setMessages((prevMessages) => [messageWithUser, ...prevMessages]);
      setMessageId(data.messager_id);
      localStorage.setItem('messageId', String(data.messager_id));
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleNewMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const getUserAvatar = (msg: Message) => {
    if (msg.user_id === userId) {
      return currentUser?.avatar_url?.[0] || 'default-avatar-url';
    } else {
      return msg.user?.avatar_url?.[0] || 'default-avatar-url';
    }
  };

  const getUserName = (msg: Message) => {
    if (msg.user_id === userId) {
      return currentUser?.full_name || 'Unknown User';
    } else {
      return msg.user?.full_name || 'Unknown User';
    }
  };

  return (
    <div className="fixed bottom-20 right-4 bg-white shadow-lg rounded-lg p-4 max-w-md w-full z-[9999]">
      <div className="flex flex-col h-[500px] overflow-hidden">
        <div className="overflow-y-auto flex flex-col-reverse">
          {messages.map((msg, index) => (
            <div
              key={`${msg.chat_id}-${index}`}
              className={`flex items-end mb-4 ${msg.user_id === userId ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex flex-col space-y-2 text-sm max-w-xs mx-2 ${
                  msg.user_id === userId ? 'order-1 items-end' : 'order-2 items-start'
                }`}
              >
                <span
                  className={`px-4 py-2 rounded-lg inline-block ${
                    msg.user_id === userId ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-900'
                  }`}
                >
                  {msg.message}
                  <span className="block text-xs text-gray-600 mt-1">
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </span>
              </div>
              <img
                src={getUserAvatar(msg)}
                alt="User Avatar"
                className="w-10 h-10 rounded-full order-1"
                title={getUserName(msg)}
              />
            </div>
          ))}
        </div>
        <div className="mt-auto">
          <form className="flex items-center" onSubmit={sendMessage}>
            <input
              type="text"
              placeholder="Type a message"
              className="flex-grow p-2 border rounded focus:outline-none focus:ring"
              value={newMessage}
              onChange={handleNewMessageChange}
            />
            <button type="submit" className="p-2 ml-2 text-white bg-blue-500 rounded">
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
