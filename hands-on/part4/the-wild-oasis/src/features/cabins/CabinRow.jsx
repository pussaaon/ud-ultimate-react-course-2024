import styled from "styled-components";
import { formatCurrency } from "../../utils/helpers";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import CreateCabinForm from "./CreateCabinForm";
import useDeleteCabin from "./hooks/useDeleteCabin";
import useCreateCabin from "./hooks/useCreateCabin";
import Modal from "../../ui/Modal";
import ActionMenus from "../../ui/ActionMenus";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

const Img = styled.img`
    display: block;
    width: 6.4rem;
    aspect-ratio: 3 / 2;
    object-fit: cover;
    object-position: center;
    transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
    font-size: 1.6rem;
    font-weight: 600;
    color: var(--color-grey-600);
    font-family: "Sono";
`;

const Price = styled.div`
    font-family: "Sono";
    font-weight: 600;
`;

const Discount = styled.div`
    font-family: "Sono";
    font-weight: 500;
    color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
    const {
        id: cabinId,
        name,
        maxCapacity,
        regularPrice,
        discount,
        image,
        description,
    } = cabin;

    const { createCabin, isCreating } = useCreateCabin();

    function handleDuplicate() {
        createCabin({
            name: `Copy of ${name}`,
            maxCapacity,
            regularPrice,
            discount,
            image,
            description,
        });
    }

    const { isDeleting, deleteCabin } = useDeleteCabin();

    return (
        <Table.Row role="row">
            <Img src={image} />
            <Cabin>{name}</Cabin>
            <div>{maxCapacity} guests</div>
            <Price>{formatCurrency(regularPrice)}</Price>
            {discount ? (
                <Discount>{formatCurrency(discount)}</Discount>
            ) : (
                <span>--</span>
            )}
            <div>
                <Modal>
                    <ActionMenus.MenuLayout>
                        <ActionMenus.Toggle id={cabinId} />

                        <ActionMenus.List id={cabinId}>
                            <ActionMenus.Button
                                onClick={handleDuplicate}
                                disabled={isCreating}
                            >
                                <HiSquare2Stack />
                                Duplicate
                            </ActionMenus.Button>

                            <Modal.Opener modalName="edit-cabin">
                                <ActionMenus.Button>
                                    <HiPencil />
                                    Edit
                                </ActionMenus.Button>
                            </Modal.Opener>

                            <Modal.Opener modalName="delete-cabin">
                                <ActionMenus.Button>
                                    <HiTrash />
                                    Delete
                                </ActionMenus.Button>
                            </Modal.Opener>
                        </ActionMenus.List>

                        <Modal.Window name="edit-cabin">
                            <CreateCabinForm cabinToEdit={cabin} />
                        </Modal.Window>
                        <Modal.Window name="delete-cabin">
                            <ConfirmDelete
                                resourceName={"cabin"}
                                onConfirm={() => deleteCabin(cabinId)}
                                disabled={isDeleting}
                            />
                        </Modal.Window>
                    </ActionMenus.MenuLayout>
                </Modal>
            </div>
        </Table.Row>
    );
}

export default CabinRow;
