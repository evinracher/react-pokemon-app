import React from 'react';
import { SyncLoader } from 'react-spinners'
import styles from '../../styles/Details.module.css';
import { getClassNames } from '../../Utils';

const RequestInfo = (props) => {
  const handleClick = () => {
    props.close();
  }
  return (
    <div className={styles['request-container']}>
      <button
        className={getClassNames(styles, ['button--close', 'request__button'])}
        onClick={handleClick}
      >
        x
      </button>
      <div className={styles['request-info']}>
        {props.error
          ? (
            <div>
              <h2>Not found</h2>
            </div>
          )
          : (
            <div className={styles['loader']} >
              <h2>Loading...</h2>
              <SyncLoader />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default RequestInfo;