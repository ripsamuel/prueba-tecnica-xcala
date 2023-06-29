
import './App.css'
import { useRoutes, BrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import Orders from './pages/Orders';
import OrderDetails from './components/OrderDetails';


const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/orders", element: <Orders/> },
    { path: "/orders/:orderNumber", element: <OrderDetails/> },

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
