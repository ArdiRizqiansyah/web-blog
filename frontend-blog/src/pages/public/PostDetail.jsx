import Public from "@layouts/public";
import axios from "axios";
import { useLoaderData } from "react-router-dom";

const PostDetail = () => {
    // Dapatkan data yang dikirim oleh loaderq
    const data = useLoaderData();

    return (
        <Public>
            <div className="mb-3">
                <p className="text-primary-app fw-semibold mb-0">{ data.category.name }</p>
                <h1 className="text-dark fw-bold">
                    { data.title }
                </h1>
            </div>
            <div className="mb-3">
                <img src={data.cover ? data.cover : '/public/images/blog.png'} className="img-fluid" alt="gambar" />
            </div>
            <div className="mb-5 px-3">
                <h5 className="fw-semibold">Konten</h5>
                <p>
                    { data.content }
                </p>
            </div>
        </Public>
    );
}

export default PostDetail;

// make loader for post detail
export const getPostDetail = async ({ params }) => {
    const { slug } = params;

    try {
        const res = await axios.get(`${import.meta.env.VITE_API_URL}/public/${slug}`);

        return res.data;
    } catch (error) {
        console.error("Error fetching post detail:", error);
        return null; // Atau tangani kesalahan sesuai kebutuhan Anda
    }
};