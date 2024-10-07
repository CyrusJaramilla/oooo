import { AuthProvider } from './AuthFiles/AuthContext.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthLayout from './Components/AuthLayout';
import Login from './Login';
import Signup from './Signup';
import Home from './Components/Home';
import Dashboard from './Pages/Dashboard.jsx';
import Documents from './Pages/CitExtension.jsx';
import CoasExtension from './Pages/CoasExtension.jsx';
import CoeExtension from './Pages/CoeExtension.jsx';
import CoedExtension from './Pages/CoedExtension.jsx'
import Base from './Pages/Base.jsx';
import Document from './Pages/Category/CitExtension1.jsx';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path='/' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Route>
        </Routes>  
        
        <Home>
        <Routes>
            <Route path='/base' element={<Base/>} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/citextension' element={<Documents />} />
            <Route path='/citextension1' element={<Document />} />
            <Route path='/coedextension' element={<CoedExtension />} />
            <Route path='/coeextension' element={<CoeExtension />} />
            <Route path='/coasextension' element={<CoasExtension />} />
        </Routes>
        </Home>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
