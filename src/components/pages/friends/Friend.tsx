import React, {FC} from "react";
import {Avatar, Box, Card} from "@mui/material";
import {Link} from "react-router-dom";
import {IUser} from "../../../type";
import Button from "../../ui/Button/Button";


interface FriendProps {
  user: IUser,
  isFriend: boolean,
  onClick?: any
}

const Friend: FC<FriendProps> = ({user, isFriend, onClick}) => {

  return (
      <Card variant='outlined' sx={{
        padding: 2,
        backgroundColor: '#F1F7FA',
        border: 'none',
        borderRadius: 3,
        marginBottom: '15px',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to={`/profile/${user._id}`} key={user._id} style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: "none",
          color: '#111',
        }}>
          <Box sx={{
            position: 'relative',
            marginRight: 2,
            overflow: 'hidden',
            width: 50,
            height: 50
          }}>
            <Avatar src={user.avatar} alt="avatar"
                    sx={{width: 46, height: 46, borderRadius: '50%'}}
            />

          </Box>

          <span style={{fontSize: 18}}>{user.name}</span>

        </Link>
          {isFriend ? <Button text={'Удалить из друзей'} onClick={() => onClick(user._id)}/> : <Button text={'Добавить в друзья'} onClick={() => onClick(user._id)}/> }
        </div>

      </Card>
  )
}
export default Friend
