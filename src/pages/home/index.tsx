import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BestSelling from './components/BestSeller';
import CategoriesCTA from './components/CategoriesCTA';
import Features from './components/Features';
import Hero from './components/Hero';
import ProductList from './components/ProductList';

const HomePage: React.FC = () => {
  return (
    <>
      <section className="pl-40 pr-40 bg-gray-100 w-full">
        <Hero />
      </section>
      <section className="pl-40 pr-40">
        <Features />
      </section>
      <section className="pl-40 pr-40">
        <BestSelling />
      </section>
      <section className="pl-40 pr-40 bg-gray-100">
        <CategoriesCTA />
      </section>
      <section className="pl-40 pr-40">
        <ProductList />
      </section>
    </>
  );
};

export default HomePage;
