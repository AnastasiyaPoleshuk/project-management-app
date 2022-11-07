import './ConfirmationModal.scss';

type ConfirmationModalType = {
  id: string;
  close: () => void;
  remove: (id: string) => void;
};

const ConfirmationModal = (props: ConfirmationModalType) => {
  const { close, remove, id } = props;
  return (
    <div className="overlay">
      <div className="modal-window">
        <h3 className="modal-title">Are you sure?</h3>
        <div className="btn-wrap">
          <button
            type="button"
            className="btn-success"
            onClick={() => {
              remove(id);
              close();
            }}
          >
            Yes
          </button>
          <button type="button" className="btn-fail" onClick={() => close()}>
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
