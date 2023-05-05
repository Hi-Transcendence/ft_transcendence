import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from 'styles/login/login.module.css';

function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('');
  }, []);

  return (
    <div className={styles.loginContainer}>
      <div className={styles.innerContainer}>
        <img className={styles.title} src="/title.png"></img>
        <a
          href={`${process.env.REACT_APP_SERVERIP}/oauth/42`}
          style={{ textDecoration: 'none' }}
        >
          <text className={styles.text}>로그인</text>
          {/* <input type='button' className={styles.buttons} value='로그인' /> */}
        </a>

        <br />
        <a
          href={`${process.env.REACT_APP_SERVERIP}/oauth/test`}
          style={{ textDecoration: 'none' }}
        >
          <text className={styles.text}>게스트 로그인</text>
          {/* <input type='button' className={styles.buttons} value='게스트 로그인' /> */}
        </a>
      </div>
    </div>
  );
}

export default Login;
