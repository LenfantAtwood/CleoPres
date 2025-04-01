import { useState, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';


// HomeProps
interface HomeProps {
  name: string;
  setName: (name: string) => void;
  studentid: string; // Renamed for clarity
  setStudentid: (studentid: string) => void;
  onLoginSuccess: () => void;
  setSubjectid: (subjectid: string) => void;
}
export function Home({
  name,
  setName,
  studentid,
  setStudentid,
  onLoginSuccess,
  setSubjectid,
}: HomeProps) {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isGifPlaying, setIsGifPlaying] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !studentid) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, studentNumber: studentid }),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setError('Invalid credentials. Please try again.');
        } else {
          setError('An error occurred. Please try again.')
        }
        return;
      }

      const data = await response.json();
      setSubjectid(data.subjectid);
      setSubmitted(true);
      onLoginSuccess();
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
  };

  const toggleGif = () => {
    setIsGifPlaying(!isGifPlaying);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg">
      <CardContent className="p-6">
        <div className="text-center space-y-3 mb-6">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Ideal President App
          </h1>
          <h2 className="text-xl text-gray-700 font-semibold">
            Vote for Your Favorite President <span className="text-red-500">♥️</span>
          </h2>
        </div>
        
        <div 
          className="flex flex-col lg:flex-row items-center gap-6 p-4"
          onClick={toggleGif}
        >
          <div className="flex-1 cursor-pointer hover:scale-[1.02] transition-transform">
            <Image
              src={isGifPlaying ? "/images/animated.gif" : "/images/vote.png"}
              alt="Current image"
              width={350}
              height={350}
              className="rounded-lg"
            />
          </div>
          
          <form onSubmit={handleSubmit} className="flex-1 w-full space-y-4">
            <div className="space-y-3">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  placeholder="(e.g. Chen Dawen)"
                  className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-200"
                />
              </div>
              <div>
                <label htmlFor="studentid" className="block text-sm font-medium text-gray-700 mb-1">
                  Student Number
                </label>
                <input
                  id="studentid"
                  type="text"
                  value={studentid}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setStudentid(e.target.value);
                    if (e.target.value.length !== 7) {
                      setError("Student number must be exactly 7 characters.");
                    } else {
                      setError("");
                    }
                  }}
                  placeholder="(e.g. ab12345)"
                  className="w-full px-3 py-2 rounded-lg border border-purple-200 focus:border-purple-500 focus:ring-1 focus:ring-purple-200"
                />
              </div>
            </div>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 rounded-lg text-sm">
                {error}
              </div>
            )}
            
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:opacity-90 transition-opacity"
            >
              Log In
            </button>
          </form>
        </div>
        
        {submitted && (
          <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-center">
            <p className="text-lg font-semibold text-green-800">
              Hello, {name}! 🎉
            </p>
            <p className="text-sm text-gray-700">Slide right to browse presidents!</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}



// backup from page.tsx
// export function Home({
//   name,
//   setName,
//   studentid,
//   setStudentid,
//   onLoginSuccess,
//   setSubjectid,
// }: HomeProps): JSX.Element {
//   const [submitted, setSubmitted] = useState<boolean>(false);
//   const [isGifPlaying, setIsGifPlaying] = useState<boolean>(true);
//   const [error, setError] = useState<string>("");

//   const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     if (!name || !studentid) {
//       setError("Both fields are required.");
//       return;
//     }

//     try {
//       const response = await fetch("/api/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         credentials: "include",
//         body: JSON.stringify({ name, studentNumber: studentid }), // Match API expected field
//       });

//       if (!response.ok) {
//         if (response.status === 401) {
//           setError('Invalid student number or name. Please check your credentials.');
//         } else {
//           setError('An error occurred. Please try again.')
//         }
//         return;
//       }

//       const data = await response.json();
//       console.log("Login successful:", data);
//       setSubjectid(data.subjectid);
//       setSubmitted(true);
//       onLoginSuccess();
//     } catch (err) {
//       const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
//       console.error("Login error:", errorMessage);
//       // setError(errorMessage);
//       setError('An error occurred. Please try again.')
//     }
//   };

//   const toggleGif = () => {
//     setIsGifPlaying(!isGifPlaying);
//   };

//   return (
//     <div
//       className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8"
//       onClick={toggleGif}
//     >
//       <div className="max-w-3xl mx-auto">
//         <div className="text-center space-y-4 mb-12">
//           <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
//             Ideal President App
//           </h1>
//           <h2 className="text-2xl text-gray-700 font-semibold">
//             Vote for Your Favorite President <span className="text-red-500">♥️</span>
//           </h2>
//         </div>
//         <main className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-12">
//           <div className="flex-1">
//             <div className="cursor-pointer transform hover:scale-105 transition-transform duration-300">
//               <Image
//                 src={isGifPlaying ? "/images/animated.gif" : "/images/vote.png"}
//                 alt="Current image"
//                 width={400}
//                 height={400}
//                 className="rounded-lg shadow-lg"
//               />
//             </div>
//           </div>
//           <form onSubmit={handleSubmit} className="flex-1 w-full space-y-8">
//             <div className="space-y-6">
//               <div>
//                 <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
//                   Full Name
//                 </label>
//                 <input
//                   id="name"
//                   type="text"
//                   value={name}
//                   onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
//                   placeholder="(e.g. Chen Dawen)"
//                   className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
//                 />
//               </div>
//               <div>
//                 <label htmlFor="studentid" className="block text-sm font-medium text-gray-700 mb-2">
//                   Student Number
//                 </label>
//                 <input
//                   id="studentid"
//                   type="text"
//                   value={studentid}
//                   onChange={(e: ChangeEvent<HTMLInputElement>) => {
//                     setStudentid(e.target.value);
//                     if (e.target.value.length !== 7) {
//                       setError("Student number must be exactly 7 characters.");
//                     } else {
//                       setError("");
//                     }
//                   }}
//                   placeholder="(e.g. ab12345)"
//                   className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
//                 />
//               </div>
//             </div>
//             {error && (
//               <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
//                 {error}
//               </div>
//             )}
//             <button
//               type="submit"
//               className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 duration-200 shadow-lg"
//             >
//               Log In
//             </button>
//           </form>
//         </main>
//         {submitted && (
//           <div className="mt-8 p-6 bg-green-50 border-2 border-green-200 rounded-xl text-center animate-fade-in">
//             <p className="text-xl font-semibold text-green-800 mb-2">
//               Hello, {name}! 🎉
//             </p>
//             <p className="text-gray-700">Slide right to browse the list of presidents!</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }