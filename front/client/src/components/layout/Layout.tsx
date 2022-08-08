import io from 'socket.io-client';
import { useEffect } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import Nav from 'components/layout/Nav';
import Side from 'components/layout/Side';
import SecondAuth from 'pages/SecondAuth';
import instance from 'utils/axios';
import { myDataState } from 'utils/recoil/myData';
import { loginState } from 'utils/recoil/login';
import { errorState } from 'utils/recoil/error';
import { modalState } from 'utils/recoil/modal';
import { inviteState } from 'utils/recoil/gameState';
import { myData } from 'types/myDataTypes';
import { inviteType } from 'types/GameTypes';
<<<<<<< HEAD
<<<<<<< HEAD
import { errorType } from 'types/errorTypes';
=======
>>>>>>> 857b03e ([Fix - Front] import 및 함수 순서 정리)
=======
>>>>>>> 7d3b217b34a740e26556923abda15016cd9b169b
import 'styles/layout/Content.css';

export let socket = io();

type LayoutProps = {
  children: React.ReactNode;
};

function Layout({ children }: LayoutProps) {
  const [myData, setMyData] = useRecoilState<myData>(myDataState);
  const [errorMessage, setErrorMessage] = useRecoilState(errorState);
  const setIsLoggedIn = useSetRecoilState(loginState);
  const setModalInfo = useSetRecoilState(modalState);
  const setInviteData = useSetRecoilState<inviteType>(inviteState);

  const getMyData = async () => {
    try {
      const res = await instance.get(`/users/navi`);
      setMyData(res?.data);
<<<<<<< HEAD
<<<<<<< HEAD
    } catch (err) {
      const e = err as errorType;
=======
    } catch (e: any) {
>>>>>>> 7d3b217 ([Fix - Front] useEffect 의존성 배열 삭제 및 통합)
=======
    } catch (e: any) {
>>>>>>> 7d3b217b34a740e26556923abda15016cd9b169b
      if (e.message === `Network Error`) {
        setErrorMessage('E500');
      } else if (e.response.status === 403) {
        alert('다시 로그인 해주세요!!');
        localStorage.removeItem('trans-token');
        setIsLoggedIn(false);
        window.location.replace('/');
      } else setErrorMessage('NV01');
    }
  };

  useEffect(() => {
    if (socket.connected === false) {
      socket = io(
        `${process.env.REACT_APP_SERVERIP}?token=${window.localStorage.getItem(
          'trans-token'
        )}`
      );
    }
    getMyData();
    socket.on('together-request', (data) => {
      setInviteData(data);
      setModalInfo({ modalName: 'GAME-ACCEPT' });
    });
  }, []);

  useEffect(() => {
    if (!window.localStorage.getItem('trans-token')) {
      window.location.reload();
    }
  }, [socket]);

  return myData?.isSecondAuth ? (
    <div>
      {errorMessage === '' && (
        <>
          <Nav nickName={myData?.nickName} avatar={myData?.avatar} />
          <Side />
        </>
      )}
      <div className='content'>{children}</div>
    </div>
  ) : (
    <>
      {myData.nickName && (
        <div>
          <SecondAuth />
        </div>
      )}
    </>
  );
}

export default Layout;
