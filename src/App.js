import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import Intro from "./pages/Intro/Intro";

function App() {
  return (
    <Router>
			<Routes>
				<Route path="/:lang/" element={<Intro/>} />
			</Routes>
		</Router>
  );
}

export default App;
