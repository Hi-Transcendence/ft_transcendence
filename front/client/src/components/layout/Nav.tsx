import { Link } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { socket } from 'components/layout/Layout';
import { modalState } from 'utils/recoil/modal';
import { channelState } from 'utils/recoil/gameState';
import { friendState } from 'utils/recoil/friend';
import { chatListState } from 'utils/recoil/chat';
import 'styles/layout/Nav.css';

function Nav(props: { nickName: string; avatar: string }) {
  const [channelInfo, setChannelInfo] = useRecoilState(channelState);
  const [friend, setFriend] = useRecoilState(friendState);
  const setModalInfo = useSetRecoilState(modalState);
  const setChatList = useSetRecoilState(chatListState);

  const movePage = () => {
    if (channelInfo.channelId !== '') {
      setChannelInfo({
        channelId: '',
        firstPlayer: '',
        secondPlayer: '',
      });
      setChatList([]);
      socket.emit('leave-channel');
    }
    if (friend) {
      setFriend(false);
      socket.emit('friend-end');
    }
  };

  return (
    <div>
      <header className='nav'>
        <div className='flex1'>
        <Link to='/'>
          <span
            className='navButton home'
            onClick={movePage}>
            홈
          </span>
        </Link>
        </div>
        <div className='flex2'></div>
        
        <div className='flex3'>
          <span
            className='navButton'
            onClick={() => setModalInfo({ modalName: 'GUIDE' })}>
            가이드
          </span>
          <Link to='/ranking'>
            <span
              className='navButton'
              onClick={movePage}>랭킹</span>
          </Link>
          <Link to={`/users/${props.nickName}/mypage`}>
            <span
              className='navButton'
              onClick={movePage}>
              마이페이지</span>
          </Link>
          <span
            className='navButton'
            onClick={() => setModalInfo({ modalName: 'LOGOUT' })}>
            로그아웃
          </span>
        </div>
      </header>
    </div>
  );
}
export default Nav;
