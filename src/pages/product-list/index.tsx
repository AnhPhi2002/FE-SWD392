import React, { useState } from 'react';
import CategoriesSidebar from './components/categories';
import ProductList from './components/productlist';

export default function ProductListings() {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  return (
    <div className="flex flex-row pl-40 pr-40 bg-">
      <section className="w-1/4">
        <CategoriesSidebar selectedCategoryIds={selectedCategoryIds} setSelectedCategoryIds={setSelectedCategoryIds} />
      </section>
      <section className="w-3/4">
        <ProductList selectedCategoryIds={selectedCategoryIds} />
      </section>
    </div>
  );
}
