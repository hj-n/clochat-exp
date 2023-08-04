import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import Intro from "./pages/Intro/Intro";
import Purpose from "./pages/Purpose/Purpose";
import Consent from './pages/Consent/Consent';

function App() {
  return (
    <Router>
			<Routes>
				<Route path="/:lang/:id/" element={<Intro/>} />
				<Route path="/:lang/:id/purpose" element={<Purpose/>} />
				<Route path="/:lang/:id/consent" element={<Consent/>} />
			</Routes>
		</Router>
  );
}

export default App;
