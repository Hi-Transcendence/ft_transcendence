import axios from 'axios';
import { useState, useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { modalState } from 'types/modal';
import { DUMMY_SERVER, DUMMY_USER } from 'utils/dummy';
import 'styles/modal/Modal.css';

function AvatarChangeModal() {
  const setModalInfo = useSetRecoilState(modalState);
  const [previewImg, setPreviewImg] = useState(DUMMY_USER.avatar);
  const [postImg, setPostImg] = useState<FormData>();
  const [isChange, setIsChange] = useState<boolean>();

  const CloseModal = () => {
    setModalInfo({ modalName: null });
  };

  useEffect(() => {
    if (isChange) {
      window.location.reload();
      setIsChange(false);
    }
  }, [isChange]);

  const UploadAvatar = (e: any) => {
    const rd = new FileReader();

    if (e.target.files[0] !== null) {
      //미리보기
      rd.readAsDataURL(e.target.files[0]);
      setPreviewImg(URL.createObjectURL(e.target.files[0]));

      //전송할 FormData
      const img = new FormData();
      img.append('avatar', e.target.files[0]);
      setPostImg(img);
    }
  };

  const PostAvatar = () => {
    const fetchData = async () => {
      try {
        await axios.patch(
          DUMMY_SERVER + 'users/' + DUMMY_USER.intraId,
          postImg,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          }
        );
        setIsChange(true);
      } catch (e) {}
    };
    fetchData();
  };

  return (
    <div className='modal'>
      <div className='modal-title'>avatar change</div>
      <div className='modal-content'>
        <div>
          <input type='file' accept='image/*' onChange={UploadAvatar} />
          <img
            src={previewImg}
            alt='프로필 이미지'
            style={{ width: '100px', height: '100px' }}
          />
          <span>아바타</span>
        </div>
      </div>
      <div className='modal-select'>
        <button onClick={PostAvatar}>change</button>
        <button onClick={CloseModal}>close</button>
      </div>
    </div>
  );
}

export default AvatarChangeModal;
