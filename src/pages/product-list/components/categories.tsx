import React from 'react';

// Define the props type if needed, here we don't have props to pass
type CategoriesSidebarProps = {};

const CategoriesSidebar: React.FC<CategoriesSidebarProps> = () => {
    const categories = [
        "Perfume",
        "Trousers",
        "Shoe",
        "Handbag",
        "Hat",
        "Thermos"
    ];

    return (
        <div style={sidebarStyle}>
            <h3 style={titleStyle}>Categories</h3>
            <ul style={listStyle}>
                {categories.map((category, index) => (
                    <li key={index} style={listItemStyle}>
                        <label>
                            <input type="checkbox" style={checkboxStyle} />
                            {category}
                        </label>
                    </li>
                ))}
            </ul>
        </div>
    );
};

// You can adjust the styling directly in your component or through CSS classes
const sidebarStyle = {
    padding: '20px',
    width: '250px',
    background: '#FFFFFF',
    boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px'
};

const titleStyle = {
    marginBottom: '16px',
    fontSize: '16px',
    fontWeight: 'bold'
};

const listStyle = {
    listStyle: 'none',
    padding: 0
};

const listItemStyle = {
    marginBottom: '12px',
    fontSize: '14px'
};

const checkboxStyle = {
    marginRight: '8px'
};

export default CategoriesSidebar;
