import React, { useState, useEffect, useCallback } from 'react';

// Updated Category interface to use number type for id.
interface Category {
    id: number;  // Now using number for id
    name: string;
}

type CategoriesSidebarProps = {
    onCategorySelect: (selectedCategoryIds: number[]) => void;
};

const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({ onCategorySelect }) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);  // State type updated to number[]

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/categories');
                if (!response.ok) {
                    throw new Error(`HTTP error: status is ${response.status}`);
                }
                const data = await response.json() as Category[];
                setCategories(data);
            } catch (error) {
                setError(error instanceof Error ? error.message : 'An unknown error occurred');
            }
        };

        fetchCategories();
    }, []);

    // Updated the useCallback hook to handle numbers for category IDs.
    const handleCategoryClick = useCallback((categoryId: number) => {
        setSelectedCategoryIds(prevSelectedCategoryIds => {
            const isAlreadySelected = prevSelectedCategoryIds.includes(categoryId);
            const newSelectedCategoryIds = isAlreadySelected
                ? prevSelectedCategoryIds.filter(id => id !== categoryId)
                : [...prevSelectedCategoryIds, categoryId];
            onCategorySelect(newSelectedCategoryIds);
            return newSelectedCategoryIds;
        });
    }, [onCategorySelect]);

    return (
        <div style={sidebarStyle}>
            <h3 style={titleStyle}>Categories</h3>
            {error ? (
                <div style={{ color: 'red' }}>Error: {error}</div>
            ) : (
                <ul style={listStyle}>
                    {categories.map(category => (
                        <li key={category.id} style={listItemStyle}>
                            <label>
                                <input
                                    type="checkbox"
                                    style={checkboxStyle}
                                    checked={selectedCategoryIds.includes(category.id)}
                                    onChange={() => handleCategoryClick(category.id)}
                                />
                                {category.name}
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

// Styles remain unchanged
const sidebarStyle = {
    padding: '20px',
    width: '250px',
    background: '#FFFFFF',
    boxShadow: '0 0 5px rgba(0, 0, 0, 0.1)',
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
