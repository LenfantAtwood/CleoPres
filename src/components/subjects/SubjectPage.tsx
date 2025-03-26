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