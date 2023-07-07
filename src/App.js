import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Error from './Error';
import { AuthStateProvider } from './contexts/authState.context';
import Chat from './Chat';

function App() {
  return (
    <div>
      <AuthStateProvider>
        <Routes>
          <Route path='/' element={<Chat />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/*' element={<Error />} />
        </Routes>
      </AuthStateProvider>
    </div>
  );
}

export default App;
