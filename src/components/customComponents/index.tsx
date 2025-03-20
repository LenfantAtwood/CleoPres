import { useState, FormEvent, ChangeEvent } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
// import { supabase } from '@/utils/supabase/server';


export default function Home() {
  const [name, setName] = useState<string>('');
  const [studentNumber, setStudentNumber] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [isGifPlaying, setIsGifPlaying] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !studentNumber) {
      setError('Both fields are required.');
      return;
    }
  
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for cookies
        body: JSON.stringify({ 
          name, 
          studentNumber 
        }),
      });
  
      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Login failed');
      }
  
      setSubmitted(true);
      router.push('/next-page');
    } catch (err) {
      // setError(err.message);
      console.error('Login error:', err);
    }
  };

  const toggleGif = () => {
    setIsGifPlaying(!isGifPlaying);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-100 py-12 px-4 sm:px-6 lg:px-8" onClick={toggleGif}>
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
                src={isGifPlaying ? '/images/animated.gif' : '/images/vote.png'}
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
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
                <label htmlFor="studentNumber" className="block text-sm font-medium text-gray-700 mb-2">
                  Student Number
                </label>
                <input
                  id="studentNumber"
                  type="text"
                  value={studentNumber}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    setStudentNumber(e.target.value);
                    if (e.target.value.length !== 7) {
                      setError("Student number must be exactly 7 characters. If you are from MPU, enter 'mpu1234'; if you are from MUST, enter 'must123'.");
                    } else {
                      setError('');
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
            <p className="text-xl font-semibold text-green-800 mb-2">Hello, {name}! 🎉</p>
            <p className="text-gray-700">Slide right to browse the list of presidents!</p>
          </div>
        )}
      </div>
    </div>
  );
}