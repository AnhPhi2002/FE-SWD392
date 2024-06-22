    import Breadcrumb from "./components/Breadcrumb";
    import Product from "./components/Product";
    import Tabs from "./components/Tabs";
    import Similar from "./components/Similar";
    import { useParams } from 'react-router-dom';
    import React, { useState, useEffect } from 'react';


    export default function ProductDetail() {
      const { productId } = useParams<{ productId: string }>();
      useEffect(() => {
        window.scrollTo(0, 0);
      }, [productId]);
      return (
        <>
          <section className="pl-40 pr-40 mt-10 ">
            <Breadcrumb />
          </section>
          <section className="pl-40 pr-40 bg-gray-100 ">
            <Product productId={Number(productId)}/>
          </section>
          <section className="pl-40 pr-40">
            <Tabs productId={Number(productId)}/>
          </section>
          <section className="pl-40 pr-40 bg-gray-100 ">
            <Similar />
          </section>
        </>
      )
    }