import React, {FC} from "react";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import {menu} from './dataMenus'
import {useNavigate} from "react-router-dom";
import {useAuth} from "../../../providers/UseAuth";
import Container from "../../../ui/Container/Container";

const MenuItems: FC = () => {

  let navigate = useNavigate();
  const handleClick = (link:string) => {
    navigate(link)
  }

  const {user} = useAuth()

  return (
      <Container isDark={true}>
        <List sx={{padding: 0}}>
          {menu.map(item => (
                <ListItem disablePadding key={`${item.title}`}>
                  <ListItemButton onClick={() => handleClick(item.link === '/profile' ? `${item.link}/${user?._id}` : `${item.link}`)}>
                    <ListItemIcon sx={{minWidth: 36}}>
                      <item.icon />
                    </ListItemIcon>
                    <ListItemText primary={item.title}/>
                  </ListItemButton>
                </ListItem>
            )
          )}
        </List>
      </Container>
  )
}
export default MenuItems
