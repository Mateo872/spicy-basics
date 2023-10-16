import "./App.css";
import Hero from "./components/Hero";
import Header from "./components/common/Header";
import ContainerProducts from "./components/product/ContainerProducts";

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        {/* <ContainerProducts /> */}
      </main>
    </>
  );
}

export default App;
