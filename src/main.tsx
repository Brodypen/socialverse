import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddCreator from "./pages/AddCreator.tsx";
import EditCreator from "./pages/EditCreator.tsx";
import ViewCreator from "./pages/ViewCreator.tsx";
import ShowCreators from "./pages/ShowCreators.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/add-creator" element={<AddCreator />} />
        <Route path="/edit-creator/:id" element={<EditCreator />} />
        <Route path="/view-creator/:id" element={<ViewCreator />} />
        <Route path="/show-creators" element={<ShowCreators />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
