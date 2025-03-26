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
      setError("Missing subject ID or student ID");
      setLoading(false);
      return;
    }

    const fetchSubject = async () => {
      const url = `/api/subjects/?studentid=${studentid}&subjectid=${subjectid}`;
      console.log("Fetching:", url);

      try {
        const response = await fetch(url);
        const text = await response.text(); // Get raw response for debugging
        console.log("Response status:", response.status, "Body:", text);

        if (!response.ok) {
          const errorData = JSON.parse(text);
          throw new Error(errorData.error || `Fetch failed: ${response.status}`);
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
  if (error) return <div>Error: {error}</div>;
  if (!subject) return <div>Subject not found</div>;

  return <div>Subject: {subject.name || subject.subjectid}</div>;
};

export default SubjectPage;