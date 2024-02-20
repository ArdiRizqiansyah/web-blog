import { useState } from "react";
import { useModal } from "../../useModal";
import axios from "axios";
import toast from "react-hot-toast";

export const useCategoryModal = (auth, categories, setCategories) => {
    const [formData, setFormData] = useState({
        id: '',
        name: ''
    });

    // modal category
    const { modalRef: modalRefCategory, showModal: showModalCategory, hideModal: hideModalCategory} = useModal();

    // modal delete category
    const [deleteCategoryId, setDeleteCategoryId] = useState('');
    const { modalRef: modalRefDeleteCategory, showModal: showModalDeleteCategory, hideModal: hideModalDeleteCategory} = useModal();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // handle show add category modal
    const handleShowAddModal = () => {
        // reset form data
        setFormData({
            id: '',
            name: ''
        });

        // ubah judul modal
        const modalEle = modalRefCategory.current;
        const modalTitle = modalEle.querySelector('.modal-title');
        modalTitle.textContent = 'Tambah Kategori';

        // tampilkan modal
        showModalCategory();
    }

    // handle show edit category modal
    const handleShowEditModal = async (categoryId) => {
        try {
            const response = await axios.get(`${import.meta.env.VITE_API_URL}/admin/category/${categoryId}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            const data = response.data.data;

            // set form data
            setFormData({
                id: data.id,
                name: data.name
            });

            // ubah judul modal
            const modalEle = modalRefCategory.current;
            const modalTitle = modalEle.querySelector('.modal-title');
            modalTitle.textContent = 'Edit Kategori';

            // tampilkan modal
            showModalCategory();

        } catch (error) {
            console.error('Error fetching category:', error.message);
        }
    };

    // handle submit for add and edit category
    const handleSubmitCategory = async (e) => {
        e.preventDefault();

        let url = `${import.meta.env.VITE_API_URL}/admin/category`;
        let _method = 'post';

        if (formData.id) {
            url = `${import.meta.env.VITE_API_URL}/admin/category/${formData.id}`;
            _method = 'put';
        }

        // category data
        const categoryData = new FormData();
        categoryData.append('_method', _method);
        categoryData.append('name', formData.name);

        for (const iterator of categoryData.entries()) {
            console.log(iterator);
        }

        try {
            const response = await axios({
                method: 'post',
                url,
                data: categoryData,
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });
            
            if (response.status === 200 || response.status === 201) {
                const data = response.data.data;

                if (formData.id) {
                    // update category
                    const updatedCategories = categories.map(category => {
                        if (category.id === data.id) {
                            return data;
                        }
                        return category;
                    });
                    setCategories(updatedCategories);
                } else {
                    // add category
                    setCategories([data, ...categories]);
                }

                toast.success(response.data.message);

                // hide modal
                hideModalCategory();
            }
        } catch (error) {
            console.error('Error submitting category:', error.message);
        }
    }

    // handle modal delete
    const handleDeleteCategory = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_API_URL}/admin/category/${deleteCategoryId}`, {
                headers: {
                    Authorization: `Bearer ${auth.token}`
                }
            });

            if (response.status === 200) {
                const updatedCategories = categories.filter(category => category.id !== deleteCategoryId);
                setCategories(updatedCategories);

                // hide modal
                handleHideDeleteModal();

                toast.success('Kategori berhasil dihapus');
            }
        } catch (error) {
            console.error('Error deleting category:', error.message);
        }
    }

    // show modal delete category
    const handleShowDeleteModal = (categoryId) => {
        setDeleteCategoryId(categoryId);
        showModalDeleteCategory();
    };

    const handleHideDeleteModal = () => {
        setDeleteCategoryId('');

        // hide modal
        hideModalDeleteCategory();
    }

    return {
        formData,
        setFormData,
        modalRefCategory,
        showModalCategory,
        hideModalCategory,
        modalRefDeleteCategory,
        showModalDeleteCategory,
        hideModalDeleteCategory,
        handleChange,
        handleShowAddModal,
        handleShowEditModal,
        handleSubmitCategory,
        handleDeleteCategory,
        handleShowDeleteModal,
        handleHideDeleteModal
    }
}