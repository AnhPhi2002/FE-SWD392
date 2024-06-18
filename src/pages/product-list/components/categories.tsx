import React, { useState, useEffect } from 'react';
import axios from 'axios';

type Category = {
  category_id: number;
  name: string;
};

type CategoriesSidebarProps = {
  selectedCategoryIds: number[];
  setSelectedCategoryIds: React.Dispatch<React.SetStateAction<number[]>>;
};

const CategoriesSidebar: React.FC<CategoriesSidebarProps> = ({ selectedCategoryIds, setSelectedCategoryIds }) => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleCheckboxChange = (categoryId: number) => {
    if (selectedCategoryIds.includes(categoryId)) {
      setSelectedCategoryIds(selectedCategoryIds.filter(id => id !== categoryId));
    } else {
      setSelectedCategoryIds([...selectedCategoryIds, categoryId]);
    }
  };

  return (
    <div className="p-5 w-64 bg-white shadow rounded-lg mt-10">
      <h3 className="mb-4 text-lg font-bold">Categories</h3>
      <ul className="list-none p-0">
        {categories.map((category) => (
          <li key={category.category_id} className="mb-3 text-sm">
            <label className="flex items-center">
              <input 
                type="checkbox" 
                className="mr-2" 
                checked={selectedCategoryIds.includes(category.category_id)}
                onChange={() => handleCheckboxChange(category.category_id)}
              />
              {category.name}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoriesSidebar;
