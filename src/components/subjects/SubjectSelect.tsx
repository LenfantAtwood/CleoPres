"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";

interface CustomFormData {
  selectedImage?: string;
}

interface SubjectSelectProps {
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

const SubjectSelect = ({ subjectid, studentid, onChange, goToNextPage }: SubjectSelectProps) => {
  const [subject, setSubject] = useState<SubjectData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<CustomFormData>({});
  const [randomIds, setRandomIds] = useState<string[]>([]);

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

        // Generate random IDs only once and store them
        const ids = [
          "1003", "1004", "1005", "1006", "1007", "1008", "1009", "1010",
          "1011", "1012", "1013", "1014", "1015", "1016", "1017", "1018",
          "1019", "1020", "1021", "1022", "1023", "1024", "1025", "1026",
          "1027", "1028", "1029", "1030", "1031", "1032", "1033", "1034",
          "1035", "1036", "1037", "1038", "1039", "1040",
        ];
        const generateRandomId = (baseIds: string[], count: number): string[] => {
          // Shuffle the array using Fisher-Yates algorithm
          const shuffled = [...baseIds];
          for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
          }
          // Return the first 'count' elements
          return shuffled.slice(0, count);
        };
        setRandomIds(generateRandomId(ids, 9));
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [subjectid, studentid]);

  if (loading) return <div>Loading...</div>;
  if (error || !subject) return <div>Error: {error || "Subject not found"}</div>;

  const getCorrectImagePath = (imageType: string) => {
    const fixedImagePaths: Record<string, string> = {
      personalface_yes: `/images/${subjectid}_yes.png`,
      personalface_no: `/images/${subjectid}_no.png`,
      personalface_rand: `/images/${subjectid}_rand.png`,
      personalface_random1: `/images/${randomIds[0]}_rand.png`,
      personalface_random2: `/images/${randomIds[1]}_rand.png`,
      personalface_random3: `/images/${randomIds[2]}_rand.png`,
      personalface_random4: `/images/${randomIds[3]}_rand.png`,
      personalface_random5: `/images/${randomIds[4]}_rand.png`,
      personalface_random6: `/images/${randomIds[5]}_rand.png`,
      personalface_random7: `/images/${randomIds[6]}_rand.png`,
      personalface_random8: `/images/${randomIds[7]}_rand.png`,
      personalface_random9: `/images/${randomIds[8]}_rand.png`,
      multibrain32_yes: `/images/mulitibrain32_yes.png`,
      multibrain32_no: `/images/mulitibrain32_no.png`,
    };
    return fixedImagePaths[imageType] || `/images/${subjectid}_default.png`;
  };

  const images: ImageData[] = [
    { id: "1", description: "Personal Face Yes", imageType: "personalface_yes" },
    { id: "2", description: "Personal Face No", imageType: "personalface_no" },
    { id: "3", description: "Personal Face Random", imageType: "personalface_rand" },
    { id: "4", description: "Personal Face Random 1", imageType: "personalface_random1" },
    { id: "5", description: "Personal Face Random 2", imageType: "personalface_random2" },
    { id: "6", description: "Personal Face Random 3", imageType: "personalface_random3" },
    { id: "7", description: "Personal Face Random 4", imageType: "personalface_random4" },
    { id: "8", description: "Personal Face Random 5", imageType: "personalface_random5" },
    { id: "9", description: "Personal Face Random 6", imageType: "personalface_random6" },
    { id: "10", description: "Personal Face Random 7", imageType: "personalface_random7" },
    { id: "11", description: "Personal Face Random 8", imageType: "personalface_random8" },
    { id: "12", description: "Personal Face Random 9", imageType: "personalface_random9" },
    { id: "13", description: "Multibrain 32 Yes", imageType: "multibrain32_yes" },
    { id: "14", description: "Multibrain 32 No", imageType: "multibrain32_no" },
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
            Browse the images below featuring your personal AI-generated president alongside others. Select{" "}
            <span className="font-semibold text-green-600">Yes</span> if you’d vote for the candidate, or{" "}
            <span className="font-semibold text-red-600">No</span> if you wouldn’t.
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
            // onClick={() => alert("All images have been selected!")}
            onClick={goToNextPage}
          >
            Continue
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SubjectSelect;







// return (
//   <Card className="p-4">
//     <CardContent>
//       <h1 className="text-xl font-bold mb-4">Part I</h1>
//       <h2 className="text-xl mb-4">
//         In the following series of images, we show your personal, brain-generated ai-president is shown, along with a
//         bunch of other images. Please select which of the following images you could consider voting for and which you
//         wouldn’t. You can cast as many votes as you like.
//       </h2>
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//         {images.map((image) => (
//           <figure
//             key={image.id}
//             className="relative group transition-transform duration-300 hover:scale-105"
//           >
//             <div className="relative overflow-hidden rounded-xl shadow-lg">
//               <Image
//                 src={getCorrectImagePath(image.imageType)}
//                 alt={image.description}
//                 className={`aspect-[1/1] object-cover w-full h-auto transition-all duration-400 ${
//                   formData.selectedImage === image.imageType
//                     ? "ring-4 ring-blue-500 scale-105"
//                     : "opacity-90 hover:opacity-100"
//                 }`}
//                 width={300}
//                 height={300}
//                 onClick={() => handleImageSelect(image.imageType)}
//               />
//               <div
//                 className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center ${
//                   formData.selectedImage === image.imageType ? "bg-blue-500" : "bg-white/90"
//                 } transition-colors`}
//               >
//                 <span
//                   className={`text-sm font-bold ${
//                     formData.selectedImage === image.imageType ? "text-white" : "text-gray-400"
//                   }`}
//                 >
//                   {image.id}
//                 </span>
//               </div>
//             </div>
//             <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/50 transition-opacity duration-300 rounded-xl">
//               <button
//                 className="px-6 py-2 bg-white text-purple-900 rounded-full font-semibold hover:bg-purple-100 transition-colors"
//                 onClick={() => handleImageSelect(image.imageType)}
//               >
//                 {formData.selectedImage === image.imageType ? "Selected" : "Select Image"}
//               </button>
//             </div>
//           </figure>
//         ))}
//       </div>
//     </CardContent>
//   </Card>
// );
