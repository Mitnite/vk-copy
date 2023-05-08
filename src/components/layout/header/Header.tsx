import React, {FC, useState} from "react";
import logo from './vk-logo.png'
import {Search} from '@mui/icons-material'
import styles from './Header.module.css'
import {useNavigate} from "react-router-dom";
import User from "./User";
import {useAuth} from "../../providers/UseAuth";


const Header: FC = () => {

  let navigate = useNavigate();
  const handleClick = () => {
    navigate('/')
  }

  const [search, setSearch] = useState('')


  const {user} = useAuth()

  return (
      <header className={styles.header}>
        <div style={{display: 'flex', justifyContent: 'left', width: '75%'}}>
          <div className={styles['image-wrapper']} onClick={handleClick}>
            <img src={logo} alt=""/>
            <span>ВКОНТАКТЕ</span>
          </div>
          {user &&
              <div className={styles.wrapper}>
                {search.length === 0 &&
                    <Search/>
                }
                <input type={"text"} placeholder={'Поиск'} value={search} onChange={e => setSearch(e.target.value)}/>

              </div>
          }
        </div>
        {user &&
            <User/>}
      </header>
  )
}
export default Header
