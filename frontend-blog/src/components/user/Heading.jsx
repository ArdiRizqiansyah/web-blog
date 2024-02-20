/* eslint-disable react/prop-types */
const Heading = ({ title, subtitle, icon, urlBack, children }) => {
    if (subtitle == undefined) {
        subtitle = 'Access menus and other important information here';
    }

    return (
        <div className="d-flex justify-content-between align-items-center">
            <div className="d-flex align-items-center gap-3">
                <div className="card card-body border-0">
                    <i className={icon} width="25px"></i>
                </div>
                <div>
                    <h3 className="text-lg fw-bold mb-1">{title}</h3>
                    <p className="text-sm mb-0">{subtitle}</p>
                </div>
            </div>
            <div>
                {children}
                {/* buat kondisi if url back ada */}
                {urlBack && (
                    <div>
                        <a href={urlBack} className="btn btn-warning-pp text-nowrap">
                            <i className="fas fa-arrow-left me-1"></i>
                            Kembali
                        </a>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Heading;