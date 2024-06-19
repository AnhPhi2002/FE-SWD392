import Breadcrumb from "./components/Breadcrumb";
import Product from "./components/Product";
import Tabs from "./components/Tabs";
import Similar from "./components/Similar";

export default function ProductDetail() {
  return (
    <>
      <section className="pl-40 pr-40 mt-10 ">
        <Breadcrumb />
      </section>
      <section className="pl-40 pr-40 bg-gray-100 ">
        <Product />
      </section>
      <section className="pl-40 pr-40">
        <Tabs />
      </section>
      <section className="pl-40 pr-40 bg-gray-100 ">
        <Similar />
      </section>
    </>
  )
}