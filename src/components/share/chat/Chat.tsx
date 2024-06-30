// Chat.tsx
import { useState } from 'react';
import CustomerChatBox from './ChatBox';

const Chat = () => {
    const [showChatBox, setShowChatBox] = useState(false);

    return (
        <div className="fixed bottom-4 right-4 z-[9999]">
            <button onClick={() => setShowChatBox(!showChatBox)}
                className="bg-white p-4 rounded-full shadow-md text-3xl hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-500 focus:ring-opacity-50">
                <i className="fa-solid fa-message"></i> {/* Assume Font Awesome included */}
            </button>
            {showChatBox && <CustomerChatBox />}
        </div>
    );
};

export default Chat;
