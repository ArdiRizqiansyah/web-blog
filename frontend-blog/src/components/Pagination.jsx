/* eslint-disable react/prop-types */

const Pagination = ({ pagination, onPageChange }) => {
    const { links } = pagination;

    return (
        <nav aria-label="Page navigation example">
            <ul className="pagination">
                {links.map(link => (
                    <li key={link.label} className={`page-item ${link.active ? 'active' : ''}`}>
                        <button 
                            className="page-link"
                            onClick={() => onPageChange(link.url)}
                            >
                            <span dangerouslySetInnerHTML={{ __html: link.label }} />
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination;