import { BlogCard } from "../components/BlogCard"
import { TopBar } from "../components/TopBar"
import { useBlogs } from "../hooks/index";

export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if(loading){
        return <div>
            Loading... 
        </div>
    }

    return <div>
        <div>
            <TopBar authorName={"Peter V"} post={false} />
        </div>
        <div>
            {blogs.map((blog: {id: string ,author: {username: string}, title: string, content: string}) => {
                return <div key={blog.id}>
                    <BlogCard id={blog.id} authorName={blog.author.username} title={blog.title} content={blog.content} publishedDate="4 dec, 2023" />
                </div>
            })}
        </div>
    </div>
}