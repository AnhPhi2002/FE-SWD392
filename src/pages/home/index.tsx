

import Features from "./components/Features";
import Hero from "./components/Hero";


export default function HomePage() {
  return (
    <>
    <section className="pl-40 pr-40 bg-gray-100 "> 
       <Hero />
    </section>
    <section className="pl-40 pr-40"> 
      <Features/>
    </section>
    <section className="pl-40 pr-40 bg-slate-50"> 
    Best Seller
    </section>
     <section className=""> 
    Categories CTA
    </section>
    <section className="pl-40 pr-40 bg-slate-100"> 
    Product List
    </section>
    </>
  );
}
