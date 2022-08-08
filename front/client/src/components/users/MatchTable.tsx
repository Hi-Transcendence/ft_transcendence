import { useState, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { matchList } from 'types/profileTypes';
<<<<<<< HEAD
<<<<<<< HEAD
import { errorType } from 'types/errorTypes';
=======
>>>>>>> 857b03e ([Fix - Front] import 및 함수 순서 정리)
=======
>>>>>>> 7d3b217b34a740e26556923abda15016cd9b169b
import instance from 'utils/axios';
import { profileState } from 'utils/recoil/profileData';
import { errorState } from 'utils/recoil/error';
import 'styles/users/MatchList.css';

function MatchTable() {
  const profileData = useRecoilValue(profileState);
  const [matchList, setMatchList] = useState<matchList | null>(null);
  const setErrorMessage = useSetRecoilState(errorState);

  const getData = async () => {
    try {
      const getAPI = await instance.get(`/match/` + profileData.nickName);
      setMatchList(getAPI.data);
    } catch (err) {
      const e = err as errorType;
      if (e.message === `Network Error`) {
        setErrorMessage('E500');
      } else setErrorMessage('MT01');
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className='matchTable'>
      {matchList?.matchList.map((element, index) => {
        return (
          <div className='matchRow' key={index}>
            <a href={`/users/${element.player1}`} className='matchLeft'>
              <span>{element.player1}</span>
            </a>
            <span> {element.score1}</span>
            <span> vs </span>
            <a href={`/users/${element.player2}`}>
              <span>{element.player2}</span>
            </a>
            <span> {element.score2}</span>
          </div>
        );
      })}
    </div>
  );
}
export default MatchTable;
