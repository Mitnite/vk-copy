import React, {FC, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {Avatar, Box, ImageListItem} from "@mui/material";
import {IPost, IUser} from "../../../../type";
import {collection, onSnapshot} from "firebase/firestore";
import {useAuth} from "../../../providers/UseAuth";
import styles from './Post.module.css'

interface PostProps {
  post: IPost,
}

const Post: FC<PostProps> = ({post}) => {

  const [userId, setUserId] = useState<IUser>()

  const {db} = useAuth()

  const [isLiked, setIsLiked] = useState(false)

  const [error, setError] = useState()

  useEffect(() => {
    const unsubUser = onSnapshot(collection(db, 'users'), doc => {
      const array: any = []
      doc.forEach((d: any) => {
        if (d.data()._id === post.author)
          array.push(d.data())
      })
      setUserId(array[0])
    })
    return () => {
      unsubUser()
    }
  }, [])

  const addLikeHandler = async () => {
    setIsLiked(!isLiked)
/*    let like
    if (!isLiked) like = post.liked + 1
    else like = post.liked - 1
    try {
        await setDoc(doc(db, `posts-${post.author}`, `${post.author}-${post.createdAt}`), {
        author: post.author,
        content: post.content,
        createdAt: post.createdAt,
        liked: like,
        images: post.images
      })

    } catch (e: any) {
      setError(e)
      console.log(e)
    }*/
  }


  return (
      <>
        {userId &&
            <>
              <Link to={`/profile/${userId._id}`} key={userId?._id} style={{
                display: 'flex',
                alignItems: 'center',
                textDecoration: "none",
                color: '#111',
                marginBottom: 12
              }}>
                <Box sx={{
                  position: 'relative',
                  marginRight: 2,
                  overflow: 'hidden',
                  width: 50,
                  height: 50
                }}>
                  <Avatar src={userId.avatar} alt="avatar"
                          sx={{width: 46, height: 46, borderRadius: '50%'}}
                  />

                </Box>
                <div>
                  <div style={{fontSize: 14}}>{userId.name}</div>
                  <div style={{fontSize: 14, opacity: '.6'}}>{post.createdAt}</div>
                </div>

              </Link>

              <p>{post.content}</p>
              {post.images?.length ? (
                  <ImageListItem sx={{marginBottom: 2, width: 350, height: 350}}>
                    <img src={post.images} alt=""
                         loading='lazy'
                    />
                  </ImageListItem>

              ):null}


              <div className={styles.addLike}>
                <div className={isLiked ? styles.liked : styles.like} onClick={addLikeHandler}/>
                <span>{isLiked ? `${post.liked+1}` : post.liked}</span>
              </div>
            </>
        }
      </>

  )
}
export default Post
