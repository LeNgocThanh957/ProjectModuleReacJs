
import './App.css';
import {Route, Routes} from "react-router-dom";
import ListProduct from "./Component/ListProduct";
import ProductDetail from "./Component/ProductDetail";
import AddProduct from "./Component/AddProduct";
import EditProduct from "./Component/EditProduct";

function App() {
  return (
    <>
    <Routes>
      <Route path="/" element={<ListProduct/>}></Route>
      <Route path="/products/:id" element={<ProductDetail />} />
      <Route path="/products/new" element={<AddProduct />} />
      <Route path="/products/edit/:id" element={<EditProduct />} />
    </Routes>
    </>
  );
}

export default App;
