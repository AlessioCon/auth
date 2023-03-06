import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter} from 'react-router-dom';
import LoginProvider from './context/login/login.provider'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <BrowserRouter>
    <LoginProvider>
      <App />
    </LoginProvider>  
  </BrowserRouter>
  
);
