import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { Calculator } from './pages/Calculator';
import { Forum } from './pages/Forum';
import { Account } from './pages/Account';

function App() {
  return (
    <div>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Calculator />} />
          <Route path='/forum' element={<Forum />} />
          <Route path='/account' element={<Account />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
