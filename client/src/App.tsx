import { useContext, useEffect } from 'react';
import './App.css';
import  {Route , Routes} from 'react-router-dom';

import Home from './router/Home';
import Login_Signup from './router/Login_Signup';
import NotFound from './router/NotFound';


import {Cookie} from './custom_modules/cookie'
import { ContextUser } from './context/login/login.context';

function App() {

  const { userState, handlerLogin , handlerLogout} = useContext(ContextUser)
  
  useEffect(() => {

    let refresh = async () => {
      let rtToken = localStorage.getItem('rt');
  
      if(!rtToken){ return handlerLogout }

      let resContext = await fetch((process.env.REACT_APP_URL_SERVER || '') + '/api/auth/refresh' , {
        method: 'POST',
        credentials: 'include',
        headers:[
            ['Accept', "application/json"],
            ["Content-Type", "application/json"],
            ["Access-Control-Allow-Credentials", '*'],
        ],
        body: JSON.stringify({rf_session: rtToken })
      })

      
      let date = await resContext.json()
    

      if( date.statusCode >= 400 || userState?.checkLog){ return handlerLogout() }


      
      handlerLogin({rt: date.rt , ...date.user})
    }

    
    if(Cookie.getCookie(document.cookie , 'session') && !userState ){ refresh() }

  }, [userState])

  
  return (
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login_singup" element={ userState ? <Home/> : <Login_Signup/>}/>
            <Route path="*" element={<NotFound/>}/>
        </Routes>
    
  );
}

export default App;
