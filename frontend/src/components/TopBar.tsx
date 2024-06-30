import { useNavigate } from "react-router-dom"

type author = {
    authorName: string,
    post: boolean
}
export const TopBar = ({authorName, post} : author) => {
    const navigate = useNavigate();
    function goToHome(){
        navigate('/blogs');
    }

    function goToPublish(){
        navigate('/publish');
    }

    return <div>
        <div className="h-12 flex justify-between border-b-2">
            <div className="flex">
                <div onClick={goToHome} className="ml-7 text-3xl font-bold text-purple-900 cursor-pointer mt-1">
                    Medium
                </div>
            </div>
            <div className="flex">
                {post ? <div>
                    <div className="mr-10 mt-2 w-24 h-8 px-4 py-0.5 text-lg rounded-full bg-green-500 text-white">Publish</div>    
                </div> :
                <div onClick={goToPublish} className="hover:text-gray-400 cursor-pointer mr-10 flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={0.75} stroke="currentColor" className="size-8 mt-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
                    </svg>
                    <div className="ml-3 mr-5 mt-3 text-lg">Write</div>
                </div>
                }
                <div className="cursor-pointer relative inline-flex items-center justify-center w-9 h-9 overflow-hidden bg-gray-100 rounded-full dark:bg-black mt-1.5 mr-7">
                    <span className="font-medium text-gray-600 dark:text-gray-300">{authorName[0]}</span>
                </div>
            </div>
        </div>
    </div>
}