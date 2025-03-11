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

export default function Page3() {

  return (
    // <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

    <div className="flex items-center justify-center w-full">

      <Card className="w-full">
        <CardHeader>
          <CardTitle>Page3</CardTitle>
          {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              {/* max width 50%, center the image, and make it rounded */}
              <div className="w-full max-w-[70%] mx-auto rounded-md">
                <AspectRatio ratio={16 / 9}>
                  <Image src="https://public.readdy.ai/ai/img_res/1b21f52ee0f2d2a408108e4edea70d70.jpg" alt="Image" fill className="rounded-md object-cover object-center" />
                </AspectRatio>
              </div>


              {/* This means whatever div inside will have y gap of 1.5 */}
              <div className="flex flex-col space-y-15">

                {/* This means whatever div inside will have a gap of 1.5 */}
                <div className="flex flex-col space-y-5">
                  <Label htmlFor="Question 1">Question 1</Label>
                  <Input id="Question 1 Answer" placeholder="Answer here" />
                </div>

                <div className="flex flex-col space-y-5">
                  <Label htmlFor="Question 2">Question 2</Label>
                  <Slider defaultValue={[3]} max={5} step={1} id="Question 2 Answer" />
                </div>

                <div className="flex flex-col space-y-5">

                  <Label htmlFor="Question 3">Question 3</Label>
                  <Select>
                    <SelectTrigger id="Question 3 Answer">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="next">Next.js</SelectItem>
                      <SelectItem value="sveltekit">SvelteKit</SelectItem>
                      <SelectItem value="astro">Astro</SelectItem>
                      <SelectItem value="nuxt">Nuxt.js</SelectItem>
                    </SelectContent>
                  </Select>
                </div>


              </div>
              {/* <div className="flex flex-col space-y-1.5">
                <Label htmlFor="framework">Framework</Label>
                <Select>
                  <SelectTrigger id="framework">
                    <SelectValue placeholder="Select" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="next">Next.js</SelectItem>
                    <SelectItem value="sveltekit">SvelteKit</SelectItem>
                    <SelectItem value="astro">Astro</SelectItem>
                    <SelectItem value="nuxt">Nuxt.js</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
            </div>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center w-full">
          {/* <Button
            className="w-full max-w-[200px]"
          >
            Submit</Button> */}
        </CardFooter>

      </Card>
    </div>
  )
}
