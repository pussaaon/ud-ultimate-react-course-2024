import {
    cloneElement,
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import { createPortal } from "react-dom";
import { HiXMark } from "react-icons/hi2";
import styled from "styled-components";

const StyledModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: var(--color-grey-0);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-lg);
    padding: 3.2rem 4rem;
    transition: all 0.5s;
`;

const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background-color: var(--backdrop-color);
    backdrop-filter: blur(4px);
    z-index: 1000;
    transition: all 0.5s;
`;

const Button = styled.button`
    background: none;
    border: none;
    padding: 0.4rem;
    border-radius: var(--border-radius-sm);
    transform: translateX(0.8rem);
    transition: all 0.2s;
    position: absolute;
    top: 1.2rem;
    right: 1.9rem;

    &:hover {
        background-color: var(--color-grey-100);
    }

    & svg {
        width: 2.4rem;
        height: 2.4rem;
        /* Sometimes we need both */
        /* fill: var(--color-grey-500);
    stroke: var(--color-grey-500); */
        color: var(--color-grey-500);
    }
`;

const ModalContext = createContext();

function Modal({ children }) {
    const [modalName, setModalName] = useState("");

    const close = () => setModalName("");
    const open = setModalName;

    return (
        <ModalContext.Provider value={{ modalName, close, open }}>
            {children}
        </ModalContext.Provider>
    );
}

function Opener({ children, modalName }) {
    const { open } = useContext(ModalContext);

    return cloneElement(children, { onClick: () => open(modalName) });
}

function Window({ children, name }) {
    const { modalName, close } = useContext(ModalContext);
    const modalRef = useRef();

    useEffect(() => {
        function handleClickOutside(e) {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                close();
            }
        }
        document.addEventListener("click", handleClickOutside, true);
        return () =>
            document.removeEventListener("click", handleClickOutside, true);
    }, [close]);

    if (name !== modalName) return null;

    return createPortal(
        <Overlay>
            <StyledModal ref={modalRef}>
                <Button onClick={close}>
                    <HiXMark />
                </Button>
                <div>{cloneElement(children, { onCloseModal: close })}</div>
            </StyledModal>
        </Overlay>,
        document.body
    );
}

Modal.Opener = Opener;
Modal.Window = Window;

export default Modal;
