import axios from "axios";
import { useEffect, useState } from "react";
import { usePagination } from "../../usePagination";
import { useLocation } from "react-router-dom";
import _ from "lodash";

export const usePost = (auth) => {
    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filterPost, setFilterPost] = useState(null);
    const { pagination, setPagination } = usePagination();

    const location = useLocation();

    const debouncedSearch = _.debounce((text) => setFilterPost(text), 500);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                let url = `${import.meta.env.VITE_API_URL}/admin/post`;

                // jika ada get parameter page
                if (location.search) {
                    url = `${import.meta.env.VITE_API_URL}/admin/post${location.search}`;
                }

                // cek jika ada filter post maka tambahkan variabel params
                let params = {};

                if (filterPost) {
                    params = {
                        ...params,
                        search: filterPost
                    }
                }

                const response = await axios.get(url, {
                    headers: {
                        Authorization: `Bearer ${auth.token}`
                    },
                    params: params
                });

                console.log(response);

                let resPosts = response.data.data.posts;
                let resCategories = response.data.data.categories

                setPosts(resPosts.data);
                setPagination(resPosts);
                setCategories(resCategories);
            } catch (error) {
                console.error(error);
            }
        }

        fetchPosts();
    }, [auth.token, location.search, filterPost]);

    const handlePagination = async (url) => {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${auth.token}`
            }
        });
        
        let resPosts = response.data.data.posts;
        let resCategories = response.data.data.categories

        setPosts(resPosts.data);
        setPagination(resPosts);
        setCategories(resCategories);
    }

    const handleInputSearch = (e) => {
        debouncedSearch(e.target.value);
    }

    return {
        posts,
        setPosts,
        categories,
        filterPost,
        pagination,
        handlePagination,
        handleInputSearch
    }
}