import { useState } from "react";
import { TopBar } from "../components/TopBar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [warning, setWarning] = useState(false);
    const navigate = useNavigate();
    async function publishBlog(){
        if(title === "" || content === ""){
            setWarning(true);
        }else{
            await axios.post(`${BACKEND_URL}/api/v1/blog`,
                {
                    title: title,
                    content: content
                },
                {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem('token')
                    }
                }
            )
            navigate('/blogs');
        }
    }
    return <div>
        <div>
            <TopBar authorName="Zohaib" post={true}/>
        </div>
        <div>            
            <div className="w-full flex justify-center">
                <textarea onChange={e => {
                    setTitle(e.target.value);
                }} className="block p-2.5 w-10/12 text-3xl h-28 font-bold text-gray-900  rounded-lg mt-10 focus:outline-none focus:border-none" placeholder="Write your Title here..."></textarea>
            </div>
            <div className="w-full flex justify-center">
                <textarea onChange={e => {
                    setContent(e.target.value);
                }} className="block p-3 w-10/12 text-lg h-lvh text-gray-900 rounded-lg  focus:outline-none focus:border-none mt-3" placeholder="Write your Thoughts here..." style={{ maxHeight: "calc(100vh - 16rem)" }}></textarea>
            </div>
        </div>
        <div className="flex justify-between">
            {warning ? <div className="ml-32 text-red-600">
                Please fill both Title and Content 
            </div> : <div></div>}
            <button onClick={publishBlog} className="mr-32 mt-2 w-24 h-8 text-lg rounded-full bg-purple-800 text-white">Publish</button>    
        </div>
    </div>
}