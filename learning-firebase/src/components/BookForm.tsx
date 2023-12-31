import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  List,
  ListItem,
  ListIcon,
  Divider,
} from "@chakra-ui/react";
import {
  collection,
  getDocs,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "firebase/auth";
import { db, auth } from "./../firebaseConnection";
import { FaRegNoteSticky, FaTrash } from "react-icons/fa6";

interface BookFormProps {
  onSubmit: (title: string, author: string) => void;
}

type ListItens = {
  id: string;
  title: string;
  author: string;
};

type UserValues = {
  uid: string;
  email: string | null;
};

const BookForm: React.FC<BookFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [posts, setPosts] = useState<ListItens[]>([]);
  const [idPosts, setIdPosts] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(false);
  const [userDetail, setUserDetail] = useState<UserValues>();

  useEffect(() => {
    async function checkLogin() {
      onAuthStateChanged(auth, (user) => {
        if(user){
          setUser(true)
          setUserDetail({
            uid: user.uid,
            email: user.email,
          });
        } else {
          setUser(false)
          setUserDetail({uid: '', email: ''})
        }
      })      
    }

    checkLogin()
  }, [])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, author);
    // Reset the form after submission
    setTitle("");
    setAuthor("");
  };

  async function searchPost() {
    const postRef = collection(db, "posts");
    await getDocs(postRef)
      .then((snapshot) => {
        let list: ListItens[] = [];
        snapshot.forEach((doc) => {
          list.push({
            id: doc.id,
            title: doc.data()?.title,
            author: doc.data()?.author,
          });

          setPosts(list);
        });
      })
      .catch(() => {
        console.log("algum erro");
      });
  }

  async function updatePost() {
    const docRef = doc(db, "posts", idPosts);

    await updateDoc(docRef, {
      title: title,
      author: author,
    })
      .then(() => {
        setIdPosts("");
        setTitle("");
        setAuthor("");
        searchPost();
      })
      .catch(() => {
        console.log("Erro");
      });
  }

  async function deletePost(id: string) {
    const docRef = doc(db, "posts", id);

    await deleteDoc(docRef).then(() => {
      searchPost();
    });
  }

  async function registerUser() {
    await createUserWithEmailAndPassword(auth, email, password).then(
      (value) => {
        setEmail("");
        setPassword("");
      }
    );
  }

  async function loginUser() {
    await signInWithEmailAndPassword(auth, email, password).then((value) => {
      setUserDetail({
        uid: value.user.uid,
        email: value.user.email,
      });

      setUser(true);
      setEmail("");
      setPassword("");
    });
  }

  async function logoutUser() {
    await signOut(auth)
    setUser(false)
    setUserDetail({uid: '', email: ''})
  }

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      {user && (
        <div>
          <strong>Welcome!</strong>
          <br />
          <span>
            Id: {userDetail?.uid} - Email: {userDetail?.email}
          </span>
          <br/>
          <Button type="button" onClick={logoutUser} colorScheme="purple">
            Logout
          </Button>
          <br />
          <br />
        </div>
      )}

      <form>
        <Stack spacing={4}>
          <FormControl id="email">
            <FormLabel>E-mail</FormLabel>
            <Input
              type="text"
              placeholder="Enter you e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>
          <Button type="button" onClick={registerUser} colorScheme="blue">
            Register
          </Button>
          <Button type="button" onClick={loginUser} colorScheme="green">
            Login
          </Button>
        </Stack>
      </form>
      <Divider />
      <br />
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
          <FormControl id="id">
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="Enter the Id"
              value={idPosts}
              onChange={(e) => setIdPosts(e.target.value)}
            />
          </FormControl>
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              type="text"
              placeholder="Enter the title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>
          <FormControl id="author" isRequired>
            <FormLabel>Author</FormLabel>
            <Input
              type="text"
              placeholder="Enter the author's name"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
            />
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
          <Button type="button" onClick={searchPost} colorScheme="yellow">
            Search Post
          </Button>
          <Button type="button" onClick={updatePost} colorScheme="red">
            Update Post
          </Button>
          <List spacing={3}>
            {posts.map((post) => {
              return (
                <ListItem key={post.id}>
                  <ListIcon as={FaRegNoteSticky} color="green.500" />
                  <ListItem>
                    <strong>Id:</strong> {post.id}
                  </ListItem>
                  <ListItem>
                    <strong>Title:</strong> {post.title}{" "}
                  </ListItem>
                  <ListItem>
                    <strong>Author:</strong> {post.author}
                  </ListItem>
                  <Button
                    onClick={() => deletePost(post.id)}
                    leftIcon={<FaTrash />}
                    colorScheme="teal"
                    variant="solid"
                    size="xs"
                  >
                    Delete Post
                  </Button>
                </ListItem>
              );
            })}
          </List>
        </Stack>
      </form>
    </Box>
  );
};

export default BookForm;
