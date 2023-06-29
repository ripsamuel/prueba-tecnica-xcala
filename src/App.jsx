
import './App.css'
import { useRoutes, BrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import VerifiedOrders from './pages/VerifiedOrders';
import OrderDetails from './components/OrderDetails';


const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/VerifiedOrders", element: <VerifiedOrders/> },
    { path: "/VerifiedOrders/:orderNumber", element: <OrderDetails/> },

  ]);

  return routes;
};

const App = () => {
  return(
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    )
}

export default App;
