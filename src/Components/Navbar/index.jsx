import { auth } from "../../config/firebase"
function LogOut(){
    auth.signOut();
}
export const NavBar = () => {
    return (
        <nav className="p-2 flex items-center">
            <h1 className="text-xl flex items-center">
                <img src="https://img.icons8.com/fluency/48/000000/chat.png" alt="logo" className="inline-block w-8 h-8 mr-2"/>
                {
                    auth?.currentUser?.uid ? (
                        <a href="/">{auth?.currentUser?.displayName}</a>
                    ):(<a href="/">GlumeChat</a>)
                }
            </h1>
            {
                auth?.currentUser?.uid ? (
                    <button className="ml-auto border-2 border-gray-300 rounded px-3 py-2 text-sm" onClick={LogOut}>Log Out</button>
                ):(
                    <button className="ml-auto border-2 border-gray-300 rounded px-3 py-2 text-sm" onClick={LogOut}>Sign In</button>
                )
            }
        </nav>
    )
}