"use client";
// import * as React from "react";
import React from "react"; // Add this import to provide the JSX namespace

import { useState, FormEvent, ChangeEvent } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import SubjectPage from '@/components/subjects/SubjectPage';
import { Home } from "@/components/customComponents/home";
import Image from "next/image";
import SubjectSelect from "@/components/subjects/SubjectSelect";
import Page1 from "@/components/customComponents/page1";
import Page2 from "@/components/customComponents/page2";
import Page3 from "@/components/customComponents/page3";
import Page4 from "@/components/customComponents/page4";
import Page5 from "@/components/customComponents/page5";
import Page6 from "@/components/customComponents/page6";
import Page7 from "@/components/customComponents/page7";
import Page8 from "@/components/customComponents/page8";

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

interface HomeProps {
  name: string;
  setName: (name: string) => void;
  studentid: string; // Renamed for clarity
  setStudentid: (studentid: string) => void;
  onLoginSuccess: () => void;
  setSubjectid: (subjectid: string) => void;
}

const WelcomePage: React.FC = () => {
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
                <span className="font-semibold text-purple-600">Part I:</span> See the list of presidents and answer the question.
              </p>
              <p className="text-lg text-gray-700">
                <span className="font-semibold text-purple-600">Part II:</span> Select one president among all the presidents you have seen.
              </p>
            </div>
          </div>
          <Button className="mt-6">Swipe right to start Voting </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// take in handleSubmit as props
const SubmitPage: React.FC<{ handleSubmit: () => void }> = ({ handleSubmit }) => {
  return (
    <div key="submit" className="flex flex-col items-center justify-center w-full h-full p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg border border-purple-100">
      <div className="text-center space-y-6 max-w-2xl">
        <h2 className="text-3xl font-bold text-purple-900">
          Thank You for Completing the Form! 🎉
        </h2>
        <p className="text-lg text-gray-600">
          Your responses have been recorded. Please click the button below to submit your form.
        </p>
        <SubmitButton onClick={handleSubmit} />
      </div>
    </div>
  );
}



export default function CarouselDemo() {
  const [formsData, setFormsData] = useState<Record<string, any>>({});
  const [name, setName] = useState<string>("");
  const [studentid, setStudentid] = useState<string>(""); // Renamed for consistency
  const [subjectid, setSubjectid] = useState<string>(""); // Renamed for consistency
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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
      studentid, // Use consistent naming
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
        `Failed to submit form. Error: ${error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  const carouselItems = [

    <WelcomePage key="welcome" />,

  
    // <SubjectPage subjectid="pres1" studentid={studentid} />, # Errors at here
    // <SubjectPage key="SubjectPage" onChange={(data: FormData) => handleFormChange("SubjectPage", data)} subjectid={subjectid} studentid={studentid} />,
    <Page1 key="Page1" onChange={(data: FormData) => handleFormChange("Page1", data)} subjectid={subjectid} />,
    <Page2 key="Page2" onChange={(data: FormData) => handleFormChange("Page2", data)} subjectid={subjectid} />,
    <Page3 key="Page3" onChange={(data: FormData) => handleFormChange("Page3", data)} subjectid={subjectid} />,
    <Page4 key="Page4" onChange={(data: FormData) => handleFormChange("Page4", data)} subjectid={subjectid} />,
    <Page5 key="Page5" onChange={(data: FormData) => handleFormChange("Page5", data)} subjectid={subjectid} />,
    <Page6 key="Page6" onChange={(data: FormData) => handleFormChange("Page6", data)} subjectid={subjectid} />,
    <Page7 key="Page7" onChange={(data: FormData) => handleFormChange("Page7", data)} subjectid={subjectid} />,
    <Page8 key="Page8" onChange={(data: FormData) => handleFormChange("Page8", data)} subjectid={subjectid} />,

    <SubjectSelect key="SubjectSelect" onChange={(data: FormData) => handleFormChange("SubjectSelect", data)} subjectid={subjectid} studentid={studentid} />,

    <SubmitPage key="submit" handleSubmit={handleSubmit} />,
  ];

  const carouselRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "PageDown") {
        const nextButton = carouselRef.current?.querySelector("[data-carousel-next]") as HTMLElement | null;
        if (nextButton) nextButton.click();
      }
      if (event.key === "PageUp") {
        const prevButton = carouselRef.current?.querySelector("[data-carousel-prev]") as HTMLElement | null;
        if (prevButton) prevButton.click();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]"
      ref={carouselRef}
    >
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
        <Carousel className="w-full">
          <CarouselContent className="w-[90%] items-center mx-auto">
            {carouselItems.map((item, index) => (
              <CarouselItem key={index} className="w-full">
                <div className="w-full">{item}</div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="text-3xl w-[5%] h-[5%]" data-carousel-prev />
          <CarouselNext className="text-3xl w-[5%] h-[5%]" data-carousel-next />
        </Carousel>
      )}
    </div>
  );
}