import { useContext } from 'react'
import {Link} from 'react-router-dom' 
import { ContextUser } from '../context/login/login.context'


export default function Login(){

    const { userState , handlerLogout, handlerUpdate } = useContext(ContextUser)

    async function logOut(){
        let res = await fetch((process.env.REACT_APP_URL_SERVER || '') + '/api/auth/logout' , {
            method: 'GET',
            credentials: 'include',
                headers:[
                    ['Accept', "application/json"],
                    ["Content-Type", "application/json"],
                    ["Access-Control-Allow-Credentials", '*'],
                ],
          })
        let opt = await res.json();
        if(opt.success){
            handlerLogout()
           
        }else{
            if(opt.statusCode === 401){
                handlerUpdate({checkLog:true})
            }
        }
    }

    function userStateCheck(e : React.MouseEvent<HTMLAnchorElement>){
        if(!userState) return;
        e.preventDefault()
        alert('sei già autenticato')
    }
    return <main>
        {userState ? <h1>Sei Autenticato</h1> : <h1>Non sei autenticato</h1>}

        {userState && <button className="btn-first" onClick={e => logOut()}>logOut</button>}
            
        <div className={'box-card' + (userState ? ' ligth' : '')}>
            <Link to="/login_singup" title="login" onClick={userStateCheck}>
                email e password
            </Link>
            <Link to="/" title="in arrivo" onClick={userStateCheck}>
                in arrivo...
            </Link>
            <Link to="/" title="in arrivo" onClick={userStateCheck}>
                in arrivo...
            </Link>
        </div>
    
       
        
    </main>
}