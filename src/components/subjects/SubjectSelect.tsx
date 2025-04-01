"use client";
import { useState, useEffect } from "react";

interface CustomFormData {
  selectedImage?: string;
  
}
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface SubjectSelectProps {
  subjectid: string;
  studentid: string;
  onChange: (data: CustomFormData) => void;
}

const SubjectSelect = ({ subjectid, studentid, onChange }: SubjectSelectProps) => {
  const [subject, setSubject] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<CustomFormData>({});
  useEffect(() => {
    console.log("SubjectPage props:", { subjectid, studentid }); // Log props
    if (!subjectid || !studentid) {
      setError("Missing subjectid or studentid");
      setLoading(false);
      return;
    }

    const fetchSubject = async () => {
      
      const url = `/api/subjects/?studentid=${studentid}&subjectid=${subjectid}`;
      console.log("Fetching:", url); // Log URL
        
      
      try {
        const response = await fetch(url);
        const text = await response.text();
        console.log("Fetch response status:", response.status); // Log status

        if (!response.ok) {
          const errorData = await response.text();
          throw new Error(errorData || `Fetch failed: ${response.status}`);

        }

        const data = JSON.parse(text);
        // console.log("Fetched data:", data); // Log response data
        setSubject(data);
      } catch (err) {
        console.error("Fetch error:", err); // Log error details
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false); // Ensure loading is always set to false
      }
    };

    fetchSubject();
  }, [subjectid, studentid]);

  if (loading) return <div>Loading...</div>;
  if (error || !subject) return <div>Error: {error || "Subject not found"}</div>;

  const getImagePath = (type: string): string => {
    return `/images/${subjectid}_${type}.png`;

  };

  const groupImagePath = (type: string): string => {
    return `/images/${type}_sub.png`;
  };

  const getCorrectImagePath = (imageType: string) => {
    // Use groupImagePath for specific types, adjust this condition as needed
    const isGroupImage = ["n", "8", "10", "24", "38"].includes(imageType);
    return isGroupImage ? groupImagePath(imageType) : getImagePath(imageType);
  };

  const images = [
    { id: 1, imageType: "image", description: "First image" },
    { id: 2, imageType: "no", description: "Second image" },
    { id: 3, imageType: "rand", description: "Third image" },
    { id: 4, imageType: "8", description: "Fourth image" },
    { id: 5, imageType: "10", description: "Fifth image" },
    { id: 6, imageType: "24", description: "Sixth image" },
    { id: 7, imageType: "38", description: "Seventh image" },
    { id: 8, imageType: "n", description: "Eighth image" },   
  ];

// make a image display based on the type, and make them selectable
    const handleImageSelect = (image: string) => {
        setFormData({ ...formData, selectedImage: image });
        const updatedFormData = { ...formData, selectedImage: image };
        setFormData(updatedFormData);
        onChange(updatedFormData);
    };
    
    

    return (
      <Card className="p-4">
        <CardContent>
          <h1 className="text-xl font-bold mb-4">Part II</h1>
          <h2 className="text-xl mb-4">Vote for your favorate president.</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {images.map((image) => (
              <figure 
                key={image.id}
                className="relative group transition-transform duration-300 hover:scale-105"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg">
                  <Image
                    src={getCorrectImagePath(image.imageType)}
                    alt={image.description}
                    className={`aspect-[1/1] object-cover w-full h-auto transition-all duration-400 ${
                      formData.selectedImage === image.imageType 
                        ? "ring-4 ring-blue-500 scale-105"
                        : "opacity-90 hover:opacity-100"
                    }`}
                    width={300}
                    height={300}
                    onClick={() => handleImageSelect(image.imageType)}
                  />
                  
                  {/* Selection Indicator */}
                  <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center 
                    ${formData.selectedImage === image.imageType ? 'bg-blue-500' : 'bg-white/90'} transition-colors`}>
                    <span className={`text-sm font-bold ${
                      formData.selectedImage === image.imageType ? 'text-white' : 'text-gray-400'
                    }`}>
                      {image.id}
                    </span>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 
                  bg-black/50 transition-opacity duration-300 rounded-xl">
                  <button
                    className="px-6 py-2 bg-white text-purple-900 rounded-full font-semibold 
                    hover:bg-purple-100 transition-colors"
                    onClick={() => handleImageSelect(image.imageType)}
                  >
                    {formData.selectedImage === image.imageType ? "Selected" : "Select Image"}
                  </button>
                </div>
              </figure>
            ))}
          </div>
          </CardContent>
        </Card>
      );
    }; // Add missing closing brace for the SubjectSelect component

export default SubjectSelect;