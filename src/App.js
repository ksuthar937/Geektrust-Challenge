import Footer from "./components/Footer";
import Header from "./components/Header";
import Table from "./components/Table";

import { DataProvider } from "./context/DataContext";

function App() {
  return (
    <>
      <DataProvider>
        <Header />
        <Table />
        <Footer />
      </DataProvider>
    </>
  );
}

export default App;
