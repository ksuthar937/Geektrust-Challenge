import Footer from "./components/Footer";
import Header from "./components/Header";
import Loader from "./components/Loader";
import Table from "./components/Table";

import { useData } from "./context/DataContext";

function App() {
  const { isLoading } = useData();
  return (
    <>
      <Header />
      {isLoading ? <Loader /> : <Table />}
      <Footer />
    </>
  );
}

export default App;
