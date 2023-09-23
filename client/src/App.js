import Dashboard from "pages/dashboard/Dashboard";

function App() {
  console.log(process.env.REACT_APP_SECRET_NAME)
  return (
    <div className="App">
      <Dashboard />
    </div>
  );
}

export default App;
