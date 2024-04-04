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

const WithdrawModal = (props: { show: boolean, closeModal: () => void, withdraw: (amount: number) => void }) => {

    const { show, closeModal, withdraw } = props;
    const [amount, setAmount] = useState(0);

    const confirmWithdraw = () => {
        if (!amount || amount < 1) {
            toast.error("Please set the correct amount!");
        } else {
            withdraw(amount);
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
                    Withdraw Modal
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h5>Input token amount you want to withdraw!</h5>
                <InputAmount type="number" min={0} value={amount} onChange={(e:any) => {setAmount(e.target.value);}} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={confirmWithdraw}>Withdraw</Button>
                <Button onClick={closeModal}>Close</Button>
            </Modal.Footer>
        </ModalDiv>
    )
}

export default WithdrawModal