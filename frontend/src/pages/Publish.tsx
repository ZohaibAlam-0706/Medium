import { TopBar } from "../components/TopBar";

export const Publish = () => {
    return <div>
        <div>
            <TopBar authorName="Zohaib" post={true}/>
        </div>
        <div>            
            <div className="w-full flex justify-center">
                <textarea className="block p-2.5 w-10/12 text-3xl h-28 font-bold text-gray-900  rounded-lg mt-10 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your Title here..."></textarea>
            </div>
            <div className="w-full flex justify-center">
                <textarea className="block p-2.5 w-10/12 text-lg h-lvh text-gray-900 rounded-lg  focus:ring-blue-500 focus:border-blue-500 mt-3" placeholder="Write your Thoughts here..." style={{ maxHeight: "calc(100vh - 16rem)" }}></textarea>
            </div>
        </div>
    </div>
}