import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { modalState } from 'types/modal';
import { userData } from 'types/userTypes';
import { DUMMY_SERVER } from 'utils/dummy';
import 'styles/modal/Modal.css';

function ProfileModal() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<userData>();
  const [modalInfo, setModalInfo] = useRecoilState(modalState);

  useEffect(() => {
    getUserData();
  }, []);

  const getUserData = async () => {
    try {
      const res = await axios.get(
        DUMMY_SERVER + `/users/samin/modal?user=yongwkim`,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setUserData(res?.data);
    } catch (e) {}
  };

  const moveProfile = () => {
    navigate(`/users/yongwkim`);
    setModalInfo({ modalName: null });
  };

  const addFriend = async () => {
    try {
      await axios.post(
        DUMMY_SERVER + '/friend',
        { player1: 'yongwkim', player2: 'samin' },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert('친구 추가가 완료되었습니다.');
      setModalInfo({ modalName: null });
    } catch (e: any) {
      if (e.response.data.statusCode === 400) alert('이미 등록된 상태입니다.');
    }
    if (window.location.pathname === '/users/:nickName')
      window.location.reload();
  };

  const delFriend = async () => {
    try {
      await axios.delete(
        DUMMY_SERVER + '/friend?player1=yongwkim&player2=samin',
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert('친구 삭제가 완료되었습니다.');
      setModalInfo({ modalName: null });
    } catch (e: any) {
      if (e.response.data.statusCode === 400)
        alert('친구 목록에 없는 유저입니다.');
    }
    if (window.location.pathname === '/users/:nickName')
      window.location.reload();
  };

  const banUser = async () => {
    try {
      await axios.post(
        DUMMY_SERVER + '/ban',
        { player1: 'yongwkim', player2: 'samin' },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      alert('차단이 완료되었습니다.');
      setModalInfo({ modalName: null });
    } catch (e: any) {
      if (e.response.data.statusCode === 400) alert('이미 차단된 상태입니다.');
    }
  };

  const banCancel = async () => {
    try {
      await axios.delete(DUMMY_SERVER + '/ban?player1=yongwkim&player2=samin', {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      alert('차단이 해제되었습니다.');
      setModalInfo({ modalName: null });
    } catch (e: any) {
      if (e.response.data.statusCode === 400)
        alert('차단되지 않은 사용자입니다.');
    }
  };

  return (
    <>
      {userData && (
        <div className='modal'>
          <div className='modal-title'>유저 프로필</div>
          <div className='modal-content'>
            <section>
              <span>{modalInfo.user}</span>
              <input type='button' onClick={moveProfile} value='프로필' />
              <br />
              <span>{`${userData.win} 승`} </span>
              <span>{`${userData.lose} 패`} </span>
              <span>{`승률 ${userData.win}%`}</span>
            </section>
            <section>
              <button>같이하기</button>
              <input
                type='button'
                onClick={userData.friend ? delFriend : addFriend}
                value={userData.friend ? '친구삭제' : '친구추가'}
              />
              <input
                type='button'
                onClick={userData.ban ? banCancel : banUser}
                value={userData.ban ? '차단해제' : '차단하기'}
              />
            </section>
          </div>
          <div className='modal-select'>
            <button
              onClick={() => {
                setModalInfo({ modalName: null });
              }}
            >
              닫기
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export default ProfileModal;
