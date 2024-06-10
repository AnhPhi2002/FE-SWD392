import Breadcrumb from "./components/Breadcrumb";
import Product from "./components/Product";
import Tabs from "./components/Tabs";

export default function ProductDetail() {
  return (
    <>
      <section className="pl-40 pr-40 bg-gray-100 ">
        <Breadcrumb />
      </section>
      <section className="pl-40 pr-40 bg-gray-100 ">
        <Product />
      </section>
      <section className="pl-40 pr-40 bg-gray-100 ">
        <Tabs />
      </section>
    </>
  )
}