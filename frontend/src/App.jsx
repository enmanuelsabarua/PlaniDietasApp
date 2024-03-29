import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { NavBar } from './components/NavBar/NavBar';
import { Calculator } from './pages/Calculator';
import { Forum } from './pages/Forum';
import { Account } from './pages/Account';
import { LoginSignup } from './pages/LoginSignup';
import { Footer } from './components/Footer/Footer';
import { useEffect, useState } from 'react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if (loggedUser) {
      setUser(JSON.parse(loggedUser));
    }
  }, []);

  return (
    <div className='app'>
      <BrowserRouter>
        <NavBar user={user} />
        <Routes>
          <Route path='/' element={<Calculator />} />
          <Route path='/forum' element={<Forum />} />
          <Route path='/account' element={<Account  user={user}/>} />
          <Route path='/login' element={<LoginSignup  setUser={setUser}/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  )
}

export default App
