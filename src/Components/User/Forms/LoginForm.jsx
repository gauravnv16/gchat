import { useRef, useState } from "react";
import { auth, provider } from "../../../config/firebase"
import {  signInWithPopup, signInWithEmailAndPassword} from "firebase/auth"
import UserInput from "./components/UserInput";

// eslint-disable-next-line react/prop-types

export function LoginForm(){
    const email = useRef(null);
    const password = useRef(null);

    const SignIn = async(e)=> {
        try{
            e.preventDefault();
            await signInWithEmailAndPassword(auth, e.target[0].value, e.target[1].value);
        }catch(err){
            console.log(err);
        }
    }

    const GoogleSignIn = async(e)=> {
       try{
            e.preventDefault();
            await signInWithPopup(auth, provider);
       }catch(err){
            console.log(err);
        }
    }

    return (
        <main className="flex items-center justify-center">
            <form className="p-3 flex flex-col" onSubmit={SignIn} style={{
            maxWidth:"400px",
            minWidth:"300px",
        }}>
        <h1 className="text-2xl">
           Login
        </h1>
            <UserInput
                name="Email address"
                type="email"
                placeholder="Email"
                disText="we wont share your email with anyone"
                onChage={(e)=>{
                    email.current = e.target.value
                }}
            />
            <UserInput
                name="Password"
                type="password"
                placeholder="Password"
                disText=""
                onChage={(e)=>{
                    password.current = e.target.value
                }
                }
            />

        <p className="text-sm text-gray-500 my-2">Forgot password? <a href="/forgot" className="text-blue-500">Reset</a></p>
        <button className="bg-blue-500 text-white rounded block px-3 py-2 mt-3">Login</button>
        <p className="text-sm text-gray-500 mt-2">Don't have an account? <a href="/signup" className="text-blue-500">Sign up</a></p>

        <p className="text-sm text-gray-500 mt-2">Or</p>
        <section className="">
            <button className="border-2 border-gray-300 block px-3 py-2 mt-2 flex items-center" onClick={GoogleSignIn}>
                <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google" className="w-10 h-10"/>
            </button>
        </section>
        </form>
        </main>
    )
}