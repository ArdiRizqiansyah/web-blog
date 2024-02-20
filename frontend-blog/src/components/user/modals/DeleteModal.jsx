/* eslint-disable react/prop-types */
const DeleteModal = ({ 
        title = 'Apakah Kamu Yakin?', 
        message = `Yakin ingin menghapus item ini? Tindakan ini <br /> tidak bisa dibatalkan.`, 
        onDelete, 
        onHide, 
        modalRef 
    }) => {
    return (
        <div className="modal fade" ref={modalRef} tabIndex="-1">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-body px-4">
                        <div className="p-2 d-inline-block rounded-circle mb-3" style={{ backgroundColor: "#FEF3F2" }}>
                            <div className="icon-wrapper rounded-circle text-danger-app">
                                <div className="icon-wrapper-bg" style={{ backgroundColor: "FEE4E2" }}></div>
                                <i className="bi bi-trash"></i>
                            </div>
                        </div>
                        <h5 className="fw-medium mb-2">{title}</h5>
                        <p className="text-muted-app">
                            <span dangerouslySetInnerHTML={{ __html: message }}></span>
                        </p>
                        <div className="row">
                            <div className="col-md-6 d-grid">
                                <button type="button" className="btn btn-outline-secondary fw-medium" onClick={onHide}>Cancel</button>
                            </div>
                            <div className="col-md-6 d-grid">
                                <button type="button" className="btn btn-danger-app fw-medium" onClick={onDelete}>Delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;