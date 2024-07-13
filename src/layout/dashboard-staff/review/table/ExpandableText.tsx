import React, { useState } from 'react';

interface ExpandableTextProps {
  text: string;
  maxLength: number;
}

const ExpandableText: React.FC<ExpandableTextProps> = ({ text, maxLength }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleToggle = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <span>
        {isExpanded ? text : `${text.substring(0, maxLength)}...`}
      </span>
      {text.length > maxLength && (
        <button onClick={handleToggle} className="text-blue-500 ml-1">
          {isExpanded ? 'Hide' : 'Read more'}
        </button>
      )}
    </div>
  );
};

export default ExpandableText;
