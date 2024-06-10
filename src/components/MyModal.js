import ReactModal from "react-modal";

const MyModal = ({ onSubmit, onClose }) => {
  const handleClickSubmit = () => {
    onSubmit();
  };

  const handleClickCancel = () => {
    onClose();
  };
  return (
    <>
      {" "}
      <div>모달 입니다.</div>
      <div>
        <button onClick={handleClickSubmit}>확인</button>
        <button onClick={handleClickCancel}>취소</button>
      </div>
    </>
  );
};

export default MyModal;
