import Public from "@layouts/public";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import _ from "lodash";

const Home = () => {
    // await axios.get(import.meta.env.VITE_API_URL + "/public")
    // create get api public using axios and useEffect
    // data api
    const [categories, setCategories] = useState([]);
    const [posts, setPosts] = useState([]);
    const [new_post, setNewPost] = useState({});

    // filter data
    const [filterPost, setFilterPost] = useState([]);
    const [filterCategory, setFilterCategory] = useState(null);
    const [searchText, setSearchText] = useState('');

    // loading data
    const [loadingNewPost, setLoadingNewPost] = useState(true);
    const [loadingPosts, setLoadingPosts] = useState(true);
    
    // fetch data from api
    useEffect(() => {
        axios.get(import.meta.env.VITE_API_URL + "/public")
            .then((res) => {
                setCategories(res.data.categories);
                setNewPost(res.data.new_post);
                setPosts(res.data.posts);
                setFilterPost(res.data.posts);

                setLoadingNewPost(false);
                setLoadingPosts(false);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
                setLoadingNewPost(false);
                setLoadingPosts(false);
            });
    }, []);

     // Using debounced function for search input
     const debouncedSearch = _.debounce((text) => setSearchText(text), 300);

    // filter data
    useEffect(() => {
        if (filterCategory || searchText) {
            const fetchFilteredPosts = async () => {
                setLoadingPosts(true);
                try {
                    const response = await axios.get(`${import.meta.env.VITE_API_URL}/post`, {
                        params: {
                            category: filterCategory,
                            search: searchText,
                        }
                    });
                    
                    setFilterPost(response.data.data);
                    setLoadingPosts(false);
                } catch (error) {
                    console.error('Error fetching filtered posts:', error);
                    setLoadingPosts(false);
                }
            };
    
            fetchFilteredPosts();
        }else{
            setFilterPost(posts);
        }
    }, [filterCategory, searchText, posts]);

    const handleCategoryFilter = (categoryId) => {
        setFilterCategory(categoryId);
    };

    const handleSearchInputChange = (e) => {
        const text = e.target.value;
        debouncedSearch(text);
    };

    return (
        <Public>
            {loadingNewPost ?(
                <p>Loading...</p>
            ) : (
                // check if new_post is not empty
                Object.keys(new_post).length ? (
                    <div className="card border-0 mb-4 rounded-3">
                        <div className="card-body row align-items-center">
                            <div className="col-md-6 col-lg-4">
                                <span className="text-primary-app fw-semibold">{new_post.category.name}</span>
                                <h1 className="fw-bold">
                                    {new_post.title}
                                </h1>
                                <p>
                                    {new_post.content}
                                </p>
                                <Link to={`/post/${new_post.slug}/detail`} className="btn btn-primary-app px-5">Lihat Detail</Link>
                            </div>
                            <div className="col-md-6 col-lg-8">
                                <img src={new_post.cover ? new_post.cover : '/public/images/blog.png'} className="img-fluid" alt="Gambar" />
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="alert alert-soft-primary text-center">
                        Tidak ada post terbaru
                    </div>
                )
            )}
            

            <div className="row align-items-stretch justify-content-between mb-3">
                <div className="col-auto">
                    <h3 className="fw-semibold">Daftar Post</h3>
                </div>
                <div className="col-md-4">
                    <div className="input-group">
                        <input 
                            type="text" 
                            className="form-control border-end-0" 
                            placeholder="Cari" 
                            onChange={handleSearchInputChange}
                        />
                        <span className="input-group-text bg-white text-primary-app border-start-0">
                            <i className="bi bi-search"></i>
                        </span>
                    </div>
                </div>
            </div>
            {Object.keys(categories).length && (
                <div className="d-flex flex-wrap gap-3 mb-3">
                    {categories.map((category) => (
                        <button 
                            type="button" 
                            className={"btn px-5 "+ (filterCategory == category.name ? 'btn-primary-app' : 'btn-outline-primary-app')} 
                            key={category.id}
                            onClick={() => handleCategoryFilter(category.id)}
                            >
                            {category.name}
                        </button>
                    ))}
                </div>
            )}

            <div className="row mb-3">
                {loadingPosts ?(
                    <p>Loading...</p>
                ) : (
                    filterPost.length > 0 ? (
                        filterPost.map((post) => (
                            <div className="col-md-6 col-lg-4 mb-3" key={post.id}>
                                <Link to={`/post/${post.slug}/detail`} className="text-decoration-none">
                                    <div className="card border-0 rounded-4">
                                        <img
                                            src={post.cover ? post.cover : '/public/images/blog.png'}
                                            className="card-img-top"
                                            alt="gambar"
                                        />
                                        <div className="card-body">
                                            <span className="text-primary-app fw-semibold text-sm">{post.category.name}</span>
                                            <h3 className="card-title fw-fw-semibold">{post.title}</h3>
                                            <p className="card-text">
                                                {post.content ? post.content.substring(0, 100) : ""}
                                            </p>
                                        </div>
                                    </div>
                                </Link>
                            </div>  
                        ))
                    ) : (
                        <div className="col">
                            <div className="alert alert-soft-primary text-center">
                                Tidak ada post yang ditemukan
                            </div>
                        </div>
                    )
                )}
            </div>
        </Public>
    );
};

export default Home;
