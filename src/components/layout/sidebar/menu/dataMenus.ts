import * as Icons from "@mui/icons-material";
import {IMenuItem} from "../../../../type";


export const menu: IMenuItem [] = [
  {
    title: 'Моя страница',
    link: '/profile',
    icon: Icons.Home
  },
  {
    title: 'Новости',
    link: '/',
    icon: Icons.Article
  },
  {
    title: 'Сообщения',
    link: '/messages',
    icon: Icons.Message
  },
  {
    title: 'Друзья',
    link: '/friends',
    icon: Icons.People
  }

]