import React, {FC, useEffect, useState} from "react";
import Container from "../../ui/Container/Container";
import {useAuth} from "../../providers/UseAuth";
import {collection, doc, onSnapshot, setDoc} from "firebase/firestore";
import {IUser} from "../../../type";
import Friend from "./Friend";
import {Alert} from "@mui/material";

const Friends: FC = () => {

  const [usersID, setUsersId] = useState<IUser[] | null>()

  const [friendId, setFriendId] = useState<IUser[] | null>()

  const {db, currentUser} = useAuth()

  const [error, setError] = useState(false)

  useEffect(() => {
    const unsubUser = onSnapshot(collection(db, 'users'), doc => {
      const array: any = []
      const arrayFriends: any = []
      let arrayUsers: any = []

      if (currentUser?.friends && currentUser?.friends?.length > 0) {
        doc.forEach((d: any) => {
          currentUser?.friends?.forEach((friendId: any) => {
            if (d.data()._id === friendId) {
              arrayFriends.push(d.data())
            }
          })
        })

        doc.forEach((d: any) => {
            if (d.data()._id !== currentUser?._id) {
              array.push(d.data())
            }
        })

        arrayUsers = array.filter((person_A:any) => !arrayFriends.some((person_B: any) => person_A.name === person_B.name));

      } else {
        doc.forEach((d: any) => {
          if (d.data()._id !== currentUser?._id) arrayUsers.push(d.data())
        })
      }
      setUsersId(arrayUsers)
      setFriendId(arrayFriends)
    })

    return () => {
      unsubUser()
    }
  }, [currentUser])

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

  const deleteFriendHandler = async (id: string) => {
    const arrayFriends: any = []
    currentUser?.friends?.forEach((friendId: any) => {
      if (friendId !== id) arrayFriends.push(friendId)
    })
    await editFriendHandler(arrayFriends)
  }

  const addFriendHandler =  async (id: string) => {
    const arrayFriends: any = []
    currentUser?.friends?.forEach((friendId: any) => {
      arrayFriends.push(friendId)
    })
    arrayFriends.push(id)
    await editFriendHandler(arrayFriends)

  }

  return (
      <Container>
        {error && <Alert severity="error" style={{marginBottom: 20}}>{error}</Alert>}
        <h2> Ваши друзья</h2>
        {friendId && friendId.map((friend, index) => (
            <Friend key={index} user={friend} isFriend={true} onClick={(id: string) => deleteFriendHandler(id)}/>
        ))}

        <h2>Поиск по людям</h2>
        {usersID && usersID.map((user, index) => (
            <Friend key={index} user={user} isFriend={false} onClick={(id: string) => addFriendHandler(id)}/>
        ))}
      </Container>
  )
}
export default Friends
