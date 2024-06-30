import { BlogCard } from "../components/BlogCard"
import { TopBar } from "../components/TopBar"
import { useBlogs } from "../hooks/index";

export const Blogs = () => {
    const {loading, blogs} = useBlogs();

    if(loading){
        return <div>
            <div>
                <TopBar authorName={"Peter V"} post={false} />
            </div>
            <div className="flex justify-center items-center h-screen">
                <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-purple-700 motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]"
                >Loading...</span>
                </div>
            </div>
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