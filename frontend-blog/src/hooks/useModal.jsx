import { useRef } from 'react';
import * as bootstrap from 'bootstrap';

export const useModal = () => {
    const modalRef = useRef();

    const showModal = () => {
        const modalEle = modalRef.current;
        const modal = new bootstrap.Modal(modalEle, {
            backdrop: 'static',
            keyboard: false
        });
        modal.show();
    };

    const hideModal = () => {
        const modalEle = modalRef.current;
        const modal = bootstrap.Modal.getInstance(modalEle);
        modal.hide();
    };

    return { modalRef, showModal, hideModal };
};
