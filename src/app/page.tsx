"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Home } from "@/components/customComponents/home";
import SubjectSelect from "@/components/subjects/SubjectSelect";
import GroupSelect from "@/components/customComponents/GroupSelect";
import Page1 from "@/components/customComponents/Qpage1";
import Page2 from "@/components/customComponents/Qpage2";
import Page3 from "@/components/customComponents/Qpage3";
import Page4 from "@/components/customComponents/Qpage4";
import Page5 from "@/components/customComponents/Qpage5";
import Page6 from "@/components/customComponents/Qpage6";
import { Card, CardContent } from "@/components/ui/card";

interface FormData {
  [key: string]: any;
}

interface SubmitButtonProps {
  onClick: () => void;
}
function SubmitButton({ onClick }: SubmitButtonProps) {
  return (
    <Button className="w-full max-w-[200px]" onClick={onClick}>
      Submit
    </Button>
  );
}

const WelcomePage: React.FC<{ goToNextPage: () => void }> = ({ goToNextPage }) => {
  return (
    <Card className="w-full max-w-4xl mx-auto p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg border border-purple-100">
      <CardContent className="pt-6">
        <div className="flex flex-col items-center justify-center w-full gap-6">
          <h1 className="text-4xl font-extrabold text-purple-900 mb-4">
            Welcome to the Ideal President App!
          </h1>
          <div className="space-y-6 text-center">
            <p className="text-2xl font-medium text-gray-800">
              Please fill out the form to vote for your favorite president.
            </p>
            <div className="space-y-4">
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-purple-600">Part I:</span> Browse and vote for the president candidates you like.
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-purple-600">Part II:</span> Answer the questions to help us understand your preferences.
              </p>
            </div>
          </div>
          <Button className="mt-6" onClick={goToNextPage}>
            Click to Start Voting
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// const SubmitPage: React.FC<{ handleSubmit: () => void }> = ({ handleSubmit }) => {
//   return (
//     <div key="submit" className="flex flex-col items-center justify-center w-full h-full p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg border border-purple-100">
//       <div className="text-center space-y-6 max-w-2xl">
//         <h2 className="text-3xl font-bold text-purple-900">
//           Thank You for Completing the Form! 🎉
//         </h2>
//         <p className="text-lg text-gray-600">
//           Your responses have been recorded. 
//           Please click the button below to submit your form.
//         </p>
//         <SubmitButton onClick={handleSubmit} />
//       </div>
//     </div> 
//   );
// };

const SubmitPage: React.FC<{ handleSubmit: () => void }> = ({ handleSubmit }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-[60vh] p-8 bg-gradient-to-br from-green-50 to-teal-50 rounded-2xl shadow-xl border border-green-100">
      <div className="text-center space-y-8 max-w-2xl">
        <h2 className="text-4xl font-extrabold text-green-900 animate-bounce">
          Thank You for Voting! 🎉
        </h2>
        <p className="text-xl text-gray-700">
          Your preferences have been recorded. Click below to submit your responses and see the results!
        </p>
        <SubmitButton onClick={handleSubmit} />
      </div>
    </div>
  );
};

export default function App() {
  const [formsData, setFormsData] = useState<Record<string, any>>({});
  const [name, setName] = useState<string>("");
  const [studentid, setStudentid] = useState<string>("");
  const [subjectid, setSubjectid] = useState<string>("");
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [submissionStatus, setSubmissionStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [submissionMessage, setSubmissionMessage] = useState<string>("");

  const handleFormChange = (formId: string, data: FormData) => {
    setFormsData((prevFormsData) => ({
      ...prevFormsData,
      [formId]: data,
    }));
  };

  const handleSubmit = async () => {
    const updatedFormsData = {
      ...formsData,
      name,
      studentid,
    };
    console.log("Submitted Form Data:", updatedFormsData);

    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedFormsData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`);
      }

      const result = await response.json();
      alert(`Form submitted successfully! Message: ${result.message}`);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert(
        `Failed to submit form. Error: ${error instanceof Error ? error.message : String(error)}`
      );
    }
  };

  const pageComponents = [
    () => <WelcomePage goToNextPage={goToNextPage} />,
    () => (
      <SubjectSelect
        onChange={(data: FormData) => handleFormChange("SubjectSelect", data)}
        subjectid={subjectid}
        studentid={studentid}
        goToNextPage={goToNextPage}
      />
    ),
    () => (
      <GroupSelect
        onChange={(data: FormData) => handleFormChange("GroupSelect", data)}
        subjectid={subjectid}
        studentid={studentid}
        goToNextPage={goToNextPage}
      />
    ),
    () => <Page1 onChange={(data: FormData) => handleFormChange("Page1", data)} subjectid={subjectid} goToNextPage={goToNextPage} />,
    () => <Page2 onChange={(data: FormData) => handleFormChange("Page2", data)} subjectid={subjectid} goToNextPage={goToNextPage} />,
    () => <Page3 onChange={(data: FormData) => handleFormChange("Page3", data)} subjectid={subjectid} goToNextPage={goToNextPage} />,
    () => <Page4 onChange={(data: FormData) => handleFormChange("Page4", data)} subjectid={subjectid} goToNextPage={goToNextPage} />,
    () => <Page5 onChange={(data: FormData) => handleFormChange("Page5", data)} subjectid={subjectid} goToNextPage={goToNextPage}/>,
    () => <Page6 onChange={(data: FormData) => handleFormChange("Page6", data)} subjectid={subjectid} goToNextPage={goToNextPage} />,
    () => <SubmitPage handleSubmit={handleSubmit} />,
  ];

  const totalPages = pageComponents.length;

  const goToNextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      {!isLoggedIn ? (
        <Home
          name={name}
          setName={setName}
          studentid={studentid}
          setStudentid={setStudentid}
          onLoginSuccess={() => setIsLoggedIn(true)}
          setSubjectid={setSubjectid}
        />
      ) : (
        <div className="w-full">
          {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-4 rounded-full mb-6">
          <div
            className="bg-blue-500 h-4 rounded-full transition-all duration-300"
            style={{ width: `${((currentPage + 1) / totalPages) * 100}%` }}
          ></div>
        </div>
          
          {pageComponents[currentPage]()}
        </div>
      )}
      {/* Submission Status Overlay */}
      {submissionStatus === "submitting" && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl">
            <p className="text-lg font-semibold text-gray-700">Submitting your vote...</p>
          </div>
        </div>
      )}
      {submissionStatus === "success" && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-gradient-to-r from-green-400 to-teal-500 text-white p-6 rounded-lg shadow-2xl z-50 animate-slide-down">
          <div className="flex items-center gap-4">
            <span className="text-3xl">🎉</span>
            <div>
              <h3 className="text-xl font-bold">Success!</h3>
              <p className="text-sm">{submissionMessage}</p>
            </div>
          </div>
        </div>
      )}
      {submissionStatus === "error" && (
        <div className="fixed top-10 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-red-500 text-white p-6 rounded-lg shadow-2xl z-50 animate-slide-down">
          <div className="flex items-center gap-4">
            <span className="text-3xl">❌</span>
            <div>
              <h3 className="text-xl font-bold">Error</h3>
              <p className="text-sm">{submissionMessage}</p>
            </div>
          </div>
        </div>
      )}
      {/* Tailwind Animation Keyframes */}
      <style jsx global>{`
        @keyframes slide-down {
          0% { transform: translateY(-100%); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        .animate-slide-down {
          animation: slide-down 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}