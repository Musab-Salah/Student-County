import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./assets/Global.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Suspense fallback={<div>lod</div>}>
        <App />
      </Suspense>
    </BrowserRouter>
  </React.StrictMode>
);
