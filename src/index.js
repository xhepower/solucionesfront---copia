import React from "react";
import ReactDOM from "react-dom";
//import "./index.css";
import App from "./App";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
//import Menu from "./components/menus/Principal";
ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById("root")
);
