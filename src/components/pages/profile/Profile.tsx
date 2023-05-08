import React, {FC, SyntheticEvent, useEffect, useState} from "react";
import Container from "../../ui/Container/Container";
import {useParams} from "react-router-dom";
import {onSnapshot, collection, doc, setDoc} from "firebase/firestore";
import {useAuth} from "../../providers/UseAuth";
import {IPost, IUser} from "../../../type";
import Post from "../home/post/Post";
import AddPost from "../home/post/AddPost";
import {Alert, Avatar, IconButton, TextField} from "@mui/material";
import Button from "../../ui/Button/Button";
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {users} from "../../layout/sidebar/dataUsers";
import { PhotoCamera } from "@mui/icons-material";

const Profile: FC = () => {

  const {id} = useParams()
  const {db, user, currentUser} = useAuth()

  const [userId, setUserId] = useState<IUser>()
  const [posts, setPosts] = useState<IPost[]>()
  const [error, setError] = useState('')
  const [isFriend, setIsFriend] = useState(false)
  const [per, setPer] = useState(0)
  const [file, setFile] = useState("")

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
              setUserId(prev => ({...prev, avatar: downloadURL}))
            });
          }
      );

    }

    file && upLoadFile()
  }, [file])

  useEffect(() => {
    const unsubUser = onSnapshot(collection(db, 'users'), doc => {
      const array: any = []
      let counter = 0
      doc.forEach((d: any) => {
        if (d.data()._id === id)
          array.push(d.data())
      })
      currentUser?.friends?.forEach((friendId: any) => {
        if (array[0]._id === friendId) {
          setIsFriend(true)
          counter = 1
        }
      })
      if (counter === 0) setIsFriend(false)
      setUserId(array[0])
    })
    const unsubPost = onSnapshot(collection(db, `posts-${id}`), doc => {
      const array: IPost[] = []
      doc.forEach((d: any) => {
        array.push(d.data())
      })
      setPosts(array)
    })


    return () => {
      unsubUser()
      unsubPost()
    }
  }, [id, currentUser])

  const editUserHandler = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await setDoc(doc(db, 'users', `${id}`), {
        _id: id,
        name: userId?.name,
        age: userId?.age,
        city: userId?.city,
        friends: userId?.friends,
        avatar: userId?.avatar
      })

    } catch (error: any) {
      error.message && setError(error.message)
    }

  }

  const editFriendHandler = async (arrayFriends: any) => {
    try {
      await setDoc(doc(db, 'users', `${currentUser?._id}`), {
        _id: currentUser?._id,
        name: currentUser?.name,
        age: currentUser?.age,
        city: currentUser?.city,
        friends: arrayFriends,
        avatar: currentUser?.avatar

      })

    } catch (error: any) {
      error.message && setError(error.message)
    }
  }

  const deleteFriendHandler = async () => {
    const arrayFriends: any = []
    currentUser?.friends?.forEach((friendId: any) => {
      if (friendId !== id) arrayFriends.push(friendId)
    })
    await editFriendHandler(arrayFriends)
  }

  const addFriendHandler = async () => {
    const arrayFriends: any = []
    currentUser?.friends?.forEach((friendId: any) => {
      arrayFriends.push(friendId)
    })
    arrayFriends.push(id)
    await editFriendHandler(arrayFriends)

  }

  return (
      <>
        <Container>
          {error && <Alert severity="error" style={{marginBottom: 20}}>{error}</Alert>}
          {user?._id === id ?
              <div style={{display: "flex", justifyContent: 'left', alignItems: "center"}}>
                <Avatar src={userId?.avatar} alt="avatar"
                        sx={{width: 146, height: 146, borderRadius: '50%'}}
                />
                <div style={{marginLeft: 50}}>
                  {userId &&
                      <>
                        <form onSubmit={editUserHandler}
                              style={{display: "flex", justifyContent: 'center', alignItems: "center"}}>
                          <div>

                            <div>
                              <IconButton color="primary" aria-label="upload picture" component="label">
                                <input hidden accept="image/*" type="file"
                                    // @ts-ignore
                                       onChange={(e) => setFile(e.target.files[0])}
                                />
                                <PhotoCamera />
                              </IconButton>
                            </div>
                            <TextField
                                label='Ваши ФИО'
                                variant='outlined'
                                required
                                InputProps={{
                                  sx: {borderRadius: '15px', backgroundColor: 'white'}
                                }}
                                sx={{
                                  width: '75%'
                                }}
                                value={userId.name}
                                onChange={e => setUserId({...userId, name: e.target.value})}
                            />
                            <TextField
                                label='Ваш возраст'
                                variant='outlined'
                                InputProps={{
                                  sx: {borderRadius: '15px', backgroundColor: 'white'}
                                }}
                                sx={{
                                  width: '75%', marginTop: '15px'
                                }}
                                value={userId?.age}
                                onChange={e => setUserId({...userId, age: e.target.value})}
                            />
                            <TextField
                                label='Ваш город'
                                variant='outlined'
                                InputProps={{
                                  sx: {borderRadius: '15px', backgroundColor: 'white'}
                                }}
                                sx={{
                                  width: '75%', marginTop: '15px'
                                }}
                                value={userId?.city}
                                onChange={e => setUserId({...userId, city: e.target.value})}
                            />
                          </div>
                          <div style={{display: 'block', margin: '0 auto'}}>
                            <Button text={'Изменить'} isSubmit={true} isDisabled={true} disabled={per}/>

                            {/*<button  disabled={per !== 0 && per < 100} type={"submit"}>Изменить</button>*/}

                          </div>
                        </form>
                      </>


                  }
                </div>
              </div>
              :
              <div style={{display: "flex", justifyContent: 'left'}}>
                <Avatar src={userId?.avatar} alt="avatar"
                        sx={{width: 146, height: 146, borderRadius: '50%'}}
                />
                <div style={{marginLeft: 25}}>
                  {userId &&
                      <div>
                        <div style={{fontSize: '22px'}}>{userId.name}</div>
                        <div style={{marginTop: 12}}>Возраст: {userId.age}</div>
                        <div style={{marginTop: 12, marginBottom: 12}}>Город: {userId.city}</div>

                        {isFriend ?
                            <Button text={'Удалить из друзей'} onClick={deleteFriendHandler}/>
                            : <Button text={'Добавить в друзья'} onClick={addFriendHandler}/>}

                      </div>
                  }
                </div>
              </div>
          }

        </Container>
        <Container>

          {user?._id === id ? <AddPost/> : null}

          {posts && posts.map((post, index) => (

              <Post post={post} key={index}/>

          ))}

        </Container>
      </>
  )
}
export default Profile
