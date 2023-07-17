import { useRef, useState } from "react";
import { auth, db, provider } from "../../../config/firebase"
import { createUserWithEmailAndPassword , signInWithPopup,} from "firebase/auth"
import UserInput from "./components/UserInput";
import { addDoc, collection } from "firebase/firestore";

export function RegisterForm(){
    
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);
    const [id, setId] = useState(null);

    const addUser = async ()=>{
        try{
            const userRef = collection(db, "users");
            await addDoc(userRef, {
                name: name.current,
                email: email.current,
                id: id,
                isAdmin: false,
                status: false,
            });
        }catch(err){
            console.log(err);
        }

    }
    const SignIn = async(e)=> {
        e.preventDefault();
        await createUserWithEmailAndPassword(auth, e.target[0].value, e.target[1].value);
        await auth.currentUser.updateProfile({
            displayName: name.current
        });
        setId(auth.currentUser.uid);
        addUser();
    }

    const GoogleSignIn = async(e)=> {
        e.preventDefault();
        await signInWithPopup(auth, provider);
        setId(auth.currentUser.uid);
    }

    return (
        <main className="flex items-center justify-center">
            <form className="p-3 flex flex-col" onSubmit={SignIn} style={{
            maxWidth:"400px",
            minWidth:"300px",
        }}>
        <h1 className="text-2xl">
            Register
        </h1>
            <UserInput
                name="Name"
                type="text"
                placeholder="Name"
                disText=""
                onChage={(e)=>{
                    name.current = e.target.value
                }}
            />
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
        <button className="bg-blue-500 text-white rounded block px-3 py-2 mt-3">Login</button>
        <p className="text-sm text-gray-500 mt-2">Already have an account? <a href="/login" className="text-blue-500">Login</a></p>
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