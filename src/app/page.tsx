// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"

// import Page1 from "@/components/customComponents/page1"
// import Page2 from "@/components/customComponents/page2"
// import Page3 from "@/components/customComponents/page3"
// import { testing } from "@/components/customComponents/testing"

// export default function Home() {

//   const carouselItems = [
//     <Page1 />,
//     <Page2 />,
//     <Page3 />,
//   ]

//   return (
//     // <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//     //   <Page1 />
//     //   <Page2 />
//     //   <Page3 />
//     // </div>

//     // <Carousel>
//     //   <CarouselContent>
//     //     {/* {carouselItems.map((item, index) => (
//     //       <CarouselItem key={index}>{item}</CarouselItem>
//     //     ))} */}
//     //     <CarouselItem>{carouselItems[0]}</CarouselItem>
//     //     <CarouselItem>{carouselItems[0]}</CarouselItem>
//     //   </CarouselContent>
//     //   <CarouselPrevious />
//     //   <CarouselNext />
//     // </Carousel>



//     <testing />
//   )
// }





















// import * as React from "react"

// import { Card, CardContent } from "@/components/ui/card"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel"

// export default function CarouselDemo() {
//   return (
//     <Carousel className="w-full max-w-xs">
//       <CarouselContent>
//         {Array.from({ length: 5 }).map((_, index) => (
//           <CarouselItem key={index}>
//             <div className="p-1">
//               <Card>
//                 <CardContent className="flex aspect-square items-center justify-center p-6">
//                   {/* <span className="text-4xl font-semibold">{index + 1}</span> */}
//                   Hi
//                 </CardContent>
//               </Card>
//             </div>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//       <CarouselPrevious />
//       <CarouselNext />
//     </Carousel>
//   )
// }


















"use client";
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

import Page1 from "@/components/customComponents/page1"
import Page2 from "@/components/customComponents/page2"
import Page3 from "@/components/customComponents/page3"

// import button
import { Button } from "@/components/ui/button"

// define submit here
export function submit() {
  return (
    <Button className="w-full max-w-[200px]" >
      Submit
    </Button>
  )
}
export default function CarouselDemo() {
  const carouselItems = [
    <Page1 key="page1" />,
    <Page2 key="page2" />,
    <Page3 key="page3" />,
    <div className="flex items-center justify-center w-full h-full" key="submit-button">
      <Button className="w-full max-w-[200px] h-full max-h-[200px] rounded-full">
        Submit
      </Button>
    </div>,
  ]
  const carouselRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "PageDown") {
        const nextButton = carouselRef.current?.querySelector(
          '[data-carousel-next]'
        ) as HTMLElement;
        if (nextButton) {
          nextButton.click(); // Simulate a click on the next button
        }
      }
      if (event.key === "PageUp") {
        const prevButton = carouselRef.current?.querySelector(
          '[data-carousel-prev]'
        ) as HTMLElement;
        if (prevButton) {
          prevButton.click(); // Simulate a click on the next button
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);


  return (
    // wrap inside a wfull and center everyting
    <div
      className="flex items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      ref={carouselRef}
    >



      {/* <Carousel className="w-[90%]"> */}
      <Carousel className="w-full">
        {/* <CarouselContent className="w-[90%] items-center justify-center"> */}
        <CarouselContent className="w-[90%] items-center mx-auto">
          {carouselItems.map((item, index) => (
            <CarouselItem key={index} className="w-full">
              <div className="w-full">
                {/* <Card className="w-full"> */}
                {/* <CardContent className="w-full"> */}
                {item}
                {/* </CardContent> */}
                {/* </Card> */}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="text-3xl w-[5%] h-[5%] " data-carousel-prev/>
        <CarouselNext className="text-3xl w-[5%] h-[5%] " data-carousel-next/>
      </Carousel>
    </div>
  )
}





