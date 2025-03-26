// // 

// "use client";
// import { useState, useEffect, ChangeEvent } from "react";
// import Image from "next/image";
// import { AspectRatio } from "@/components/ui/aspect-ratio";
// import { Card, CardContent, CardFooter } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Slider } from "@/components/ui/slider";

// interface Subject {
//   subjectid: string;
//   name?: string; // Adjust based on your subjects table
// }

// interface CustomFormData {
//   [key: string]: any;
// }

// interface Page {
//   id: number;
//   title: string;
//   imageType: string;
//   description: string;
// }

// interface SubjectPageProps {
//   subjectid: string;
//   studentid: string;
// }

// const SubjectPage = ({ subjectid, studentid }: SubjectPageProps) => {
//   const [subject, setSubject] = useState<Subject | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const [formData, setFormData] = useState<CustomFormData>({});

//   useEffect(() => {
//     console.log("SubjectPage props:", { subjectid, studentid }); // Log props
//     if (!subjectid || !studentid) {
//       setError("Missing subjectid or studentid");
//       setLoading(false);
//       return;
//     }

//     const fetchSubject = async () => {
//       try {
//         const url = `/api/subjects/${subjectid}?studentid=${studentid}`;
//         console.log("Fetching from:", url); // Log fetch URL
//         const response = await fetch(url);
//         console.log("Fetch response status:", response.status); // Log status

//         if (!response.ok) {
//           const errorText = await response.text();
//           throw new Error(`Fetch failed: ${response.status} - ${errorText}`);
//         }

//         const data = await response.json();
//         console.log("Fetched data:", data); // Log response data
//         setSubject(data);
//       } catch (err) {
//         console.error("Fetch error:", err); // Log error details
//         setError(err instanceof Error ? err.message : "Unknown error");
//       } finally {
//         setLoading(false); // Ensure loading is always set to false
//       }
//     };

//     fetchSubject();
//   }, [subjectid, studentid]);

//   if (loading) return <div>Loading...</div>;
//   if (error || !subject) return <div>Error: {error || "Subject not found"}</div>;

//   const getImagePath = (type: string): string => {
//     return `/images/${subjectid}_${type}.png`;
//   };

//   const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//   };

//   const handleSliderChange = (name: string, value: number[]) => {
//     setFormData(prev => ({ ...prev, [name]: value[0] }));
//   };

//   const pages: Page[] = [
//     { id: 1, title: "Image Page", imageType: "image", description: "First image" },
//     { id: 2, title: "No Image Page", imageType: "no", description: "Second image" },
//     { id: 3, title: "Random Image Page", imageType: "rand", description: "Third image" },
//   ];

//   return (
//     <div className="flex items-center justify-center w-full min-h-[90vh]">
//       <Card className="w-full max-w-4xl">
//         <CardContent className="pt-6">
//           <div className="grid w-full items-center gap-4">
//             <div className="flex space-x-4 mb-6">
//               {pages.map(page => (
//                 <button
//                   key={page.id}
//                   onClick={() => setCurrentPage(page.id)}
//                   className={`px-4 py-2 rounded ${
//                     currentPage === page.id ? 'bg-blue-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
//                   }`}
//                 >
//                   {page.title}
//                 </button>
//               ))}
//             </div>
//             {pages.map(page => (
//               currentPage === page.id && (
//                 <div key={page.id}>
//                   <div className="w-full max-w-[30%] mx-auto rounded-md">
//                     <AspectRatio ratio={1 / 1}>
//                       <Image
//                         src={getImagePath(page.imageType)}
//                         alt={`${page.title} image`}
//                         fill
//                         className="rounded-md object-cover object-center"
//                       />
//                     </AspectRatio>
//                   </div>
//                   <div className="flex flex-col space-y-10 mt-8">
//                     <div className="flex flex-col space-y-5">
//                       <Label htmlFor="Question1">Question 1</Label>
//                       <p>Would you vote for this person as the president?</p>
//                       <div className="flex space-x-4">
//                         <Label htmlFor="Question1AnswerYes" className="flex items-center space-x-2">
//                           <Input
//                             type="radio"
//                             id="Question1AnswerYes"
//                             name="Question1"
//                             value="yes"
//                             onChange={handleInputChange}
//                           />
//                           <span>Yes</span>
//                         </Label>
//                         <Label htmlFor="Question1AnswerNo" className="flex items-center space-x-2">
//                           <Input
//                             type="radio"
//                             id="Question1AnswerNo"
//                             name="Question1"
//                             value="no"
//                             onChange={handleInputChange}
//                           />
//                           <span>No</span>
//                         </Label>
//                       </div>
//                     </div>
//                     <div className="flex flex-col space-y-5">
//                       <Label htmlFor="Question2">Question 2</Label>
//                       <p>How competent do you think this president is?</p>
//                       <Slider
//                         defaultValue={[2]}
//                         max={4}
//                         step={1}
//                         id="Question2"
//                         onValueChange={(value: number[]) => handleSliderChange("Question2", value)}
//                       />
//                       <div className="flex justify-between text-xs px-2">
//                         <span>Not competent</span>
//                         <span>A little</span>
//                         <span>Neutral</span>
//                         <span>Competent</span>
//                         <span>Very Competent</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )
//             ))}
//           </div>
//         </CardContent>
//         <CardFooter className="flex justify-between"></CardFooter>
//       </Card>
//     </div>
//   );
// };

// export default SubjectPage;

// components/subjects/SubjectPage.tsx
"use client";
import { useState, useEffect } from "react";

interface SubjectPageProps {
  subjectid: string;
  studentid: string;
}

const SubjectPage = ({ subjectid, studentid }: SubjectPageProps) => {
  const [subject, setSubject] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    console.log("Props received:", { subjectid, studentid });
    if (!subjectid || !studentid) {
      setError("Missing subjectid or studentid");
      setLoading(false);
      return;
    }

    const fetchSubject = async () => {
      const url = `/api/subjects/${subjectid}?studentid=${studentid}`;
      console.log("Fetching:", url);
      try {
        const response = await fetch(url);
        const text = await response.text(); // Get raw response for debugging
        console.log("Response status:", response.status, "Body:", text);

        if (!response.ok) {
          throw new Error(`Fetch failed: ${response.status} - ${text}`);
        }

        const data = JSON.parse(text); // Parse JSON manually for clarity
        setSubject(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
      } finally {
        setLoading(false);
      }
    };

    fetchSubject();
  }, [subjectid, studentid]);

  if (loading) return <div>Loading...</div>;
  if (error || !subject) return <div>Error: {error || "Subject not found"}</div>;

  return <div>Subject: {subject.name || subject.subjectid}</div>;
};
// Removed redundant useEffect block as it duplicates functionality already present in the component.
export default SubjectPage;