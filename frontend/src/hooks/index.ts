import { useEffect, useState } from 'react';
import axios from 'axios';
import { BACKEND_URL } from "../config";

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/bulk`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
            .then(res => {
                setBlogs(res.data.blogs);
                setLoading(false);
            })
    }, []);
    
    return {loading, blogs}
} 

interface BlogProps {
    id: string;
    title: string;
    content: string;
    author: { username: string };
}



interface UseBlogReturn {
    loading: boolean;
    blog: BlogProps | null;
}

export const useBlog = ({ id }: { id: string }): UseBlogReturn => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<BlogProps | null>(null);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`, {
            headers: {
                Authorization: "Bearer " + localStorage.getItem('token')
            }
        })
            .then(res => {
                setBlog(res.data.blog);
                setLoading(false);
            })
    }, []);
    
    return {loading, blog}
}