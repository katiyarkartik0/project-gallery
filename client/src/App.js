import Navbar from "components/navbar/Navbar";
import Dashboard from "pages/dashboard/Dashboard";
import "./App.css"
function App() {
  console.log(process.env.REACT_APP_SECRET_NAME)
  return (
    <div className="App">
      <Navbar/>
      <Dashboard />
    </div>
  );
}

export default App;
