'use client'
import BottomNav from "./components/BottomNav"

const page = () =>{
    return (
        <div className="relative flex items-center justify-center min-h-screen flex-col gap-4 bg-custom-radial-gradient">
        <span>this is a home</span>
        <BottomNav/>

        </div>
    )
}

export default page