
import Image from "next/image"
import { Slider } from "@/components/ui/slider"

import { AspectRatio } from "@/components/ui/aspect-ratio"

import * as React from "react"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import { useState, useEffect } from "react";

interface CustomFormData {
  [key: string]: any; // Adjust this to match your form data structure
}

interface Page5Props {
  onChange: (data: CustomFormData) => void;
}

const Page5: React.FC<Page5Props> = ({ onChange }) => {
  const [formData, setFormData] = useState<CustomFormData>({} as CustomFormData);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const updatedFormData = { ...formData, [name]: value };
    setFormData(updatedFormData);
    onChange(updatedFormData);
  };

  const handleSliderChange = (name: string, value: number[]) => {
    const updatedFormData = { ...formData, [name]: value[0] };
    setFormData(updatedFormData);
    onChange(updatedFormData);
  };

  // use effect to set default values for the form slider
  useEffect(() => {
    const defaultFormData = {
      Question2: 2,
      Question3: 2,
      Question4: 2,
    };
    setFormData(defaultFormData);
    onChange(defaultFormData);
  }
  , []);

  return (
    <div className="flex items-center justify-center w-full h-min-[90%]">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>32</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="w-full max-w-[30%] mx-auto rounded-md">
                <AspectRatio ratio={1 / 1}>
                  <Image src="/images/32_sub.png" alt="Image" fill className="rounded-md object-cover object-center" />
                </AspectRatio>
              </div>

              <div className="flex flex-col space-y-10">
                <div className="flex flex-col space-y-5">
                  <Label htmlFor="Question1">Question 1</Label>
                  <p>Would you vote for this person as the president?</p>
                  <div className="flex space-x-4">
                    <Label htmlFor="Question1AnswerYes">
                      <Input type="radio" id="Question1AnswerYes" name="Question1" value="yes" onChange={handleInputChange} />
                      Yes
                    </Label>
                    <Label htmlFor="Question1AnswerNo">
                      <Input type="radio" id="Question1AnswerNo" name="Question1" value="no" onChange={handleInputChange} />
                      No
                    </Label>
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  <Label htmlFor="Question2">Question 2</Label>
                  <p>How competent do you think this president is?</p>
                  <Slider defaultValue={[2]} max={4} step={1} id="Question2" onValueChange={(value) => handleSliderChange("Question2", value)} />
                  <div className="flex justify-between text-xs px-2">
                    <span>Not competent</span>
                    <span>A little</span>
                    <span>Neutral</span>
                    <span>Competent</span>
                    <span>Very Competent</span>
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  <Label htmlFor="Question3">Question 3</Label>
                  <p>How likeable do you think this president is?</p>
                  <Slider defaultValue={[2]} max={4} step={1} id="Question3" onValueChange={(value) => handleSliderChange("Question3", value)} />
                  <div className="flex justify-between text-xs px-2">
                    <span>Not likable</span>
                    <span>A little</span>
                    <span>Neutral</span>
                    <span>Lovely</span>
                    <span>Very likable</span>
                  </div>
                </div>

                <div className="flex flex-col space-y-5">
                  <Label htmlFor="Question4">Question 4</Label>
                  <p>How trustworthy do you think this president is?</p>
                  <Slider defaultValue={[2]} max={4} step={1} id="Question4" onValueChange={(value) => handleSliderChange("Question4", value)} />
                  <div className="flex justify-between text-xs px-2">
                    <span>Not trustworthy</span>
                    <span>A little</span>
                    <span>Neutral</span>
                    <span>Trustworthy</span>
                    <span>Very trustworthy</span>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default Page5;


// import Image from "next/image"
// import { Slider } from "@/components/ui/slider"

// import { AspectRatio } from "@/components/ui/aspect-ratio"

// import * as React from "react"

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Button } from "@/components/ui/button"
// import { Label } from "@/components/ui/label"
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select"

// interface Page1Props {
//   onChange: (data: FormData) => void;
// }

// // export default function Page1() {
// // just specify as a function any type
// export default function Page1

//   return (
//     // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
    
//     <div className="flex items-center justify-center w-full h-min-[90%]">

