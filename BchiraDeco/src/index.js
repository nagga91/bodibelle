import ReactDOM from "react-dom/client";
import "./index.scss";
import App from "./App";
import ProductsContext from "./context/ProductsContext";
import { BrowserRouter } from "react-router-dom";
import CardContext from "./context/CardContext";
import AuthContext from "./context/AuthContext";
import './i18n'
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
      <CardContext>
        <ProductsContext>
          <AuthContext>
            <App />
          </AuthContext>
        </ProductsContext>
     </CardContext>
  </BrowserRouter>
);


