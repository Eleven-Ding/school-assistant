import React, { Suspense } from "react";
import store from "./store";
import { BrowserRouter, HashRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "antd/dist/antd.css";
import "./App.css";
import "../src/normalize.css";
import MainPage from "./pages/main";

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={""}>
        <HashRouter>
          <MainPage></MainPage>
        </HashRouter>
      </Suspense>
    </Provider>
  );
}

export default App;
