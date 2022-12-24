import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import User from "./user/user";
import Meetings from "./user/meetings";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<User />}>
        </Route>
        <Route path="meetings/:id" element={<Meetings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
