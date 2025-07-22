import { Route, Routes } from "react-router";
import Users from "./pages/Users";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Users />} />
    </Routes>
  );
}

export default App;
