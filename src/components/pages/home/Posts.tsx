import React, {FC, useLayoutEffect, useState} from "react";
import {IPost} from "../../../type";
import {useAuth} from "../../providers/UseAuth";
import {onSnapshot, collection} from 'firebase/firestore'
import Container from "../../ui/Container/Container";
import Post from "./post/Post";


const Posts: FC = () => {


  const [posts, setPosts] = useState<IPost[]>([])

  const {db, currentUser} = useAuth()


  useLayoutEffect(() => {


    const unsub = (way: string) => onSnapshot(collection(db, `posts-${way}`), doc => {
      doc.forEach((d: any) => {
        setPosts(prev => [d.data(), ...prev])
      })
    })
    currentUser?.friends?.forEach((friendId: any) => {
      unsub(friendId)
    })

  }, [])


  return (

      <>
        {posts?.length > 0 ? posts.map((post, index) => (
                <Container key={`Post-${index}`}>
                  <Post post={post}/>
                </Container>
            )
        ) : <Container>Новостей пока нет</Container>

        }

      </>
  )
}
export default Posts
