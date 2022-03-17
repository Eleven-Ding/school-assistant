import React, { Suspense } from "react";
import store from "./store";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";
import "../src/normalize.css";
import MainPage from "./pages/main";

function App() {
  return (
    <Provider store={store}>
      <Suspense fallback={""}>
        <BrowserRouter>
          <MainPage></MainPage>
        </BrowserRouter>
      </Suspense>
    </Provider>
  );
}

export default App;
