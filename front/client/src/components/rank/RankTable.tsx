import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
<<<<<<< HEAD
<<<<<<< HEAD
=======
=======
import RankRow from 'components/rank/RankRow';
import RankTitleRow from 'components/rank/RankTitleRow';
>>>>>>> 857b03e ([Fix - Front] import 및 함수 순서 정리)
import { rankRowType, userRank } from 'types/RankTypes';
import instance from 'utils/axios';
import { loginState } from 'utils/recoil/login';
import { errorState } from 'utils/recoil/error';
<<<<<<< HEAD
>>>>>>> 1adf8e3 ([Fix - Front] any 타입 변경)
import RankRow from 'components/rank/RankRow';
import RankTitleRow from 'components/rank/RankTitleRow';
import { rankRowType, userRank } from 'types/RankTypes';
import { errorType } from 'types/errorTypes';
import instance from 'utils/axios';
import { loginState } from 'utils/recoil/login';
import { errorState } from 'utils/recoil/error';
=======
>>>>>>> 857b03e ([Fix - Front] import 및 함수 순서 정리)

function RankTable() {
  const setIsLoggedIn = useSetRecoilState(loginState);
  const setErrorMessage = useSetRecoilState(errorState);
  const [rank, setRank] = useState<userRank | null>(null);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const getAPI = await instance.get(`/stat`);
      setRank(getAPI.data);
    } catch (err) {
      const e = err as errorType;
      if (e.message === `Network Error`) {
        setErrorMessage('E500');
      } else if (e.response.status === 403) {
        alert('다시 로그인 해주세요!!');
        localStorage.removeItem('trans-token');
        setIsLoggedIn(false);
        window.location.replace('/');
      } else {
        setErrorMessage('RT01');
      }
    }
  };

  return (
    <div className='rank-table'>
      <RankTitleRow />
      {rank?.ranking.map((val: rankRowType, index: number) => {
        const row_type = index % 2 ? 'rank-row' : 'rank-row-gray';
        return <RankRow key={index} rankrow={val} type={row_type} />;
      })}
    </div>
  );
}

export default RankTable;
