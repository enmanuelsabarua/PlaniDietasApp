import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { Calculator } from './pages/Calculator';
import { Forum } from './pages/Forum';
import { Account } from './pages/Account';
import { LoginSignup } from './pages/LoginSignup';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path='/' element={<Calculator />} />
          <Route path='/forum' element={<Forum />} />
          <Route path='/account' element={<Account />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
