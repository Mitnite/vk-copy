import React, {FC} from "react";
import styles from './Button.module.css'
import {IButton} from "../../../type";


const Button: FC<IButton> = (button) => {
  return (
      <button type={button.isSubmit ? 'submit' : undefined}
              onClick={button.onClick}
              className={styles.Button}
          // @ts-ignore
              disabled={button.isDisabled && button.disabled !== 0 && button.disabled < 100}
      >
        {button.text}
      </button>
  )
}
export default Button
