import { ArrowRightFromLineIcon } from "lucide-react"
import { Button } from "./ui/button"

export default function Hero(){
    return(
        <>
            <section 
                className="hero bg-secondary text-black dark:text-white text-center py-10 rounded-xl drop-shadow-lg"
                style={{
                    backgroundImage: "url('/hero.svg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    color: 'white',
                }}                
            >

                <img src="/logo_light.png" className="h-[200px] w-[200px] mx-auto mb-6 dark:filter dark:invert" loading="lazy" alt="NoteHub Logo" />
                
                <h1 className="text-5xl text-primary dark:text-white font-sans  ">Welcome to NoteHub</h1>
                <p className="mt-4 text-xl text-primary dark:text-white font-sans">Your go-to platform for sharing and discovering course notes</p>

                <Button variant="default" className="my-14 text-white rounded-full shadow-md dark:text-black">
                    <a href="/sign-up">Get Started</a>
                    <ArrowRightFromLineIcon className="right-arrow"/>
                </Button>
            </section> 
        </>
    )
}
