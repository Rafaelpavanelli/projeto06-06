import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './pages/Menu';
import { Login } from './pages/Login';
import { Cadastrar } from './pages/CadastrarLogin';
import { UserContextProvider } from './components/contexts/User';

export const Router = () => {
  return (
    <UserContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/cadastrar' element={<Cadastrar />} />
          <Route path='/Home' element={<Home />} />
        </Routes>
      </BrowserRouter>
    </UserContextProvider>
  );
};
