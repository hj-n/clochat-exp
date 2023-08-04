import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import Intro from "./pages/Intro/Intro";
import Purpose from "./pages/Purpose/Purpose";
import Consent from './pages/Consent/Consent';
import Demographic from './pages/Demographic/Demographic';

function App() {
  return (
    <Router>
			<Routes>
				<Route path="/:lang/:id/" element={<Intro/>} />
				<Route path="/:lang/:id/purpose" element={<Purpose/>} />
				<Route path="/:lang/:id/consent" element={<Consent/>} />
				<Route path="/:lang/:id/demographic" element={<Demographic/>} />
			</Routes>
		</Router>
  );
}

export default App;
