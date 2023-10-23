import "./App.css";
import Hero from "./components/Hero";
import Header from "./components/common/Header";
import ContainerProducts from "./components/product/ContainerProducts";
import DetailProduct from "./components/product/DetailProduct";

function App() {
  return (
    <>
      <Header />
      <main>
        {/* <Hero />
        <ContainerProducts /> */}
        <DetailProduct />
      </main>
    </>
  );
}

export default App;
