import {createContext, FC, PropsWithChildren, useEffect, useMemo, useState} from 'react'
import {ChildrenProps, IUser, TypeSetState} from "../../type";
import {getAuth, onAuthStateChanged, Auth} from 'firebase/auth'
import {users} from "../layout/sidebar/dataUsers";
import {getFirestore, Firestore, onSnapshot, collection} from 'firebase/firestore'


interface IContext {
  user: IUser | null
  setUser: TypeSetState<IUser | null>
  ga: Auth
  db: Firestore
  currentUser: IUser | null
}



export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider: FC<PropsWithChildren<ChildrenProps>> = ({children}) => {

  const [user, setUser] = useState<IUser | null>(null)
  const [currentUser, setCurrentUser] = useState<IUser | null>(null)

  const ga = getAuth()
  const db = getFirestore()

  useEffect(() => {
    const unListen = onAuthStateChanged(ga, authUser => {
      if (authUser)
        setUser({
          _id: authUser.uid,
          avatar: '',
          name: authUser.displayName || '',
        })
      else {
        setUser(null)
      }
    })
    return () => {
      unListen()
    }
  }, [])

  useEffect(() => {
    const unsubUser = onSnapshot(collection(db, 'users'), doc => {
      const array: any = []
      doc.forEach((d: any) => {
        if (d.data()._id === user?._id)
          array.push(d.data())
      })
      setCurrentUser(array[0])
    })
    return () => {
      unsubUser()
    }
  }, [user])

  const values = useMemo(() => ({
    user,
    setUser,
    ga,
    db,
    currentUser
  }), [ga, currentUser])

  return (
      <AuthContext.Provider value={values}>
        {children}
      </AuthContext.Provider>
  )
}