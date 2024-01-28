import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './components/WelcomePage';
import FrontendForm from './components/Firstpage';
function App() {
  return (
    <div>
      <Router>
      <Routes>
      <Route exact path='/' element={<FrontendForm />} />
        <Route exact path='welcome' element={<WelcomePage />} />
        </Routes>
    </Router>
    </div>
  );
}

export default App;
