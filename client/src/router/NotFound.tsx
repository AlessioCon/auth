import { useEffect } from "react"

export default function Login(){

    useEffect(() => {
        async function signUser(){
    
    
            let resp = await fetch((process.env.REACT_APP_URL_SERVER || '') + '/api/user/profile' ,{
                method: 'GET',
                headers:[
                    ['Accept', "application/json"],
                    ["Content-Type", "application/json"],
                    ["Access-Control-Allow-Credentials", '*'],
                ],
            })
    
            let date = await resp.json();
        }

        signUser()
    })

    return <main>
        <h1>Pagina non trovata</h1>
    </main>
}