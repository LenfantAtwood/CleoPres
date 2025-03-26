"use client";
import * as React from "react";
import { useState, FormEvent, ChangeEvent } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Page1 from "@/components/customComponents/page1";
import Page2 from "@/components/customComponents/page2";
import Page3 from "@/components/customComponents/page3";
import Page4 from "@/components/customComponents/page4";
import Page5 from "@/components/customComponents/page5";
import Page6 from "@/components/customComponents/page6";
import Page7 from "@/components/customComponents/page7";
import PageS from "@/components/customComponents/image_scroll";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import dynamic from 'next/dynamic';

interface FormData {
  [key: string]: any;
}

interface SubmitButtonProps {
  onClick: () => void;
}

const SubjectPage = dynamic(() => import('@/pages/subjects/[subjectID]'), {
  ssr: false,
  loading: () => <div>Loading...</div>
});

export function SubmitButton({ onClick }: SubmitButtonProps): JSX.Element {
  return (
    <Button className="w-full max-w-[200px]" onClick={onClick}>
      Submit
    </Button>
  );
}

interface HomeProps {
  name: string;
  setName: (name: string) => void;
  studentNumber: string;
  setStudentNumber: (studentNumber: string) => void;
  onLoginSuccess: () => void;
}

export function Home({
  name,
  setName,
  setStudentNumber,
  studentNumber,
  onLoginSuccess,
}: HomeProps): JSX.Element {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isGifPlaying, setIsGifPlaying] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [currentSubject, setCurrentSubject] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name || !studentNumber) {
      setError("Both fields are required.");
      return;
    }

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ name, studentNumber }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! Status: ${response.status}, Body: ${errorText}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Expected JSON, but received: ${text}`);
      }

      const data: { message?: string; error?: string } = await response.json();

      setSubmitted(true);
      onLoginSuccess();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "An unknown error occurred";
      console.error("Login error:", errorMessage);
      setError(errorMessage);
    }
  };

  const toggleGif = () => {
    setIsGifPlaying(!isGifPlaying);
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8"
      onClick={toggleGif}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-center space-y-4 mb-12">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-transparent">
            Ideal President App
          </h1>
          <h2 className="text-2xl text-gray-700 font-semibold">
            Vote for Your Favorite President <span className="text-red-500">♥️</span>
          </h2>
        </div>
        <main className="bg-white rounded-2xl shadow-xl p-8 sm:p-12 flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1">
            <div className="cursor-pointer transform hover:scale-105 transition-transform duration-300">
              <Image
                src={isGifPlaying ? "/images/animated.gif" : "/images/vote.png"}
                alt="Current image"
                width={400}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
          <form onSubmit={handleSubmit} className="flex-1 w-full space-y-8">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                  placeholder="(e.g. Chen Dawen)"
                  className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                />
              </div>
              <div>
                <label
                  htmlFor="studentNumber"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Student Number
                </label>
                <input
                  id="studentNumber"
                  type="text"
                  value={studentNumber}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setStudentNumber(e.target.value);
                    if (e.target.value.length !== 7) {
                      setError(
                        "Student number must be exactly 7 characters. If you are from MPU, enter 'mpu1234'; if you are from MUST, enter 'must123'."
                      );
                    } else {
                      setError("");
                    }
                  }}
                  placeholder="(e.g. ab12345)"
                  className="w-full px-4 py-3 rounded-lg border-2 border-purple-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all outline-none"
                />
              </div>
            </div>
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105 duration-200 shadow-lg"
            >
              Log In
            </button>
          </form>
        </main>
        {submitted && (
          <div className="mt-8 p-6 bg-green-50 border-2 border-green-200 rounded-xl text-center animate-fade-in">
            <p className="text-xl font-semibold text-green-800 mb-2">
              Hello, {name}! 🎉
            </p>
            <p className="text-gray-700">Slide right to browse the list of presidents!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function CarouselDemo(): JSX.Element {
  const [formsData, setFormsData] = useState<Record<string, any>>({});
  const [name, setName] = useState<string>("");
  const [studentNumber, setStudentNumber] = useState<string>("");
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
      studentID: studentNumber,
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

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        const text = await response.text();
        throw new Error(`Expected JSON, but received: ${text}`);
      }

      const result: { message?: string; error?: string } = await response.json();
      alert(`Form submitted successfully! Message: ${result.message}`);
    } catch (error) {
      console.error("Error submitting data:", error);
      alert(
        `Failed to submit form. Please try again. Error: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  };

  const carouselItems: JSX.Element[] = [
    // add a welcome page
    <div className="flex flex-col items-center justify-center w-full h-full min-h-screen p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg border border-purple-100">
    <h1 className="text-4xl font-extrabold text-purple-900 mb-4">
      Welcome to the Ideal President App!
    </h1>
    <p className="text-xl text-gray-700">
      Please fill out the form to vote for your favorite president.
    </p>

    <p className="text-xl text-gray-700">
      Part I: See the list of presidents and answer the question.
    </p>

    <p className="text-xl text-gray-700">
      Part II: Select one president among all the president you have seen.
    </p>
    </div>,
    <SubjectPage key="subject" />,
    <Page1 key="page1" onChange={(data: FormData) => handleFormChange("page1", data)} />,
    <Page2 key="page2" onChange={(data: FormData) => handleFormChange("page2", data)} />,
    <Page3 key="page3" onChange={(data: FormData) => handleFormChange("page3", data)} />,
    <Page4 key="page4" onChange={(data: FormData) => handleFormChange("page4", data)} />,
    <Page5 key="page5" onChange={(data: FormData) => handleFormChange("page5", data)} />,
    <Page6 key="page6" onChange={(data: FormData) => handleFormChange("page6", data)} />,
    <Page7 key="page7" onChange={(data: FormData) => handleFormChange("page7", data)} />,
    <PageS key="pageS" onChange={(data: FormData) => handleFormChange("pageS", data)} />,

    <div 
      className="flex flex-col items-center justify-center w-min-[100%] min-h-[100%] w-full h-full p-8 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl shadow-lg border border-purple-100"
      key="submit-button"
    >
      <div className="text-center space-y-6 max-w-2xl">
        <div className="space-y-4">
          <h2 className="text-3xl font-bold text-purple-900">
            Thank You for Completing the Form! 🎉
          </h2>
          <p className="text-lg text-gray-600">
            Your responses have been recorded. Please click the button below to submit your form.
          </p>
        </div>
        <div className="relative">
          <div className="absolute inset-0 flex items-center justify-center space-x-1 animate-confetti">
            {[...Array(12)].map((_, i) => (
              <span
                key={i}
                className="w-2 h-2 bg-purple-500 rounded-full opacity-0 animate-confetti-item"
                style={{
                  animationDelay: `${i * 0.1}s`,
                  transform: `translateY(${Math.random() * 20 - 10}px) translateX(${Math.random() * 20 - 10}px)`,
                }}
              />
            ))}
          </div>
          <div className="relative z-10">
            <SubmitButton onClick={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  ];

  const carouselRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "PageDown") {
        const nextButton = carouselRef.current?.querySelector(
          "[data-carousel-next]"
        ) as HTMLElement | null;
        if (nextButton) {
          nextButton.click();
        }
      }
      if (event.key === "PageUp") {
        const prevButton = carouselRef.current?.querySelector(
          "[data-carousel-prev]"
        ) as HTMLElement | null;
        if (prevButton) {
          prevButton.click();
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
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
          studentNumber={studentNumber}
          setStudentNumber={setStudentNumber}
          onLoginSuccess={() => setIsLoggedIn(true)}
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
