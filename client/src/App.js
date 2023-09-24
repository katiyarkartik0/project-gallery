import Navbar from "components/navbar/Navbar";
import Dashboard from "pages/dashboard/Dashboard";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import SmartSearch from "pages/smartSearch/SmartSearch";
function App() {
  console.log(process.env.REACT_APP_SECRET_NAME);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<Dashboard />}></Route>
            <Route path="/smartSearch" element={<SmartSearch />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
