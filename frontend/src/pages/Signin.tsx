import { useState } from "react"
import { Quote } from "../components/Sign_Quote"
import { Link } from "react-router-dom";
import { SigninInput } from "@zohaib0706/medium-common";


export const Signin = () => {
    const [signinInputs, setSigninInputs] = useState<SigninInput>({
        email: "",
        password: ""
    });

    return <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex justify-center align-center mt-12">
            <div>
                <div className="font-bold text-4xl mt-16 mx-6">
                    Create an account
                </div>
                <div className="flex text-gray-500 font-semibold text-xl mx-8 mt-2 mb-10">
                    <div>
                        Don't have an account?
                    </div>
                    <div className="underline cursor-pointer ml-2">
                        <Link to={'/signup'}>Signup</Link>
                    </div>
                </div>
                <div className="mt-6 w-full">
                    <div className="text-lg font-semibold mb-2">
                        Email
                    </div>
                    <input className="border-2 border-slate-300 w-full py-2 px-3 rounded-lg" type="text" placeholder="blogger@gmail.com" onChange={e => {
                        setSigninInputs(c => ({
                            ...c,
                            email: e.target.value
                        }))
                    }} />
                </div>
                <div className="mt-6 w-full">
                    <div className="text-lg font-semibold mb-2">
                        Password
                    </div>
                    <input className="border-2 border-slate-300 w-full py-2 px-3 rounded-lg" type="text" placeholder="Must be atleast 6 characters" onChange={e => {
                        setSigninInputs(c => ({
                            ...c,
                            password: e.target.value
                        }))
                    }} />
                </div>
                <div className="w-full mt-8">
                    <button className="bg-black text-white rounded-lg text-xl w-full py-2"> Sign Up</button>
                </div>
            </div>
        </div>
        <div className="hidden lg:block">
            <Quote />
        </div>    
    </div>
}