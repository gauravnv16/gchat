import { useEffect, useState } from 'react';
import './App.css'
import { LoginForm } from './Components/User/Forms/LoginForm'
import { auth, database, db } from './config/firebase'
import { collection, getDocs,addDoc,deleteDoc, doc } from 'firebase/firestore';
import { NavBar } from './Components/Navbar';
import { RegisterForm } from './Components/User/Forms/RegisterForm';
import { child, get, onValue, ref, set } from 'firebase/database';

function App() {
  const [messages, setMessages] = useState([]);


  const getDateTime = () => `${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`;

  const sendMessage = async(e)=>{
    e.preventDefault();
    console.log(e.target[0].value);
    const mId = crypto.randomUUID().toString();
    try{
      set(ref(database, `messages/${mId}`), {
        id: mId,
        from: auth.currentUser.uid,
        to: "1",
        message: e.target[0].value,
        timestamp: getDateTime(),
      });




      

    } catch(err){
      console.log(err);
    }

  }

  const DeleteDoc = async(id)=>{
    try{
      const docRef = doc(db,"Chats",id);
      await deleteDoc(docRef);
    } catch(err){
      console.log(err);
    }
    // console.log(id);
  }

  try{
    const dbRef = ref(database);
    get(child(dbRef, `messages`)).then((snapshot) => {
      if (snapshot.exists()) {
        let messages = snapshot.val();
        // convert messages from snapshot to array
        messages = Object.values(messages);
        setMessages(messages);
        // setMessages();
      }
    }).catch((error) => {
      console.error(error);
    });
  } catch(err){
    console.log(err);
  }
  return (
    <>
    <NavBar/>
    { !auth.currentUser?.uid && <LoginForm/>}
    {/* <RegisterForm/> */}
    {/* messages */}
    <div className="p-2" style={{
      position: "fixed",
      // top: "",
      left: "0",
      width: "100%",
      height: "calc(100vh - 100px)",
      overflowY: "scroll",
      display: "flex",
      flexDirection: "column",
    }}>
          {
       auth.currentUser?.uid && messages.length>0 && messages.map((message)=>{
        if(message.from === auth.currentUser.uid)
        return (
          <div className="p-2 bg-gray-300 m-2 w-fit rounded px-3" key={message.id} style={{
            marginLeft: "auto",
          }}>
            <p className="text-lg">{message.message}</p>
          </div>
        )
        return (
          <div className="p-2 bg-gray-300 m-2 w-fit rounded px-3" key={message.id}>
            <p className="text-lg">{message.message}</p>
          </div>
        )
      }
      )
    }
    </div>


    {
      auth.currentUser?.uid && <div className="p-2" style={{
        position: "fixed",
        bottom: "0",
        left: "0",
        width: "100%",
      }}>
      <form className="flex" onSubmit={sendMessage}>
        <input type="text" placeholder="Message" className="border-2 border-black p-2 flex-1"/>
        <button className="border-2 border-black block px-3 py-2 mt-2">Send</button>
      </form>
    </div>
    }
    {/* messages */}


    


    </>
        
  )
}

export default App
