import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DeckComponent from "./components/DeckComponent/DeckComponent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DeckComponent />} />
      </Routes>
    </Router>
  );
}

export default App;