import { useState } from 'react';
import StaffChatBox from './ChatBox';
import CustomerChatBox from '@/components/share/chat/ChatBox';

const Chat = ({ isStaff = false }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed bottom-4 right-4 z-50">
            <button 
                onClick={() => setIsOpen(!isOpen)} 
                className={`${isOpen ? 'bg-red-500' : 'bg-blue-500'} text-white p-3 rounded-full shadow-lg w-12 h-12 flex items-center justify-center fixed ${isOpen ? 'top-20 right-4' : 'bottom-4 right-4'} z-50`}
            >
                <i className={isOpen ? "fa-solid fa-x" : "fa fa-comments"} aria-hidden="true"></i>
            </button>
            {isOpen && (
                <div className="fixed bottom-4 right-4 z-40">
                    {isStaff ? <StaffChatBox /> : <CustomerChatBox />}
                </div>
            )}
        </div>
    );
};

export default Chat;
