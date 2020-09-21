import React from 'react';
import styles from '../styles/Modal.module.css';

const Modal = (props) => {
  return (
    <div className={styles['modal']}>
      <div className={styles['details']}>
        {props.children}
      </div>
    </div>
  )
}

export default Modal;