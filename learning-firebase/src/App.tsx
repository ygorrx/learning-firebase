import "./App.css";
import BookForm from "./components/BookForm";
import Navbar from "./components/Navbar";
import { db } from "./firebaseConnection";
import { collection, addDoc } from "firebase/firestore";
import { ChakraProvider } from "@chakra-ui/react";

function App() {

  async function handleFormSubmit(title: string, author: string) {
    
    await addDoc(collection(db, "posts"), {
      title: title,
      author: author
    })
    .then(() => {
      console.log("dados registrados");
    })
    .catch((error) => {
      console.log("Erro" + error);
    });
    
    // Manual
    /* await setDoc(doc(db, "posts", "12345"), {
      title: title,
      author: author,
    })
      .then(() => {
        console.log("dados registrados");
      })
      .catch((error) => {
        console.log("Erro" + error);
      }); */
  }

  return (
    <ChakraProvider>
      <Navbar></Navbar>
      <BookForm onSubmit={handleFormSubmit}></BookForm>
    </ChakraProvider>
  );
}

export default App;
