"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface CustomFormData {
  selectedImage?: string;
}

interface GroupSelectProps {
  subjectid: string;
  studentid: string;
  onChange: (data: CustomFormData) => void;
  goToNextPage: () => void;
}

// Define the expected shape of the subject data
interface SubjectData {
  images: ImageData[];
  [key: string]: any; // Allow additional properties if needed
}

interface ImageData {
  id: string;
  description: string;
  imageType: string;
}

const GroupSelect = ({ subjectid, studentid, onChange, goToNextPage }: GroupSelectProps) => {
  const [subject, setSubject] = useState<SubjectData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<CustomFormData>({});
    
  
  useEffect(() => {
    console.log("SubjectPage props:", { subjectid, studentid });
    if (!subjectid || !studentid) {
      setError("Missing subjectid or studentid");
      setLoading(false);
      return;
    }

    const fetchSubject = async () => {
      const url = `/api/subjects/?studentid=${studentid}&subjectid=${subjectid}`;
      console.log("Fetching:", url);

      try {
        const response = await fetch(url);
        const text = await response.text();
        console.log("Fetch response status:", response.status);

        if (!response.ok) {
          throw new Error(text || `Fetch failed: ${response.status}`);
        }

        const data: SubjectData = JSON.parse(text);
        setSubject(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching subject:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };  
    fetchSubject();
  }, [subjectid, studentid]);

  if (loading) return <div>Loading...</div>;
  if (error || !subject) return <div>Error: {error || "Subject not found"}</div>;

  const getCorrectImagePath = (imageType: string) => {
    const fixedImagePaths: Record<string, string> = {
      multibrain2_y: `/images/mulitibrain2_yes.png`,
      multibrain2_n: `/images/mulitibrain2_no.png`,
      multibrain2_r: `/images/mulitibrain2_rand.png`,
      multibrain4_y: `/images/mulitibrain4_yes.png`,
      multibrain4_n: `/images/mulitibrain4_no.png`,
      multibrain4_r: `/images/mulitibrain4_rand.png`,
      multibrain16_y: `/images/mulitibrain16_yes.png`,
      multibrain16_n: `/images/mulitibrain16_no.png`,
      multibrain16_r: `/images/mulitibrain16_rand.png`,
      multibrain38_y: `/images/mulitibrain38_yes.png`,
      multibrain38_n: `/images/mulitibrain38_no.png`,
      multibrain38_r: `/images/mulitibrain38_rand.png`,
    };
    return fixedImagePaths[imageType];
  };

  const images: ImageData[] = [
    { id: "1", description: "Multibrain 2 Yes", imageType: "multibrain2_y" },
    { id: "2", description: "Multibrain 2 No", imageType: "multibrain2_n" },
    { id: "3", description: "Multibrain 2 Random", imageType: "multibrain2_r" },
    { id: "4", description: "Multibrain 4 Yes", imageType: "multibrain4_y" },
    { id: "5", description: "Multibrain 4 No", imageType: "multibrain4_n" },
    { id: "6", description: "Multibrain 4 Random", imageType: "multibrain4_r" },
    { id: "7", description: "Multibrain 16 Yes", imageType: "multibrain16_y" },
    { id: "8", description: "Multibrain 16 No", imageType: "multibrain16_n" },
    { id: "9", description: "Multibrain 16 Random", imageType: "multibrain16_r" },
    { id: "10", description: "Multibrain 38 Yes", imageType: "multibrain38_y" },
    { id: "11", description: "Multibrain 38 No", imageType: "multibrain38_n" },
  ];  

  const handleImageSelect = (image: string) => {
    const updatedFormData = { ...formData, selectedImage: image };
    setFormData(updatedFormData);
    onChange(updatedFormData);
  };
  
  return (
    <Card className="p-4">
      <CardContent>
      <h1 className="text-3xl font-extrabold text-gray-900 mb-2">Part I: Presidential Image Selection</h1>
          <p className="text-lg text-gray-600 mb-6">
          Now, we will show images generated over multiple sources of brainactivity. Again, please select which of the following images you could consider voting for and which you wouldn't. You can count as many votes as you like. 
          </p>
              
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {images.map((image) => (
            <div key={image.id} className="flex flex-col items-center">
              <div className="relative overflow-hidden rounded-xl shadow-lg mb-4">
                <Image
                  src={getCorrectImagePath(image.imageType)}
                  alt={image.description}
                  className="aspect-[1/1] object-cover w-full h-auto"
                  width={300}
                  height={300}
                />
              </div>
              <div className="flex gap-4">
                <button
                  className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                    formData[image.imageType as keyof CustomFormData] === "yes"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-green-100"
                  }`}
                  onClick={() => {
                    const updatedFormData = { ...formData, [image.imageType]: "yes" };
                    setFormData(updatedFormData);
                    onChange(updatedFormData);
                  }}
                >
                  Yes
                </button>
                <button
                  className={`px-4 py-2 rounded-full font-semibold transition-colors ${
                    formData[image.imageType as keyof CustomFormData] === "no"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-red-100"
                  }`}
                  onClick={() => {
                    const updatedFormData = { ...formData, [image.imageType]: "no" };
                    setFormData(updatedFormData);
                    onChange(updatedFormData);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8">
          <button
            className="px-6 py-3 bg-blue-500 text-white rounded-full font-semibold hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
            disabled={images.some((image) => !formData[image.imageType as keyof CustomFormData])}
            onClick={goToNextPage}
          >
            Continue
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroupSelect;



