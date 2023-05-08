import Home from "../pages/home/Home";
import Auth from "../pages/auth/Auth";
import Messages from "../pages/messages/Messages";
import Profile from "../pages/profile/Profile";
import Message from "../pages/messages/Conversation";
import Friends from "../pages/friends/Friends";
import NotFound from "../pages/noFound/NotFound";

export const routes = [
  {
    path: '/',
    component: Home,
    auth: true
  },
  {
    path: '/auth',
    component: Auth,
    auth: true
  },
  {
    path: '/profile/:id',
    component: Profile,
    auth: true
  },
  {
    path: '/messages',
    component: Messages,
    auth: true
  },
  {
    path: '/message/:id',
    component: Message,
    auth: true
  },
  {
    path: '/friends',
    component: Friends,
    auth: true
  }
]