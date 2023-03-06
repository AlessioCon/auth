
import { useReducer } from "react"
import { ContextUser } from "./login.context"
import { HandlerUserUpdate, HandlerUserLogin } from "./login.interface"
import { UserReducer } from "./login.reducer"



interface LoginProviderProp { children: JSX.Element | JSX.Element[]}



export default function LoginProvider({ children } : LoginProviderProp ){

    const [state, dispatch] =  useReducer(UserReducer , null)


    function handlerLogin(user : HandlerUserLogin){
        dispatch({type:'login' , ...user})
    }

    function handlerLogout(){
        dispatch({type: 'logout'})
    }

    function handlerUpdate(user: HandlerUserUpdate){
        dispatch({type: 'update' , ...user })
    }

    return (
        <ContextUser.Provider value={{
            userState: state ,
            handlerLogin,
            handlerLogout,
            handlerUpdate
        }}>
            {children}
        </ContextUser.Provider>
    )

}