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
    {/* message form */}
    {
      auth.currentUser?.uid && <div className="p-2">
      <form className="flex" onSubmit={sendMessage}>
        <input type="text" placeholder="Message" className="border-2 border-black p-2 flex-1"/>
        <button className="border-2 border-black block px-3 py-2 mt-2">Send</button>
      </form>
    </div>
    }
    {/* messages */}

    {
       auth.currentUser?.uid && messages.length>0 && messages.map((message)=>{
        return (
          <div className="p-2" key={message.id}>
            <p className="text-lg">{message.message}</p>
          </div>
        )
      }
      )
    }
    


    </>
        
  )
}

export default App
