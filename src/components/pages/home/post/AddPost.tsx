import React, {FC, useState, KeyboardEvent, useEffect, SyntheticEvent} from "react";
import {Alert, Box, Button, TextField} from "@mui/material";

import {useAuth} from "../../../providers/UseAuth";
import {setDoc, doc} from 'firebase/firestore'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from "firebase/storage";
import CameraAltOutlinedIcon from '@mui/icons-material/CameraAltOutlined';


interface IAddPost {
}


const AddPost: FC<IAddPost> = () => {

  const date = new Date()

  const {user, db} = useAuth()

  const [error, setError] = useState(false)

  const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря']

  const [content, setContent] = useState<string>('')

  const [file, setFile] = useState('')
  const [per, setPer] = useState(0)
  const [url, setUrl] = useState('')
  useEffect(() => {
    const upLoadFile = () => {
      const storage = getStorage();
      // @ts-ignore
      const storageRef = ref(storage, file.name);

      // @ts-ignore
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on('state_changed',
          (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setPer(progress)
            switch (snapshot.state) {
              case 'paused':
                console.log('Upload is paused');
                break;
              case 'running':
                console.log('Upload is running');
                break;
              default:
                break;
            }
          },
          (error) => {
            console.log(error)
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              // @ts-ignore
              setUrl(downloadURL)
            });
          }
      );

    }

    file && upLoadFile()
  }, [file])

  const addPostHandler = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (content.length === 0) {

    } else {
      if (user) {

        try {
          await setDoc(doc(db, `posts-${user._id}`, `${user._id}-${date.getDay()} ${monthNames[date.getMonth()]} в ${date.getHours()}:${date.getMinutes()}`), {
            author: user._id,
            content,
            createdAt: `${date.getDay() + 7} ${monthNames[date.getMonth()]} в ${date.getHours()}:${date.getMinutes()}`,
            liked: 0,
            images: url
          })
        } catch (e: any) {
          setError(e)
          console.log(e)
        }

        setContent('')
      }
    }
  }

  return (
      <>
        {error && <Alert severity='error' style={{marginBottom: 20}}> {error} </Alert>}
        <Box sx={{
          marginBottom: '7px',
          display: 'flex',
          justifyContent: 'left',
          alignItem: 'center',
          flexDirection: 'column'
        }}>
          <form onSubmit={addPostHandler}>
            <Button component="label" sx={{margitRight: '15px'}}>
              Прикрепить фото
              <CameraAltOutlinedIcon/>
              <input hidden accept="image/*" type="file"
                  // @ts-ignore
                     onChange={(e) => setFile(e.target.files[0])}/>
            </Button>
            <TextField
                label='Что у Вас нового?'
                variant='outlined'
                InputProps={{
                  sx: {borderRadius: '15px', backgroundColor: 'white'}
                }}
                sx={{
                  width: '100%'
                }}
                onChange={e => setContent(e.target.value)}
                value={content}

            />
            <div style={{marginTop: 10}}>

              <Button variant="outlined" type={"submit"} disabled={per !== 0 && per < 100}
              > Добавить новость </Button>
            </div>
          </form>
        </Box>
      </>

  )
}
export default AddPost
