import React, { Suspense } from "react";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import { Provider } from "react-redux";
import router from "./router";
import "./App.css";
function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={""}>
        <BrowserRouter>{renderRoutes(router)}</BrowserRouter>
      </Suspense>
    </Provider>
  );
}

export default App;
