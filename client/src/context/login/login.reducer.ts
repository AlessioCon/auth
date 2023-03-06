import { Cookie } from "../../custom_modules/cookie"
import { UserActionReducer , UserStateInterface} from "./login.interface"





export  const UserReducer = (state : UserStateInterface , action: UserActionReducer) => {
        
        switch(action.type){
            case 'login':
                localStorage.setItem('rt', action.rt)
                let {type , ...userLog} = action
                return userLog

            case 'logout':
                localStorage.removeItem('rt');
                Cookie.removeCookie('session');
                return null          

            case 'update': 
                if(state && !action.checkLog){
                    if(action.rt){ localStorage.setItem('rt', action.rt) }

                    return {
                        ...state ,
                        user: action?.user || state.user , 
                        rt: action?.rt || state.rt  ,
                        email: action?.email || state.email  ,
                    }
                }
                return null;
            default:
                throw new Error('type non existe');
        }
} 