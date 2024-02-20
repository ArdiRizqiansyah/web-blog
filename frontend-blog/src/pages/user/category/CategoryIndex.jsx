import User from "@layouts/User";
import Heading from "@components/user/Heading";
import { useAuth } from "../../../context/AuthContext";
import { Toaster } from "react-hot-toast";
import DeleteModal from "@components/user/modals/DeleteModal";
import { useCategory } from "../../../hooks/user/category/useCategory";
import { useCategoryModal } from "../../../hooks/user/category/useCategoryModal";
import Pagination from "../../../components/Pagination";

const CategoryIndex = () => {
    const { auth } = useAuth();

    const { 
        categories, 
        setCategories, 
        pagination, 
        handleInputSearch, 
        handlePagination 
    } = useCategory(auth);

    const { 
        modalRefCategory, 
        hideModalCategory, 
        formData, 
        handleChange, 
        handleShowAddModal, 
        handleShowEditModal, 
        handleSubmitCategory,
        modalRefDeleteCategory,
        handleShowDeleteModal,
        handleHideDeleteModal,
        handleDeleteCategory 
    } = useCategoryModal(auth, categories, setCategories);

    return (
        <User>
            <Toaster
                position="top-right"
            />

            <Heading title="Kategori" icon="bi bi-bookmarks">
                <button
                    type="button"
                    className="btn btn-primary-app text-nowrap"
                    onClick={handleShowAddModal}
                >
                    <i className="bi bi-plus me-1"></i>
                    Tambah Kategori
                </button>
            </Heading>

            <div className="row mt-3">
                <div className="col-md-4 ms-md-auto">
                    <div className="input-group">
                        <input 
                            type="text" 
                            className="form-control border-end-0" 
                            placeholder="Cari" 
                            onChange={handleInputSearch}
                        />
                        <span className="input-group-text bg-white text-primary-app border-start-0">
                            <i className="bi bi-search"></i>
                        </span>
                    </div>
                </div>
            </div>

            <div className="table-responsive mt-3">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">No</th>
                            <th scope="col">Nama Kategori</th>
                            <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length > 0 ? (
                            categories.map((category, index) => (
                                <tr key={category.id}>
                                    <th scope="row">
                                        {pagination.from + index}
                                    </th>
                                    <td>{category.name}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-sm btn-primary-app me-2"
                                            onClick={() => handleShowEditModal(category.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="btn btn-sm btn-danger-app"
                                            onClick={() => handleShowDeleteModal(category.id)}
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <th colSpan="3" className="text-center">Tidak ada data</th>
                            </tr>

                        )}
                    </tbody>
                </table>
            </div>

            {/* pagination */}
            {pagination.last_page > 1 && (
                <div className="d-flex justify-content-end mt-3">
                    <Pagination pagination={pagination} onPageChange={handlePagination} />
                </div>
            )}

            {/* Modal Category */}
            <div className="modal fade" id="categoryModal" ref={modalRefCategory} tabIndex="-1" aria-labelledby="categoryModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered">
                    <div className="modal-content">
                        <form onSubmit={handleSubmitCategory}>
                            <div className="modal-header">
                                <h5 className="modal-title" id="categoryModalLabel">Tambah Kategori</h5>
                                <button type="button" onClick={hideModalCategory} className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label htmlFor="categoryName" className="form-label">Nama Kategori</label>
                                    <input
                                        type="text"
                                        name="name"
                                        onChange={handleChange}
                                        className="form-control"
                                        id="categoryName"
                                        value={formData.name}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" onClick={hideModalCategory} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="submit" className="btn btn-primary-app">Simpan</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* modal delete category */}
            <DeleteModal
                modalRef={modalRefDeleteCategory}
                onDelete={handleDeleteCategory}
                onHide={handleHideDeleteModal}
             />
        </User>
    );
}

export default CategoryIndex;