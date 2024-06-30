import { useParams } from "react-router-dom";
import { useBlog } from "../hooks"
import { TopBar } from "../components/TopBar";

// atom families / selector Families
export const Blog = () => {
    const { id } = useParams();
    const blogid = id || "";
    const { loading, blog } = useBlog({ id: blogid });
    if(loading){
        return <div>
            Loading....
        </div>
    }
    return <div>
        <div>
            <TopBar authorName={"Zohaib"} post={false} />
        </div>
        <div className="grid grid-cols-10 mt-10">
            <div className="col-span-10 flex justify-center lg:col-span-7">
                <div className="ml-9">
                    <div className="font-sans font-light flex justify-start text-sm text-gray-500">
                        READING | BRAIN | LIFE
                    </div>
                    <div className="text-5xl font-bold mt-4 w-9/12">
                        {blog?.title}
                    </div>
                    <div className="mt-3 ml-2 text-slate-500 font-light">
                        Posted on {"4 dec, 2022"}
                    </div>
                    <div className="mt-2 font-normal text-lg w-11/12">
                        {blog?.content} 
                    </div>
                </div>
            </div>
            <div className="invisible relative lg:visible w-full">
               <div className="text-gray-500 font-medium hover:underline">
                Author
               </div>
               <div className="flex w-96 mt-2">
                <div className="relative inline-flex items-center justify-center w-14 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-800 mt-5 mr-3">
                    <span className="font-medium text-gray-600 dark:text-gray-300">{blog?.author.username[0]}</span>
                </div>
                <div>
                    <div className="font-bold text-xl hover:underline">
                        {blog?.author.username}
                    </div>
                    <div className="mt-1">
                        Random Catch Phrase about the author to grab the user's attention
                    </div>
                </div>
               </div>
            </div>
        </div>
    </div>
}