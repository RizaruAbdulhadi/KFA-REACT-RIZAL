// import "../../styling/Users.css";
import UserForm from "./UserForm";

function userModal({ children, onClose }) {
  return (
    <>
      <div className="modal-overlay">
        <div className="modal-box">
          <button className="modal-close-btn" onClick={onClose}>
            ❌
          </button>
          <UserForm />
          {children}
        </div>
      </div>
    </>
  );
}

export default userModal;
