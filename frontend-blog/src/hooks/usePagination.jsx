import { useState } from "react";

export const usePagination = () => {
    const [pagination, setPagination] = useState({
        current_page: 1,
        first_page_url: null,
        from: 1,
        last_page: 1,
        last_page_url: null,
        links: [],
        next_page_url: null,
        per_page: 10,
        prev_page_url: null,
        to: 0,
        total: 0
    });

    return {
        pagination,
        setPagination
    };    
};