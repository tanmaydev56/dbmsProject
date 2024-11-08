import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import CategoriesList from "./components/CategoriesList";
import OrdersList from "./components/OrderList";
import ProductsListNew from "./components/ProductList";
import UsersList from "./components/UserList";
import Home from './pages/Home';
import CartPage from './components/Cart';


function App() {
  return (
   
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/carts" element={<CartPage userId={1} />} />
          <Route path="/products" element={<ProductsListNew />} />
          <Route path="/users" element={<UsersList />} />
          <Route path="/orders" element={<OrdersList />} />
          <Route path="/categories" element={<CategoriesList />} />
        </Routes>
      </Router>
    
  );
}

export default App;
