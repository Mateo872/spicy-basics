import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store.js";

export default function render() {
  const html = ReactDOMServer.renderToString(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
  return { html };
}
