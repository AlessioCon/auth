import React from "react"
import './input.css';



type option = {
    name: string,   //name dell' id input
    variable: [string | number | {[index: string] : string | number}  , React.Dispatch<React.SetStateAction<any>>] // variabile da cambiare + setVariabile
    label?: string, //se non è inserita una label usa il name (che server per l'id)
    inputProp?: {
        type: string,
        [index: string] : string | number
    } //'propietà dell'input
    error?: [[string | null , string] , React.Dispatch<[string | null , string]>]
    //send?: ((e: any) => void) | boolean
}


export default function Input(props : option){
    let {name , label, inputProp} = props;
    let [variable , setVariable] = props.variable
    let [error , setError] = props.error || [[null , null], null]

   
    //controlla se il valore è un cheked o no
    let isChecked = false
    if(inputProp){
        switch(inputProp.type){
            case 'checkbox':
            case 'radio':
                isChecked = true
                break
        }
    }

    let isError = (error[0] === name)

    function errorHtml(){
        if(error[0] !== name) return;
        
        return( 
        <div className="input-error">
            <p id={`${name}-input_error`} >{error[1]}</p>
        </div>)
    }
    
    return (
    <div className="box-input">
        <label htmlFor={name}>{label || name}</label>
        <input id={name} name={name} {...inputProp} value={typeof variable === 'object' ? variable[name] : variable}
            aria-invalid={isError ? true : false} aria-describedby={isError ? name+'-input_error' : undefined}
            onChange={e => {
                if(isError){ setError && setError([null , ''])}
                if(typeof props.variable[0] === 'object'){
                    props.variable[1]((prevState : object) => ({...prevState , [name]: isChecked ? e.target.checked.toString() : e.target.value}))
                }else{
                    props.variable[1](isChecked ? e.target.checked.toString() : e.target.value)
                }
                
            }}
        />
        {error && errorHtml()}
    </div>)

}



/*
export default function Input(props : option){
   
    const [variabile, setVariabile] = props.variable // variabile da cambiare
    const name = props.name //name dell' id input
    const label= props?.label || props.name //se non è inserita una label usa il name (che server per l'id)
    const propInput = props.propInput  //'propietà dell'input

    let send = props.send || false
    
    let [error, setError] = [false , false]
    if(props.error?.[0]?.type  === name) [error, setError] = props.error

    let input: string | ReactElement = ""
    let btn  : string | ReactElement = ""

    if(send){
        btn = <button title={name} onClick={e => {e.preventDefault() ; send(e)}}>invia</button>
    }

    switch(propInput?.type){
        case 'tel':
            input = 
                <div className="cont-input">
                    <div className={'box-input'} keys={"input"+name}>
                        <label htmlFor={name}>{label}</label>
                        <input name={name} id={name}  placeholder=' ' {...propInput}
                            aria-invalid={error ? true : false} aria-describedby={error ? name+'-error-msg' : false}
                            value={props.objectDati ? (variabile[name] ?? '') : (variabile ?? '')}
                            onChange={e => {
                                if(error) setError(false);
                                let valFilter = [...e.target.value.replace(/[^0-9]/g, '')];
                                if(valFilter.length > 3)   valFilter.splice(3,0,' ')
                                if(valFilter.length > 7)   valFilter.splice(7,0,' ')
                                let final = valFilter.toString().replaceAll(',' ,'') 
                                if(valFilter.length > 12) final = [...valFilter].splice(0, 12).toString().replaceAll(',', '')

                                if(props.objectDati){
                                    setVariabile(prevState => { return {...prevState, [name]: final}})
                                }else{
                                    setVariabile(final);
                                }
                            }}
                        />
                        {btn}
                    </div>
                    {error && error.msg}
                </div>
            
            break
        case 'text':
        case 'email':
        case 'password':
        case 'date':
        case 'number':
            input = 
                <div className="cont-input">
                    <div className={'box-input'} keys={"input"+name}>
                            <label htmlFor={name}>{label}</label>
                            <input name={name} id={name}  placeholder=' ' {...propInput}
                                aria-invalid={error ? true : false} aria-describedby={error ? name+'-error-msg' : false}
                                value={props.objectDati ? (variabile[name] ?? '') : (variabile ?? '')}
                                onChange={e => {
                                    if(error) setError(false);
                                    if(props.objectDati){
                                        setVariabile(prevState => { return {...prevState, [name]: e.target.value}})
                                    }else{
                                        setVariabile(e.target.value);
                                    }
                                }}
                            />
                            {btn}
                    </div>
                    {error && error.msg}
                </div>
            break
    }
    
    return input
}*/


//esempio
//<Input 
//    name='username'
//    label='user' 
//    objectDati = {true}  || scompone la variabile se è un oggetto 
//    variabile={[username, setUserName]} 
//    propInput={{type: 'text', minLength:3 ,maxLength:15, required:true }}
//    send = una funzione // indica se è un input capacie di inviare il suo dato al server
///>