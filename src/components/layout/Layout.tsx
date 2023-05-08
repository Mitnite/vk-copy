import React, {FC, PropsWithChildren} from "react";
import Header from "./header/Header";
import SideBar from "./sidebar/SideBar";
import {Grid} from "@mui/material";
import {ChildrenProps} from "../../type";
import {useAuth} from "../providers/UseAuth";

const Layout: FC<PropsWithChildren<ChildrenProps>> = ({children}) => {

  const {user} = useAuth()

  return (
      <>
        <Header/>
        <Grid container  sx={{maxWidth: '1440px', margin: '75px auto'}}>
          <Grid item md={1}/>
          {user &&
              <Grid item md={2}>
                <SideBar/>
              </Grid>
          }
          <Grid item md={user ? 8 : 12}>
            {children}
          </Grid>
          <Grid item md={1}/>

        </Grid>
      </>
  )
}
export default Layout
