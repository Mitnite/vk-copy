import {Dispatch, SetStateAction} from "react";
import {OverridableComponent} from "@mui/material/OverridableComponent";
import {SvgIconTypeMap} from "@mui/material";

export type TypeSetState<T> = Dispatch<SetStateAction<T>>

export interface IFriend{
  friendId: string
}

export interface IUser {
  _id: string
  name: string
  avatar?: string
  age?: string
  city?: string
  friends?: IFriend[]
}

export interface IPost {
  author: string
  createdAt: string
  content: string
  images?: string,
  liked: number
}

export interface IMenuItem {
  title: string
  link: string
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

export interface IUserData {
  email: string
  password: string
  name: string
}

export interface ChildrenProps {
  children?: any
}

export interface IButton{
  text: string
  onClick?: any
  isSubmit?: boolean
  isDisabled?: boolean
  disabled?: number
}


