import './App.css';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';

import Intro from "./pages/Intro/Intro";
import Purpose from "./pages/Purpose/Purpose";
import Consent from './pages/Consent/Consent';
import Demographic from './pages/Demographic/Demographic';
import Interview from './pages/Interview/Interview';
import Explanation from './pages/Explanation/Explanation';
import ExplanationClochat from './pages/ExplanationClochat/ExplanationClochat';
import Chat from './pages/Chat/Chat';
import Survey from './pages/Survey/Survey';
import Customize from './pages/Customize/Customize';
import Goodbye from './pages/Goodbye/Goodbye';

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
				<Route path="/:lang/:id/:type/explanation_clochat/:step" element={ <ExplanationClochat /> } />
				<Route path="/:lang/:id/:type/chat/:step/:defaultPersonaNum" element={<Chat />} />
				<Route path="/:lang/:id/:type/survey/:step/:taskIndex/:surveyType" element={<Survey />} />
				<Route path="/:lang/:id/:type/customize/:step/:taskIndex/:personaNum" element={<Customize />} />
				<Route path="/:lang/:id/:type/goodbye" element={<Goodbye />} />
			</Routes>
		</Router>
  );
}

export default App;
