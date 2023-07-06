import React from "react";
import {useSession, signIn, signOut} from 
'next-auth/react';

const Login = () => {
    const {data:session} = useSession()

    if (session) {
        return (
        <div className="w-60 h-10 text-l text-sky-200">
            <p className="mx-1">Welcome, {session.user.name}</p>
            <button className="w-60 h-8 border-sky-500 border rounded-md" onClick={()=>signOut()}>Sign out</button>
        </div>
        )
    }
    else {
        return (
            <div  className="w-60 h-10 text-l text-sky-200">
                <p className="mx-1">You are not signed in</p>
                <button className="w-60 h-8 border-sky-500 border rounded-md" onClick={()=>signIn()}>Sign in</button>
            </div>
        )
    }
}

export default Login;