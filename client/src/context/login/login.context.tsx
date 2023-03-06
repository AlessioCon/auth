import { createContext} from 'react';
import { UserStateInterface , HandlerUserLogin , HandlerUserUpdate } from './login.interface'


type UserContextProp = {
  userState: UserStateInterface,
  handlerLogin: (user: HandlerUserLogin) => void,
  handlerLogout:() => void,
  handlerUpdate: (user: HandlerUserUpdate) => void
}


export const ContextUser    = createContext<UserContextProp>({} as UserContextProp)