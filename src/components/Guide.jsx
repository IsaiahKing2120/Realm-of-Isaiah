import Modal from "./Modal";
import Terminal from "./Terminal";
export default function Guide({ name, onClose, onAction }) {
  return (
    <Modal
      title="M.O.N.D.A.Y."
      eyebrow="EXPLORE THE WORK THROUGH CONVERSATION"
      onClose={onClose}
      className="guide-modal"
    >
      <Terminal name={name} onAction={onAction} autoFocus />
    </Modal>
  );
}
