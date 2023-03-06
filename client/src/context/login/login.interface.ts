
export interface HandlerUserLogin {
        id: string,
        user: string,
        email: string,
        rt: string
        checkLog?: true,
}

export interface HandlerUserUpdate {
        email?: string,
        user?: string,
        rt?:string,
        checkLog?: true
}

export type UserStateInterface = HandlerUserLogin | null

export type UserActionReducer = 
    | {type: 'login', user:string , email: string, id: string , rt: string}
    | {type: 'logout'}
    | {type: 'update' , user?: string , email?: string , rt?:string , checkLog?: true}