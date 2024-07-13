import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import BestSelling from './components/BestSeller';
import CategoriesCTA from './components/CategoriesCTA';
import Features from './components/Features';
import Hero from './components/Hero';
import ProductList from './components/ProductList';

import { userActions } from '@/lib/api/redux/userSlice';
import { userAPI } from '@/lib/api/user-api';
import { useNavigate } from 'react-router-dom';
import { Roles } from '@/lib/roles';

const HomePage: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await userAPI.getUserApi();
        dispatch(userActions.setListUser(data));
        if (data) {
          if (data.role == Roles.Admin) {
            navigate('/admin/dashboard');
          } else if ((data.role == Roles.Staff)) {
            navigate('/staff/dashboard');
          }
        }
      } catch (error) {}
    };
    fetchData();
  }, []);
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