//       <Card className="w-full">
//         <CardHeader>
//           <CardTitle>2 Avg</CardTitle>
//           {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
//         </CardHeader>
//         <CardContent>
//           <form>
//             <div className="grid w-full items-center gap-4">
//               {/* max width 50%, center the image, and make it rounded */}
//               <div className="w-full max-w-[30%] mx-auto rounded-md">
//                 <AspectRatio ratio={1 / 1}>
//                   <Image src="/images/2_avg.png" alt="Image" fill className="rounded-md object-cover object-center" />
//                 </AspectRatio>
//               </div>


//               {/* This means whatever div inside will have y gap of 1.5 */}
//               <div className="flex flex-col space-y-10">

//                 {/* This means whatever div inside will have a gap of 1.5 */}
//                 <div className="flex flex-col space-y-5">
//                   <Label htmlFor="Question 1">Question 1</Label>
//                   <p>Would you vote for this person as the president?</p>
//                   <div className="flex space-x-4">
//                   <Label htmlFor="Question 1 Answer Yes">
//                     <Input type="radio" id="Question 1 Answer Yes" name="Question 1 Answer" value="yes" />
//                     Yes
//                   </Label>
//                   <Label htmlFor="Question 1 Answer No">
//                     <Input type="radio" id="Question 1 Answer No" name="Question 1 Answer" value="no" />
//                     No
//                   </Label>
//                   </div>
//                 </div>
                
//                 <div className="flex flex-col space-y-5">
//                   <Label htmlFor="Question 2">Question 2</Label>
//                   <p>How competent do you think this president is?</p>
//                   <Slider defaultValue={[2]} max={4} step={1} id="Question 2 Answer" />
//                   <div className="flex justify-between text-xs px-2">
//                   <span>Not competent</span>
//                   <span>A little</span>
//                   <span>Neutral</span>
//                   <span>Competent</span>
//                   <span>Very Competent</span>
//                   {/* <span>5</span> */}
//                   </div>
//                 </div>

//                 <div className="flex flex-col space-y-5">
//                   <Label htmlFor="Question 3">Question 3</Label>
//                   <p>How likeable do you think this president is?</p>
//                   <Slider defaultValue={[2]} max={4} step={1} id="Question 2 Answer" />
//                   <div className="flex justify-between text-xs px-2">
//                   <span>Not likable</span>
//                   <span>A little</span>
//                   <span>Neutral</span>
//                   <span>Lovely</span>
//                   <span>Very likable</span>
//                   {/* <span>5</span> */}
//                   </div>
//                 </div>

//                 <div className="flex flex-col space-y-5">
//                   <Label htmlFor="Question 4">Question 4</Label>
//                   <p>How trustworthy do you think this president is?</p>
//                   <Slider defaultValue={[2]} max={4} step={1} id="Question 2 Answer" />
//                   <div className="flex justify-between text-xs px-2">
//                   <span>Not trustworthy</span>
//                   <span>A little</span>
//                   <span>Neutral</span>
//                   <span>Trustworthyy</span>
//                   <span>Very trustworthy</span>
//                   {/* <span>5</span> */}
//                   </div>
//                 </div>
                
//                 {/* <div className="flex flex-col space-y-5">

//                   <Label htmlFor="Question 3">Question 3</Label>
//                   <Select>
//                     <SelectTrigger id="Question 3 Answer">
//                       <SelectValue placeholder="Select" />
//                     </SelectTrigger>
//                     <SelectContent position="popper">
//                       <SelectItem value="next">Next.js</SelectItem>
//                       <SelectItem value="sveltekit">SvelteKit</SelectItem>
//                       <SelectItem value="astro">Astro</SelectItem>
//                       <SelectItem value="nuxt">Nuxt.js</SelectItem>
//                     </SelectContent>
//                   </Select>
//                 </div> */}


//               </div>
//               {/* <div className="flex flex-col space-y-1.5">
//                 <Label htmlFor="framework">Framework</Label>
//                 <Select>
//                   <SelectTrigger id="framework">
//                     <SelectValue placeholder="Select" />
//                   </SelectTrigger>
//                   <SelectContent position="popper">
//                     <SelectItem value="next">Next.js</SelectItem>
//                     <SelectItem value="sveltekit">SvelteKit</SelectItem>
//                     <SelectItem value="astro">Astro</SelectItem>
//                     <SelectItem value="nuxt">Nuxt.js</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div> */}
//             </div>
//           </form>
//         </CardContent>

//         <CardFooter className="flex justify-between">
//           {/* <Button variant="outline">Cancel</Button>
//           <Button>Deploy</Button> */}
//         </CardFooter>
        
//       </Card>
//     </div>
//   )
// }

