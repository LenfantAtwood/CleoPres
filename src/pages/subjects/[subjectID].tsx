import { useState, useEffect, ChangeEvent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

// Define interfaces for type safety
interface Subject {
  subjectID: string;
  // Add other properties if your API returns more data
}

interface CustomFormData {
  [key: string]: any;
}

interface Page {
  id: number;
  title: string;
  imageType: string;
  description: string;
}

const SubjectPage = () => {
  // Access the router to get the subjectID from the URL
  const router = useRouter();
  const { subjectID } = router.query;

  // State variables
  const [subject, setSubject] = useState<Subject | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState<CustomFormData>({});

  // Fetch data when subjectID is available
  useEffect(() => {
    if (subjectID) {
      setLoading(true);
      fetch(`/api/submit/${subjectID}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Subject not found');
          }
          return response.json();
        })
        .then(data => {
          setSubject(data);
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [subjectID]);

  // Handle loading state
  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle error or no subject state
  if (error || !subject) {
    return <div>Error: {error || 'Subject not found'}</div>;
  }

  // Function to generate image paths
  const getImagePath = (type: string): string => {
    return `/images/${subjectID}_${type}.png`;
  };

  // Handle radio button changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle slider changes
  const handleSliderChange = (name: string, value: number[]) => {
    setFormData(prev => ({ ...prev, [name]: value[0] }));
  };

  // Define pages for navigation
  const pages: Page[] = [
    {
      id: 1,
      title: "Image Page",
      imageType: "image",
      description: "This is the first image",
    },
    {
      id: 2,
      title: "No Image Page",
      imageType: "no",
      description: "This is the second image",
    },
    {
      id: 3,
      title: "Random Image Page",
      imageType: "rand",
      description: "This is the third image",
    },
  ];

  return (
    <div className="flex items-center justify-center w-full min-h-[90vh]">
      <Card className="w-full max-w-4xl">
        <CardContent className="pt-6">
          <div className="grid w-full items-center gap-4">
            {/* Navigation Buttons */}
            <div className="flex space-x-4 mb-6">
              {pages.map(page => (
                <button
                  key={page.id}
                  onClick={() => setCurrentPage(page.id)}
                  className={`px-4 py-2 rounded ${
                    currentPage === page.id
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-200 hover:bg-gray-300'
                  }`}
                >
                  {page.title}
                </button>
              ))}
            </div>

            {/* Content Area */}
            {pages.map(page => (
              currentPage === page.id && (
                <div key={page.id}>
                  {/* Image Display */}
                  <div className="w-full max-w-[30%] mx-auto rounded-md">
                    <AspectRatio ratio={1 / 1}>
                      <Image
                        src={getImagePath(page.imageType)}
                        alt={`${page.title} image`}
                        fill
                        className="rounded-md object-cover object-center"
                      />
                    </AspectRatio>
                  </div>

                  {/* Questions Form */}
                  <div className="flex flex-col space-y-10 mt-8">
                    {/* Question 1: Radio Buttons */}
                    <div className="flex flex-col space-y-5">
                      <Label htmlFor="Question1">Question 1</Label>
                      <p>Would you vote for this person as the president?</p>
                      <div className="flex space-x-4">
                        <Label htmlFor="Question1AnswerYes" className="flex items-center space-x-2">
                          <Input
                            type="radio"
                            id="Question1AnswerYes"
                            name="Question1"
                            value="yes"
                            onChange={handleInputChange}
                          />
                          <span>Yes</span>
                        </Label>
                        <Label htmlFor="Question1AnswerNo" className="flex items-center space-x-2">
                          <Input
                            type="radio"
                            id="Question1AnswerNo"
                            name="Question1"
                            value="no"
                            onChange={handleInputChange}
                          />
                          <span>No</span>
                        </Label>
                      </div>
                    </div>

                    {/* Question 2: Slider */}
                    <div className="flex flex-col space-y-5">
                      <Label htmlFor="Question2">Question 2</Label>
                      <p>How competent do you think this president is?</p>
                      <Slider
                        defaultValue={[2]}
                        max={4}
                        step={1}
                        id="Question2"
                        onValueChange={(value: number[]) => handleSliderChange("Question2", value)}
                      />
                      <div className="flex justify-between text-xs px-2">
                        <span>Not competent</span>
                        <span>A little</span>
                        <span>Neutral</span>
                        <span>Competent</span>
                        <span>Very Competent</span>
                      </div>
                    </div>

                    {/* Question 3: Slider */}
                    <div className="flex flex-col space-y-5">
                      <Label htmlFor="Question3">Question 3</Label>
                      <p>How likeable do you think this president is?</p>
                      <Slider
                        defaultValue={[2]}
                        max={4}
                        step={1}
                        id="Question3"
                        onValueChange={(value: number[]) => handleSliderChange("Question3", value)}
                      />
                      <div className="flex justify-between text-xs px-2">
                        <span>Not likable</span>
                        <span>A little</span>
                        <span>Neutral</span>
                        <span>Lovely</span>
                        <span>Very likable</span>
                      </div>
                    </div>

                    {/* Question 4: Slider */}
                    <div className="flex flex-col space-y-5">
                      <Label htmlFor="Question4">Question 4</Label>
                      <p>How trustworthy do you think this president is?</p>
                      <Slider
                        defaultValue={[2]}
                        max={4}
                        step={1}
                        id="Question4"
                        onValueChange={(value: number[]) => handleSliderChange("Question4", value)}
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
                </div>
              )
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default SubjectPage;