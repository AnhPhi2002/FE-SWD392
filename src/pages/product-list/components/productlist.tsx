import React, { useState, useEffect, useCallback } from 'react';

interface Product {
  product_name: string;
  price: string;
  status: 'available' | 'out_of_stock' | 'discontinued';
  image_url: string;
}

interface Category {
  id: string;
  name: string;
  products: Product[];
}

const CategoriesSidebar: React.FC<{ categories: Category[], onCategorySelect: (id: string | null) => void }> = ({ categories, onCategorySelect }) => {
  return (
    <div style={{ width: '250px', margin: '10px', padding: '10px', background: '#f0f0f0' }}>
      {categories.map((category) => (
        <div key={category.id} style={{ margin: '5px 0' }}>
          <button onClick={() => onCategorySelect(category.id)} style={{ padding: '10px', width: '100%' }}>
            {category.name}
          </button>
        </div>
      ))}
    </div>
  );
};

const ProductList: React.FC<{ products: Product[] }> = ({ products }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product) => (
        <div key={product.product_name} className="bg-white shadow-md rounded-lg overflow-hidden">
          <img src={product.image_url} alt={product.product_name} className="w-full h-48 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-medium text-gray-900">{product.product_name}</h3>
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
              product.status === 'available' ? 'bg-green-200 text-green-800' :
              product.status === 'out_of_stock' ? 'bg-red-200 text-red-800' :
              'bg-yellow-200 text-yellow-800'
            }`}>{product.status}</span>
            <p className="text-sm pl-6 font-medium text-gray-900">{product.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const ProductListPage: React.FC = () => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const products = await response.json();
        setAllProducts(products);
        setDisplayedProducts(products); // Initially display all products

        const categoryResponse = await fetch('http://localhost:5000/api/categories');
        const categoryData = await categoryResponse.json();
        setCategories(categoryData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
  
    fetchData();
  }, []); // Chỉ chạy một lần khi component mount
  
  useEffect(() => {
    if (selectedCategoryId) {
      const category = categories.find(c => c.id === selectedCategoryId);
      if (category && category.products) {
        setDisplayedProducts(category.products);
      }
    } else {
      setDisplayedProducts(allProducts); // Show all products when no category is selected
    }
  }, [selectedCategoryId, categories, allProducts]);

  const handleCategorySelect = useCallback((categoryId: string | null) => {
    setSelectedCategoryId(categoryId);
  }, []);

  return (
    <div style={{ display: 'flex' }}>
      <CategoriesSidebar categories={categories} onCategorySelect={handleCategorySelect} />
      <ProductList products={displayedProducts} />
    </div>
  );
};

export default ProductListPage;
