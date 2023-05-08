import React, {FC, KeyboardEvent, SyntheticEvent, useEffect, useState} from "react";
import {ButtonGroup, TextField, Grid, Alert} from "@mui/material";
import {IUserData} from "../../../type";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {useAuth} from "../../providers/UseAuth";
import {useNavigate} from "react-router-dom";
import {setDoc,  doc} from "firebase/firestore";
import Button from "../../ui/Button/Button";

const Auth: FC = () => {

  let navigate = useNavigate();
  const handleClick = () => {
    navigate('/')
  }



  const [isRegister, setIsRegister] = useState(false)

  const {ga, user, db} = useAuth()

  const [isRegForm, setIsRegForm] = useState(false)
  const [error, setError] = useState('')
  const [userData, setUserData] = useState<IUserData>({
    email: '',
    password: '',
    name: ''
  })

  const loginHandler = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (isRegForm) {
      try {
       const res =  await createUserWithEmailAndPassword(ga, userData.email, userData.password)

        await updateProfile(res.user, {
          displayName: userData.name
        })
        await setDoc(doc(db, 'users',`${res.user.uid}` ), {
          _id: res.user.uid,
          name: userData.name,
          age: '',
          city: '',
          friends: []
        })

      } catch (error: any) {
        error.message && setError(error.message)
      }

    } else {

      try {
        await signInWithEmailAndPassword(ga, userData.email, userData.password)

      } catch (error: any) {
        error.message && setError(error.message)
      }

    }

    setUserData({
      email: '',
      password: '',
      name: ''
    })
  }



  useEffect(  () => {
    if (user) {
      handleClick()
    }
  }, [user])

  return (
      <>
        {error && <Alert severity="error" style={{marginBottom: 20}}>{error}</Alert>}
        <Grid display='flex' justifyContent='center' alignItems='center'>
          <form onSubmit={loginHandler}>
            {isRegister &&
                <TextField type='text' label='FIO' variant='outlined' value={userData.name}
                           onChange={e => setUserData({...userData, name: e.target.value})}
                           sx={{display: 'block', marginBottom: 3}}
                           required
                />}
            <TextField type='email' label='Email' variant='outlined' value={userData.email}
                       onChange={e => setUserData({...userData, email: e.target.value})}
                       sx={{display: 'block', marginBottom: 3}}
                       required
            />
            <TextField type='password' label='Password' variant='outlined' value={userData.password}
                       onChange={e => setUserData({...userData, password: e.target.value})}
                       sx={{display: 'block', marginBottom: 3}}
                       required
            />

            <ButtonGroup variant='outlined'>
              {isRegister ?
                  <>
                    <Button onClick={() => setIsRegister(false)} text={'Back'}/>
                    <Button isSubmit={true} onClick={() => setIsRegForm(true)} text={'Register'}/>
                  </>
                  : <>
                    <Button isSubmit={true} onClick={() => setIsRegForm(false)} text={'Auth'}/>
                    <Button onClick={() => setIsRegister(true)}  text={'Register'}/>
                  </>
              }
            </ButtonGroup>

          </form>
        </Grid>
      </>

  )
}
export default Auth
