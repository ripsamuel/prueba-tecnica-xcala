
import './App.css'
import { useRoutes, BrowserRouter } from "react-router-dom";
import Home from './pages/Home';
import Orders from './pages/Orders';


const AppRoutes = () => {
  let routes = useRoutes([
    { path: "/", element: <Home /> },
    { path: "/orders", element: <Orders/> },
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
