import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import Intro from "./pages/Intro/Intro";
import Purpose from "./pages/Purpose/Purpose";
import Consent from './pages/Consent/Consent';
import Demographic from './pages/Demographic/Demographic';
import Interview from './pages/Interview/Interview';
import Explanation from './pages/Explanation/Explanation';
import Chat from './pages/Chat/Chat';

function App() {
  return (
    <Router>
			<Routes>
				<Route path="/:lang/:id/:type/" element={<Intro/>} />
				<Route path="/:lang/:id/:type/purpose" element={<Purpose/>} />
				<Route path="/:lang/:id/:type/consent" element={<Consent/>} />
				<Route path="/:lang/:id/:type/demographic" element={<Demographic/>} />
				<Route path="/:lang/:id/:type/interview" element={<Interview/>} />
				<Route path="/:lang/:id/:type/explanation/:step" element={<Explanation />} />
				<Route path="/:lang/:id/:type/chat/:step" element={<Chat />} />
			</Routes>
		</Router>
  );
}

export default App;
