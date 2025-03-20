import Image from "next/image";
import { Slider } from "@/components/ui/slider";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import * as React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Page1Props {
  onChange: (data: any) => void;
}

export default function Page1({ onChange }: Page1Props) {
  // Single state object to store all form data
  const [formData, setFormData] = React.useState({
    question1: null as string | null, // Radio button (Yes/No)
    question2: 2, // Slider value
    question3: 2, // Slider value
    question4: 2, // Slider value
  });

  // Handle input changes dynamically
  const handleInputChange = (field: string, value: any) => {
    const newData = { ...formData, [field]: value };
    setFormData(newData);
    onChange(newData); // Pass updated data to parent
  };

  return (
    <div className="flex items-center justify-center w-full h-min-[90%]">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>2 Avg</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              {/* Image */}
              <div className="w-full max-w-[30%] mx-auto rounded-md">
                <AspectRatio ratio={1 / 1}>
                  <Image
                    src="/images/2_avg.png"
                    alt="Image"
                    fill
                    className="rounded-md object-cover object-center"
                  />
                </AspectRatio>
              </div>

              {/* Question 1 */}
              <div className="flex flex-col space-y-5">
                <Label htmlFor="Question 1">Question 1</Label>
                <p>Would you vote for this person as the president?</p>
                <div className="flex space-x-4">
                  <Label htmlFor="Question 1 Answer Yes">
                    <Input
                      type="radio"
                      id="Question 1 Answer Yes"
                      name="Question 1 Answer"
                      value="yes"
                      onChange={(e) => handleInputChange("question1", e.target.value)}
                    />
                    Yes
                  </Label>
                  <Label htmlFor="Question 1 Answer No">
                    <Input
                      type="radio"
                      id="Question 1 Answer No"
                      name="Question 1 Answer"
                      value="no"
                      onChange={(e) => handleInputChange("question1", e.target.value)}
                    />
                    No
                  </Label>
                </div>
              </div>

              {/* Question 2 */}
              <div className="flex flex-col space-y-5">
                <Label htmlFor="Question 2">Question 2</Label>
                <p>How competent do you think this president is?</p>
                <Slider
                  defaultValue={[formData.question2]}
                  max={4}
                  step={1}
                  onValueChange={(value) => handleInputChange("question2", value[0])}
                />
                <div className="flex justify-between text-xs px-2">
                  <span>Not competent</span>
                  <span>A little</span>
                  <span>Neutral</span>
                  <span>Competent</span>
                  <span>Very Competent</span>
                </div>
              </div>

              {/* Question 3 */}
              <div className="flex flex-col space-y-5">
                <Label htmlFor="Question 3">Question 3</Label>
                <p>How likeable do you think this president is?</p>
                <Slider
                  defaultValue={[formData.question3]}
                  max={4}
                  step={1}
                  onValueChange={(value) => handleInputChange("question3", value[0])}
                />
                <div className="flex justify-between text-xs px-2">
                  <span>Not likable</span>
                  <span>A little</span>
                  <span>Neutral</span>
                  <span>Lovely</span>
                  <span>Very likable</span>
                </div>
              </div>

              {/* Question 4 */}
              <div className="flex flex-col space-y-5">
                <Label htmlFor="Question 4">Question 4</Label>
                <p>How trustworthy do you think this president is?</p>
                <Slider
                  defaultValue={[formData.question4]}
                  max={4}
                  step={1}
                  onValueChange={(value) => handleInputChange("question4", value[0])}
                />
                <div className="flex justify-between text-xs px-2">
                  <span>Not trustworthy</span>
                  <span>A little</span>
                  <span>Neutral</span>
                  <span>Trustworthy</span>
                  <span>Very trustworthy</span>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}