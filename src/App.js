import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';
import Error from './Error';
import Chat from './Chat';
import { AuthStateProvider } from './contexts/authState.context';
import { MessageStateProvider } from './contexts/messageState.context';

function App() {
  return (
    <div>
      <AuthStateProvider>
        <MessageStateProvider>
          <Routes>
            <Route path='/' element={<Chat />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/*' element={<Error />} />
          </Routes>
        </MessageStateProvider>
      </AuthStateProvider>
    </div>
  );
}

export default App;
