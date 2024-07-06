import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

interface User {
  user_id: number;
  email: string;
  full_name: string;
  avatar_url?: string[];
}

interface Messager {
  messager_id: number;
  user1_id: number;
  user2_id: number;
  createdAt: string;
  updatedAt: string;
  user1: User;
  user2: User;
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

const StaffChatBox: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState<string>('');
  const [userId, setUserId] = useState<number | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [messagerId, setMessagerId] = useState<number | null>(null);
  const [messagers, setMessagers] = useState<Messager[]>([]);
  const [selectedRecipientId, setSelectedRecipientId] = useState<number | null>(null);

  useEffect(() => {
    fetchUserProfile();
    fetchMessagers();

    socket.on('chat message', (message: Message) => {
      setMessages(prevMessages => {
        if (message.messager_id === messagerId) {
          return [message, ...prevMessages];
        }
        return prevMessages;
      });
    });

    return () => {
      socket.off('chat message');
    };
  }, [messagerId]);

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

  const fetchMessagers = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch('http://localhost:5000/api/chats/messagers', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const data: Messager[] = await response.json();
      setMessagers(data);
    } catch (error) {
      console.error('Error fetching messagers:', error);
    }
  };

  const fetchMessages = async (messagerId: number) => {
    try {
      const token = localStorage.getItem('accessToken');
      const response = await fetch(`http://localhost:5000/api/chats/user/messagers/${messagerId}`, {
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
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newMessage.trim() || messagerId === null || selectedRecipientId === null) return;

    const messageData = {
      recipient_id: selectedRecipientId,
      message: newMessage,
      messager_id: messagerId,
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
        recipient: { user_id: selectedRecipientId, email: '', full_name: 'Unknown User', avatar_url: ['default-avatar-url'] }
      };

      // Emit the message to the server
      socket.emit('chat message', messageWithUser);

      // Update local message state
      setMessages((prevMessages) => {
        if (!prevMessages.some(msg => msg.chat_id === messageWithUser.chat_id)) {
          return [messageWithUser, ...prevMessages];
        }
        return prevMessages;
      });

      setNewMessage('');

    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const handleNewMessageChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewMessage(e.target.value);
  };

  const handleMessagerClick = (messagerId: number, recipientId: number) => {
    setMessagerId(messagerId);
    setSelectedRecipientId(recipientId);
    fetchMessages(messagerId);
  };

  const deleteMessager = async (messagerId: number) => {
    try {
      const token = localStorage.getItem('accessToken');
      await fetch(`http://localhost:5000/api/chats/messagers/${messagerId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setMessagers((prevMessagers) => prevMessagers.filter(messager => messager.messager_id !== messagerId));
      if (messagerId === selectedRecipientId) {
        setMessages([]);
        setMessagerId(null);
        setSelectedRecipientId(null);
      }
    } catch (error) {
      console.error('Error deleting messager:', error);
    }
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
    <div className="flex h-[600px] w-[800px] bg-gray-100 border border-gray-200">
      <div className="w-2/5 bg-white border-r border-gray-300 overflow-y-auto">
        <div className="p-4 border-b border-gray-300 text-lg font-semibold text-gray-700">
          List of Chat Users
        </div>
        {messagers.map((messager) => (
          <div
            key={messager.messager_id}
            className="p-4 border-b border-gray-300 flex justify-between items-center cursor-pointer hover:bg-gray-200"
            onClick={() => handleMessagerClick(messager.messager_id, messager.user1_id)}
          >
            <div className="flex items-center">
              <img
                src={messager.user1.avatar_url?.[0] || 'default-avatar-url'}
                alt={messager.user1.full_name}
                className="w-10 h-10 rounded-full mr-4"
              />
              <div>
                <div className="font-semibold">{messager.user1.full_name}</div>
                <div className="text-sm text-gray-600">{messager.user1.email}</div>
              </div>
            </div>
            <button
              className="ml-4 p-2 bg-red-500 text-white rounded hover:bg-red-700"
              onClick={(e) => {
                e.stopPropagation();
                deleteMessager(messager.messager_id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="w-3/5 flex flex-col h-full">
        <div className="flex-1 overflow-y-auto flex flex-col-reverse p-4 space-y-4 space-y-reverse">
          {messages.map((msg, index) => (
            <div
              key={`${msg.chat_id}-${index}`}
              className={`flex items-end ${msg.user_id === userId ? 'justify-end' : 'justify-start'}`}
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
                className={`w-10 h-10 rounded-full ${msg.user_id === userId ? 'order-2' : 'order-1'}`}
                title={getUserName(msg)}
              />
            </div>
          ))}
        </div>
        <div className="p-4 bg-white border-t border-gray-300">
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

export default StaffChatBox;
