import Product from "../product-detail/components/Product";
import CategoriesSidebar from "./components/categories";
import Similar from "./components/productlist";

export default function ProductListings() {
    return (
      <>
        <section className="pl-40 pr-40 bg- ">
          <CategoriesSidebar />
        </section>
        <section className="pl-40 pr-40 bg- ">
          <Similar />
        </section>
        
     
      </>
    )
  }