import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
// import {BannerImg} from "../../public/banner1.jpg"
const LandingPage  = () => {
    // states for input
    const [longUrl, setLongUrl] = useState()
    // navigate hook
    const navigate = useNavigate()
    
    const handleForm = (e) => {
        e.preventDefault()
        // if long url exists, navigate to the query (/auth?createNew={longUrl})
        if(longUrl){
            navigate(`/auth?createNew=${longUrl}`)
        }
    }
    return(
            <div className="flex flex-col items-center">
                {/* heading */}
                <h2 className="my-10 sm:my-16 text-3xl sm:text-6xl lg:text-7xl text-white text-center font-extrabold">
                    The only URL Shortener <br/> you&rsquo;ll ever need! 👇
                </h2>
                {/* form */}
                <form onSubmit={handleForm} className="sm:h-14 flex flex-col sm:flex-row h-full md:w-2/4 gap-2">
                     <Input type="url" placeholder="Enter your loooong URL"
                    value={longUrl}
                     onChange={(e) => setLongUrl(e.target.value) }
                    className="h-full flex-1 py-4 px-4"
                     />
                     <Button className="h-full" type="submit" variant="destructive">Shorten!</Button>
                </form>
                 {/* {/* banner image */}
                 <img src="../../public/banner.jpeg" className="w-full my-11 md:px-11" alt="banner-image" />
                  {/* accordion */}
            <Accordion type="multiple" collapsible className="w-full md:px-11">
                 <AccordionItem value="item-1">
                    <AccordionTrigger>
                        How does the Trimmr URL shortener work?
                    </AccordionTrigger>
                    <AccordionContent>
                        When you enter a long URL, our system generated a shorter version of that URL. This shortened URL redirects to the original long URL when accessed.
                    </AccordionContent>
               </AccordionItem>
               {/* item-2 */}
                 <AccordionItem value="item-2">
                    <AccordionTrigger>
                        Do I need an account to use the app?
                    </AccordionTrigger>
                    <AccordionContent>
                        Yes. Creating an account allows you to manage your URLs, view analytics, and customize your short URLs.
                    </AccordionContent>
               </AccordionItem>
               {/* item-3 */}
                 <AccordionItem value="item-3">
                    <AccordionTrigger>
                        What analytics are available for my shortened URLs?
                    </AccordionTrigger>
                    <AccordionContent>
                        You can view the number of clicks, geolocation data of the clicks and device types (mobile/desktop) for each of your shortened URls. 
                    </AccordionContent>
               </AccordionItem>
            </Accordion>
        </div>
    )
}

export default LandingPage