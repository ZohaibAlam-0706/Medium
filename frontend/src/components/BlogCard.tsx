import { useNavigate } from "react-router-dom";

interface BlogCardProps {
    id: string
    authorName: string;
    title: string;
    content: string;
    publishedDate: string;
}
export const BlogCard = ({
    id,
    authorName,
    title,
    content,
    publishedDate
}: BlogCardProps) => {

    const navigate = useNavigate();
    function goToBlog(){
        navigate(`/blog/${id}`);
    }

    return <div className="mt-5 flex justify-center w-full">
        <div className="w-5/12">
            <div className="flex">
                <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
                    <span className="font-medium text-gray-600 dark:text-gray-300">{authorName[0]}</span>
                </div>
                <div className="ml-2 text-xs mt-2 text-slate-600 font-semibold hover:underline cursor-pointer">
                    {authorName}
                </div>
                <div className="ml-2 mt-1 text-sm">
                    &#9679;
                </div>
                <div className="ml-2 text-xs mt-2 text-slate-400 font-semibold hover:underline cursor-pointer">
                    {publishedDate}
                </div>
            </div>
            <div className="cursor-pointer" onClick={goToBlog}>
                <div className="font-bold text-2xl mt-4">
                    {title}
                </div>
                <div className="ml-1 mr-12 mt-2 text-gray-500 font-semibold">
                    {content.slice(0,100) + "..."}
                </div>
            </div>
            <div className="mt-4 text-gray-500 text-sm">
                {`${Math.ceil(content.length / 100)} min read`}
            </div>
            <div className="bg-slate-200 h-px mt-5 w-11/12 ml-5">
            </div>
        </div>
        <div></div>
    </div>
}