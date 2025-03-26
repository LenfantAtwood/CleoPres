import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

interface CustomFormData {
  [key: string]: any;
}

interface PageSProps {
  onChange: (data: CustomFormData) => void;
}

const PageS: React.FC<PageSProps> = ({ onChange }) => {
  const [formData, setFormData] = useState<CustomFormData>({});
  const [selectedImage, setSelectedImage] = useState<string>("");

  const works = [
    "/images/2_sub.png",
    "/images/4_sub.png",
    "/images/8_sub.png",
    "/images/10_sub.png",
    "/images/16_sub.png",
    "/images/32_sub.png",
    "/images/38_sub.png",
    "/images/1040_no.png",
  ];

  const handleImageSelect = (image: string) => {
    setSelectedImage(image);
    const updatedFormData = { ...formData, selectedImage: image };
    setFormData(updatedFormData);
    onChange(updatedFormData);
  };

  return (
    <div className="w-full h-full p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-purple-900 mb-2">
          Select one candidate you would vote for
        </h1>
        <p className="text-gray-600 text-lg">
          Scroll horizontally to view all candidates
        </p>
      </div>

      <ScrollArea className="w-full h-[70vh] rounded-xl border-2 border-purple-100 bg-white">
        <div className="flex space-x-8 p-8">
          {works.map((artwork) => (
            <figure 
              key={artwork}
              className="relative shrink-0 group transition-transform duration-300 hover:scale-105"
            >
              <div className="relative overflow-hidden rounded-xl shadow-lg">
                <Image
                  src={artwork}
                  alt="Candidate portrait"
                  className={`aspect-[3/4] object-cover w-[300px] h-[400px] transition-all duration-300 ${
                    selectedImage === artwork 
                      ? "ring-4 ring-blue-500 scale-105"
                      : "opacity-90 hover:opacity-100"
                  }`}
                  width={300}
                  height={300}
                  onClick={() => handleImageSelect(artwork)}
                />
                
                {/* Selection Indicator */}
                <div className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center 
                  ${selectedImage === artwork ? 'bg-blue-500' : 'bg-white/90'} transition-colors`}>
                  <span className={`text-sm font-bold ${
                    selectedImage === artwork ? 'text-white' : 'text-gray-400'
                  }`}>
                    {works.indexOf(artwork) + 1}
                  </span>
                </div>
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 
                bg-black/50 transition-opacity duration-300 rounded-xl">
                <button
                  className="px-6 py-2 bg-white text-purple-900 rounded-full font-semibold 
                    hover:bg-purple-100 transition-colors"
                  onClick={() => handleImageSelect(artwork)}
                >
                  {selectedImage === artwork ? "Selected" : "Select Candidate"}
                </button>
              </div>
            </figure>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="bg-purple-100/50 hover:bg-purple-100" />
      </ScrollArea>

      {/* Selection Help Text */}
      <div className="mt-6 text-center text-gray-600">
        {selectedImage ? 
          "✓ Selection confirmed - Scroll down to submit your vote" : 
          "← → Use scrollbar or arrow keys to navigate"}
      </div>
    </div>
  );
};

export default PageS;