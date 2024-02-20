/* eslint-disable react/prop-types */

const Modal = ({
    children,
    title,
    modalRef,
    onHide,
    onSubmit
}) => {
    return (
        <div className="modal fade" id="categoryModal" ref={modalRef} tabIndex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <form onSubmit={onSubmit}>
                        <div className="modal-header">
                            <h5 className="modal-title" id="categoryModalLabel">{title}</h5>
                            <button type="button" onClick={onHide} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {children}
                        </div>
                        <div className="modal-footer">
                            <button type="button" onClick={onHide} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="submit" className="btn btn-primary-app">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Modal;