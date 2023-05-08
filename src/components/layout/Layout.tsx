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
        <Grid container spacing={2} paddingX={5} marginTop='7px'>
          {user &&
              <Grid item md={3}>
                <SideBar/>
              </Grid>
          }
          <Grid item md={user ? 9 : 12}>
            {children}
          </Grid>
        </Grid>
      </>
  )
}
export default Layout
