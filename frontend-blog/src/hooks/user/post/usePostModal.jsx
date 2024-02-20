import { useState } from "react";
import { useModal } from "../../useModal";
import axios from "axios";
import toast from "react-hot-toast";

export const usePostModal = (auth, posts, setPosts) => {
    const [formData, setFormData] = useState({
        id: '',
        title: '',
        content: '',
        category_id: '',
        cover: '',
    });

    const [deletePostId, setDeletePostId] = useState('');

    // modal post
    const { modalRef: modalRefPost, showModal: showModalPost, hideModal: hideModalPost} = useModal();
    const { modalRef: modalRefDelete, showModal: showModalDelete, hideModal: hideModalDelete} = useModal();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFormData({
            ...formData,
            [name]: files[0]
        });
    }

    // handle show add post modal
    const handleShowAddModal = () => {
        // reset form data
        setFormData({
            id: '',
            title: '',
            content: '',
            category_id: '',
            cover: '',
        });

        // ubah judul modal
        const modalEle = modalRefPost.current;
        const modalTitle = modalEle.querySelector('.modal-title');
        modalTitle.textContent = 'Tambah Post';

        // tampilkan modal
        showModalPost();
    }

    // handle show edit post modal
    const handleShowEditModal = async (postId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/post/${postId}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            const data = response.data.data;

            // set form data
            setFormData({
                id: data.id,
                title: data.title,
                content: data.content,
                category_id: data.category_id,
                cover: '',
            });

            // ubah judul modal
            const modalEle = modalRefPost.current;
            const modalTitle = modalEle.querySelector('.modal-title');
            modalTitle.textContent = 'Edit Post';

            // tampilkan modal
            showModalPost();
        } catch (error) {
            console.error(error);
        }
    }
    
    // handle submit for add and edit post
    const handleSubmitPost = async (e) => {
        e.preventDefault();

        let url = `${import.meta.env.VITE_API_URL}/admin/post`;
        let _method = 'post';

        if (formData.id) {
            url = `${import.meta.env.VITE_API_URL}/admin/post/${formData.id}`;
            _method = 'put';
        }

        // form data
        const postData = new FormData();
        postData.append('_method', _method);
        postData.append('title', formData.title);
        postData.append('content', formData.content);
        postData.append('category_id', formData.category_id);
        postData.append('cover', formData.cover);

        try {
            const response = await axios({
                method: 'post',
                url: url,
                data: postData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${auth.token}`
                }
            });

            if (response.status === 200 || response.status === 201) {
                const data = response.data.data;

                if (formData.id) {
                    // update post
                    const newPosts = posts.map((post) => {
                        if (post.id === data.id) {
                            return data;
                        }

                        return post;
                    });

                    setPosts(newPosts);
                } else {
                    // add post
                    setPosts([...posts, data]);
                }

                toast.success(response.data.message);

                hideModalPost();
            }
        } catch (error) {
            console.error(error);
        }
    }

    // show modal delete
    const handleShowDeleteModal = (postId) => {
        setDeletePostId(postId);
        showModalDelete();
    }

    // handle delete post
    const handleDeletePost = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/admin/post/${deletePostId}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            if (response.status === 200) {
                const newPosts = posts.filter((post) => post.id !== deletePostId);
                setPosts(newPosts);

                toast.success('Post berhasil dihapus');

                hideModalDelete();
            }
        } catch (error) {
            console.error(error);
        }
    }

    return {
        formData,
        setFormData,
        modalRefPost,
        showModalPost,
        hideModalPost,
        handleChange,
        handleFileChange,
        handleShowAddModal,
        handleShowEditModal,
        handleSubmitPost,
        modalRefDelete,
        hideModalDelete,
        handleShowDeleteModal,
        handleDeletePost,
    }
};