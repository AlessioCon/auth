import { useContext, useState} from "react";
import Input from "../component/form/input/Input";
import { ContextUser } from "../context/login/login.context";


type FormError = [string | null , string] 

export default function Login_Signup(){

    let {handlerLogin} = useContext( ContextUser)

   

    const [signIn , setSignIn] = useState(false);
    const [error, setError] = useState<FormError>([null, '']);
    const [logVariable , setLogVariable] = useState({
        email: 'ale@gmail.com',
        password: 'Ale',
    })

    const [singVariable , setSingVariable] = useState({
        nome: 'alessio', cognome:'conforto', user:'ale', 
        sign_email:'alessio@gmail.com', sign_password:'Alessio12$', sign_password_c:'Alessio12$'
    })


    async function loginUser(e: any){
        e.preventDefault();

        let resp = await fetch((process.env.REACT_APP_URL_SERVER || '') + '/api/auth/login' ,{
            method: 'POST',
            credentials: 'include',
            headers:[
                ['Accept', "application/json"],
                ["Content-Type", "application/json"],
                ["Access-Control-Allow-Credentials", '*'],
            ],
            body: JSON.stringify(logVariable)
        })

        let date = await resp.json();
    
        if(date.success){
            handlerLogin({email: date.user.email , id:date.user._id , user:date.user.usn , rt: date.rt})

        }else{
            setError([date.err , date.msg])
        }
    }

    async function signUser(e: any){
        e.preventDefault();

        //la password rispecchia tutti i canoni
        let passReg = new RegExp(/^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\d)(?=.*[!#$%&?"]).*$/)
        if(!singVariable.sign_password.match(passReg)) return setError(['sign_password', 'assicurati che la password è lunga almeno otto caratteri , abbia almeno una lettera maiuscola , un numero e un simbolo ( !#$%&?" )'])
        if(singVariable.sign_password !== singVariable.sign_password_c) return setError(['sign_password_c' , 'la conferma della password non coincide'])


        //nome e cognome rispecchiano solo lettere
        let onlyLetter = new RegExp(/^[a-zA-Z]+$/)
        if(!singVariable.nome.match(onlyLetter)) return setError(['nome' , 'il nome deve essere composto solo da lettere'])
        if(!singVariable.cognome.match(onlyLetter)) return setError(['cognome' , 'il cognome deve essere composto solo da lettere'])







        let resp = await fetch((process.env.REACT_APP_URL_SERVER || '') + '/api/user/sign' ,{
            method: 'POST',
            headers:[
                ['Accept', "application/json"],
                ["Content-Type", "application/json"],
                ["Access-Control-Allow-Credentials", '*'],
            ],
            body: JSON.stringify({
                name: {f: singVariable.nome , l: singVariable.cognome},
                usn: singVariable.user,
                email: singVariable.sign_email,
                pas: singVariable.sign_password
            })
        })

        let date = await resp.json();
    
        if(date.err){
            if(date.statusCode === 400) return alert(date.err)
            setError([date.err, date.msg])
        }else{
            alert('utente creato con successo!')
            setSignIn(false)
        }
    }

    return (
        <div className={`box-form_flip ${signIn ? 'second' : 'first'}`}>
            <div className="form_flip form_first">
                <form className="form" onSubmit={loginUser}>
                    <Input name='email' variable={[logVariable, setLogVariable]}
                        error={[error, setError]}
                        inputProp={{minLength: 3 , type:'email' , autoComplete:'email'}} 
                    />
                    <Input name="password" variable={[logVariable, setLogVariable]}
                        error={[error, setError]}
                        inputProp={{minLength:3 , type:'password' , autoComplete:'current-password'}} 
                    />

                    <div className="box-btn">
                        <button type="submit">invio</button>
                        <button type="button" onClick={() => setSignIn(true)}>registrati</button>
                   </div>
                </form>
            </div>
           


            <div className="form_flip form_second">
                <form className="form second" onSubmit={signUser}>
                    <Input name="nome" variable={[singVariable , setSingVariable]} 
                        inputProp={{minLength:3 , type:'text' , maxLength:24 , autoComplete:'given-name'}} 
                        error={[error, setError]}
                    />
                    <Input name="cognome" variable={[singVariable , setSingVariable]}
                        inputProp={{minLength:3 , type:'text' , maxLength:24 , autoComplete:'family-name'}} 
                        error={[error, setError]}
                    />
                    <Input name="user" variable={[singVariable , setSingVariable]}
                        inputProp={{minLength:3 , type:'text' , maxLength:24 , autoComplete:'username'}} 
                        error={[error, setError]}
                    />


                    <Input name='sign_email' variable={[singVariable , setSingVariable]}
                        inputProp={{minLength: 3 , type:'email' , maxLength:32 , autoComplete:'email'}} 
                        error={[error, setError]}
                    />

                    <Input name="sign_password" variable={[singVariable , setSingVariable]}
                        inputProp={{minLength:3 , type:'password' , maxLength:32 , autoComplete:'current-password'}} 
                        error={[error, setError]}
                    />

                    <Input name="sign_password_c" variable={[singVariable , setSingVariable]}
                        inputProp={{minLength:3 , type:'password' , maxLength:32 , autoComplete:'new-password'}} 
                        error={[error, setError]}
                    />

                    <div className="box-btn">
                        <button type="submit">invio</button>
                        <button type="button" onClick={() => setSignIn(false)}>login</button>
                    </div>
                    
                </form>
            </div>
        </div>
    )






}