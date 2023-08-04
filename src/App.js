import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import Intro from "./pages/Intro/Intro";
import Purpose from "./pages/Purpose/Purpose";
import Consent from './pages/Consent/Consent';
import Demographic from './pages/Demographic/Demographic';
import Interview from './pages/Interview/Interview';
import Explanation from './pages/Explanation/Explanation';

function App() {
  return (
    <Router>
			<Routes>
				<Route path="/:lang/:id/" element={<Intro/>} />
				<Route path="/:lang/:id/purpose" element={<Purpose/>} />
				<Route path="/:lang/:id/consent" element={<Consent/>} />
				<Route path="/:lang/:id/demographic" element={<Demographic/>} />
				<Route path="/:lang/:id/interview" element={<Interview/>} />
				<Route path="/:lang/:id/explanation/:step" element={<Explanation />} />
			</Routes>
		</Router>
  );
}

export default App;
