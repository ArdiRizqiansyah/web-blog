import Heading from "@components/user/Heading";
import User from "@layouts/User";
import { useAuth } from "../../../context/AuthContext";
import { usePost } from "../../../hooks/user/post/usePost";
import Pagination from "../../../components/Pagination";
import { usePostModal } from "../../../hooks/user/post/usePostModal";
import Modal from "../../../components/Modal";
import DeleteModal from "@components/user/modals/DeleteModal";
import { Toaster } from "react-hot-toast";

const PostIndex = () => {
    const { auth } = useAuth();
    const { 
        posts,
        setPosts,
        categories,
        pagination,
        handlePagination,
        handleInputSearch
    } = usePost(auth);
    const {
        formData,
        modalRefPost,
        handleChange,
        handleFileChange,
        hideModalPost,
        handleShowAddModal,
        handleShowEditModal,
        handleSubmitPost,
        modalRefDelete,
        hideModalDelete,
        handleShowDeleteModal,
        handleDeletePost,
    } = usePostModal(auth, posts, setPosts);

    return (
        <User>
            <Toaster
                position="top-right"
            />

            <Heading title="Post" icon="bi bi-journal-bookmark">
                <button
                    type="button"
                    className="btn btn-primary-app text-nowrap"
                    onClick={handleShowAddModal}
                >
                    <i className="bi bi-plus me-1"></i>
                    Tambah Post
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
                        <span className="input-group-text bg-transparent">
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
                            <th scope="col">Judul</th>
                            <th scope="col">Katgori</th>
                            <th scope="col">Aksi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {posts.length > 0 ? (
                            posts.map((post, index) => (
                                <tr key={post.id}>
                                    <th scope="row">{pagination.from + index}</th>
                                    <td>
                                        <img src={post.cover ? post.cover : '/public/images/blog.png'} className="avatar me-2" alt="" />
                                        {post.title}
                                    </td>
                                    <td>{post.category.name}</td>
                                    <td>
                                        <button className="btn btn-sm btn-primary-app me-2" onClick={() => handleShowEditModal(post.id)}>Edit</button>
                                        <button className="btn btn-sm btn-danger-app" onClick={() => handleShowDeleteModal(post.id)}>Hapus</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center">Tidak ada data</td>
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

            {/* modal post */}
            <Modal 
                modalRef={modalRefPost}
                title='Tambah Post'
                onHide={hideModalPost}
                onSubmit={handleSubmitPost}
            >
                <div className="mb-3">
                    <label htmlFor="postTitle" className="form-label">Judul Post</label>
                    <input
                        type="text"
                        name="title"
                        onChange={handleChange}
                        className="form-control"
                        id="postTitle"
                        value={formData.title}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="postCategory" className="form-label">Kategori Post</label>
                    <select
                        name="category_id"
                        onChange={handleChange}
                        className="form-select"
                        id="postCategory"
                        value={formData.category_id}
                        required>
                        <option value="">Pilih Kategori</option>
                        {categories.map((category) => (
                            <option key={category.id} value={category.id}>{category.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="postContent" className="form-label">Konten Post</label>
                    <textarea
                        name="content"
                        onChange={handleChange}
                        className="form-control"
                        rows={5}
                        id="postContent"
                        value={formData.content}
                        required
                    ></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="postCover" className="form-label">Cover Post</label>
                    <input
                        type="file"
                        name="cover"
                        onChange={handleFileChange}
                        className="form-control"
                        id="postCover"
                    />
                </div>
            </Modal>

            {/* modal delete post */}
            <DeleteModal
                modalRef={modalRefDelete}
                onHide={hideModalDelete}
                onDelete={handleDeletePost}
             />
        </User>
    );
}

export default PostIndex;