import { useState } from 'react';
import { Modal, Button } from 'react-bootstrap'
import toast from 'react-hot-toast';
import styled from 'styled-components';

const ModalDiv = styled(Modal)`
    color: black;
`
const InputAmount = styled.input`
    width: 100%;
`

const DepositModal = (props: { show: boolean, closeModal: () => void, deposit: (amount: number) => void }) => {

    const { show, closeModal, deposit } = props;
    const [amount, setAmount] = useState(0);

    const confirmDeposit = () => {
        if (!amount || amount < 1) {
            toast.error("Please set the correct amount!");
        } else {
            deposit(amount);
        }
    }
    
    const hideModal = () => {
        closeModal();
        setAmount(0);
    }

    return (
        <ModalDiv
            show={show}
            size="sm"
            onHide={hideModal}
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Deposit Modal
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Input token amount you want to deposit!</h5>
                <InputAmount type="number" min={0} value={amount} onChange={(e:any) => {setAmount(e.target.value);}} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={confirmDeposit}>Deposit</Button>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </ModalDiv>
    )
}

export default DepositModal