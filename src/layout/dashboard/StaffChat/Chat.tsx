// Chat.tsx
import { useState } from 'react';
import StaffChatBox from './ChatBox';
import CustomerChatBox from '@/components/share/chat/ChatBox';

const Chat = ({ isStaff = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button onClick={() => setIsOpen(!isOpen)} className="bg-blue-500 text-white p-3 rounded-full shadow-lg">
                <i className="fa fa-comments" aria-hidden="true"></i>
            </button>
            {isOpen && (isStaff ? <StaffChatBox /> : <CustomerChatBox />)}
        </div>
    );
};

export default Chat;
