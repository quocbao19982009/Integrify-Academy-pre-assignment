import React from "react";
import { Container } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import DetailsScreen from "./screens/DetailsScreen";
import MainScreen from "./screens/MainScreen";
import NoFoundScreen from "./screens/NoFoundScreen";

function App() {
  return (
    <>
      <Container className="App my-5">
        <Routes>
          <Route index element={<MainScreen />} />
          <Route path="search/:keyword" element={<MainScreen />} />
          <Route path={"details/:id"} element={<DetailsScreen />} />
          <Route path="*" element={<NoFoundScreen />} />
        </Routes>
      </Container>
      <footer className="text-center mb-5">
        Made By <a href="http://baonguyendev.com">Bao Nguyen</a>
      </footer>
    </>
  );
}

export default App;
