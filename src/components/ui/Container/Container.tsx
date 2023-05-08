import React, {FC, PropsWithChildren} from "react";
import styles from './Container.module.css'

interface ContainerProps{
    isDark?: boolean
    children?: any
}

const Container:FC<PropsWithChildren<ContainerProps>> = ({children, isDark}) => {
    return(
        <div className={isDark ? styles.ContainerDark : styles.Container}>
          {children}
        </div>
    )
}
export default Container
