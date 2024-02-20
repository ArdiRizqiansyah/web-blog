import axios from "axios";
import _ from "lodash";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { usePagination } from "../../usePagination";

export const useCategory = (auth) => {
    const [categories, setCategories] = useState([]);
    const { pagination, setPagination } = usePagination();

    const [filterCategory, setFilterCategory] = useState(null);
    const location = useLocation();

    const debouncedSearch = _.debounce((text) => setFilterCategory(text), 500);

    const handleInputSearch = (e) => {
        debouncedSearch(e.target.value);
    }

    const handlePagination = async (url) => {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });

        // set categories
        setCategories(response.data.data.data);

        // set pagination
        setPagination(response.data.data);
    }

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                let url = `${import.meta.env.VITE_API_URL}/admin/category`;

                // jika ada get parameter page
                if (location.search) {
                    url = `${import.meta.env.VITE_API_URL}/admin/category${location.search}`;
                }

                // cek jika ada filter category maka tambahkan variabel params
                let params = {};

                if (filterCategory) {
                    params = {
                        ...params,
                        search: filterCategory
                    }
                }

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    },
                    params: params
                });

                // set categories
                setCategories(response.data.data.data);

                // set pagination
                setPagination(response.data.data);
            } catch (error) {
                console.error('Error fetching categories:', error.message);
            }
        };

        fetchCategories();
    }, [auth, location.search, filterCategory]);

    return {
        categories,
        setCategories,
        pagination,
        filterCategory,
        handlePagination,
        handleInputSearch
    }
}