import { useEffect, useState } from "react";
import "./App.css";
import Router from "./Router";
import store from "./Store";
import { loadUser } from "./actions/userActions";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
function App() {
  axios.defaults.withCredentials = true;


  useEffect(() => {
    store.dispatch(loadUser);

    
  }, []);
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
}

export default App;
