import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack } from '@chakra-ui/react';
import { doc, getDoc } from "firebase/firestore";
import { db } from "./../firebaseConnection";

interface BookFormProps {
  onSubmit: (title: string, author: string) => void;
}

const BookForm: React.FC<BookFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, author);
    // Reset the form after submission
    setTitle('');
    setAuthor('');
  };

  async function searchPost() {    
    const postRef = doc(db, "posts", "x8lz2hiu3WGbGP3z7nsw")
    await getDoc(postRef).then((snapshot)=> {
        setAuthor(snapshot.data()?.author);
        setTitle(snapshot.data()?.title)
    }).catch(()=> {
        console.log("algum erro")
    })
  }

  return (
    <Box p={4} borderWidth="1px" borderRadius="md">
      <form onSubmit={handleSubmit}>
        <Stack spacing={4}>
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
          <Button type='button' onClick={searchPost} colorScheme='yellow'>
            Search Post
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default BookForm;
