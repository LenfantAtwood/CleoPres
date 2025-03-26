// import { NextRequest, NextResponse } from "next/server";
// import { createClient } from '@supabase/supabase-js';

// // Initialize Supabase client
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
// export const supabase = createClient(supabaseUrl, supabaseKey);

// // GET handler for fetching a subject by subjectid
// export async function GET(
//   req: NextRequest,
//   { params }: { params: { subjectid: string } }
// ) {
//   const { subjectid } = params;

//   try {
//     // Query the 'subjects' table for a matching subjectid
//     const { data, error } = await supabase
//       .from('student')
//       .select('*')
//       .eq('subjectid', subjectid)
//       .single(); // Use .single() since we expect one record

//     // Handle query errors
//     if (error) {
//       if (error.code === 'PGRST116') {
//         // No rows found
//         return NextResponse.json(
//           { error: "Subject not found" },
//           { status: 404 }
//         );
//       }
//       throw error; // Other errors will be caught below
//     }

//     // Return the subject data
//     return NextResponse.json(data, { status: 200 });
//   } catch (error) {
//     // Log and handle unexpected errors
//     console.error('Error fetching subject:', error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }


import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
export const supabase = createClient(supabaseUrl, supabaseKey);

// GET handler for fetching a subject based on studentid and subjectid
export async function GET(
  req: NextRequest,
  { params }: { params: { subjectid: string } }
) {
  const { subjectid } = params; // From the dynamic route path
  const studentid = req.nextUrl.searchParams.get("studentid"); // From query parameter

  try {
    // Validate studentid presence
    if (!studentid) {
      return NextResponse.json(
        { error: "studentid query parameter is required" },
        { status: 400 }
      );
    }

    // Query the 'student' table to find the subjectid associated with the studentid
    const { data: studentData, error: studentError } = await supabase
      .from('student')
      .select('subjectid')
      .eq('studentid', studentid)
      .single();

    // Handle query errors or no matching student
    if (studentError || !studentData) {
      if (studentError?.code === 'PGRST116') {
        // No rows found
        return NextResponse.json(
          { error: "Student not found" },
          { status: 404 }
        );
      }
      throw studentError || new Error("No student data returned");
    }

    // Check if the subjectid from the route matches the one tied to the student
    if (studentData.subjectid !== subjectid) {
      return NextResponse.json(
        { error: "Subject ID does not match the student's associated subject" },
        { status: 403 }
      );
    }

    // Query the 'subjects' table for the full subject details
    const { data: subjectData, error: subjectError } = await supabase
      .from('student')
      .select('*')
      .eq('subjectid', subjectid)
      .single();

    // Handle subject query errors
    if (subjectError || !subjectData) {
      if (subjectError?.code === 'PGRST116') {
        return NextResponse.json(
          { error: "Subject not found" },
          { status: 404 }
        );
      }
      throw subjectError || new Error("No subject data returned");
    }

    // Return the subject data
    return NextResponse.json(subjectData, { status: 200 });
  } catch (error) {
    // Log and handle unexpected errors
    console.error('Error fetching subject:', error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}