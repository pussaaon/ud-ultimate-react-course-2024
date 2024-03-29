import Button from "../../ui/Button";
import CreateCabinForm from "./CreateCabinForm";
import Modal from "../../ui/Modal";

function AddCabin() {
    return (
        <div>
            <Modal>
                <Modal.Opener modalName="create-cabin">
                    <Button>Add new cabin</Button>
                </Modal.Opener>
                <Modal.Window name="create-cabin">
                    <CreateCabinForm />
                </Modal.Window>
            </Modal>
        </div>
    );
}

export default AddCabin;
