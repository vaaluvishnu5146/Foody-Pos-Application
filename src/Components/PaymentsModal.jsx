import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

export default function PaymentsModal({
  show = false,
  setOpen = () => {},
  handleTransactionType = () => {},
  handleOrderSubmit = () => {},
}) {
  function handleClose() {
    setOpen(false);
  }
  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Payment Mode</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <div className="mb-3">
              <Form.Check // prettier-ignore
                inline
                type={"radio"}
                name="transactionType"
                id={"cod"}
                label={"COD"}
                onChange={(e) => handleTransactionType(e.target.id)}
              />
              <Form.Check
                inline
                type={"radio"}
                name="transactionType"
                label={"UPI"}
                id={"upi"}
                onChange={(e) => handleTransactionType(e.target.id)}
              />
              <Form.Check
                inline
                type={"radio"}
                name="transactionType"
                label={"Net Banking"}
                id={"netBanking"}
                onChange={(e) => handleTransactionType(e.target.id)}
              />
            </div>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleOrderSubmit}>
            Confirm Order
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
