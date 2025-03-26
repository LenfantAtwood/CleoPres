// import { NextRequest, NextResponse } from "next/server";
// import { createClient } from '@supabase/supabase-js';

// // Initialize Supabase client
// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
// export const supabase = createClient(supabaseUrl, supabaseKey);

// // // GET handler for fetching a subject based on studentid and subjectid
// // export async function GET(
// //   req: NextRequest,
// //   { params }: { params: { subjectid: string } }
// // ) {
// //   const { subjectid } = params; // From the dynamic route path
// //   const studentid = req.nextUrl.searchParams.get("studentid"); // From query parameter

// //   try {
// //     // Validate studentid presence
// //     if (!studentid) {
// //       return NextResponse.json(
// //         { error: "studentid query parameter is required" },
// //         { status: 400 }
// //       );
// //     }

// //     // Query the 'student' table to find the subjectid associated with the studentid
// //     const { data: studentData, error: studentError } = await supabase
// //       .from('student')
// //       .select('subjectid')
// //       .eq('studentid', studentid)
// //       .single();

// //     // Handle query errors or no matching student
// //     if (studentError) {
// //       console.error('Error querying student:', studentError);
// //       return NextResponse.json(
// //         { error: "Error querying student data" },
// //         { status: 500 }
// //       );
// //     }
// //     if (!studentData) {
// //       return NextResponse.json(
// //         { error: "Student not found" },
// //         { status: 404 }
// //       );
// //     }

// //     // Check if the subjectid from the route matches the one tied to the student
// //     if (studentData.subjectid !== subjectid) {
// //       return NextResponse.json(
// //         { error: "Subject ID does not match the student's associated subject" },
// //         { status: 403 }
// //       );
// //     }

// //     // Query the 'subjects' table for the full subject details
// //     const { data: subjectData, error: subjectError } = await supabase
// //       .from('subjects')
// //       .select('*')
// //       .eq('subjectid', subjectid)
// //       .single();

// //     // Handle subject query errors
// //     if (subjectError) {
// //       console.error('Error querying subject:', subjectError);
// //       return NextResponse.json(
// //         { error: "Error querying subject data" },
// //         { status: 500 }
// //       );
// //     }
// //     if (!subjectData) {
// //       return NextResponse.json(
// //         { error: "Subject not found" },
// //         { status: 404 }
// //       );
// //     }

// //     // Return the subject data
// //     return NextResponse.json(subjectData, { status: 200 });
// //   } catch (error) {
// //     // Log and handle unexpected errors
// //     console.error('Unexpected error fetching subject:', error);
// //     return NextResponse.json(
// //       { error: "Internal server error" },
// //       { status: 500 }
// //     );
// //   }
// // }


// /

// app/api/subjects/[subjectid]/route.js
import { NextRequest, NextResponse } from "next/server";
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  // const subjectid = request.nextUrl.pathname.split('/').pop(); // Extract subjectid from path
  const subjectid = searchParams.get('subjectid'); // Extract studentid from query
  const studentid = searchParams.get('studentid'); // Extract studentid from query

  if (!subjectid || !studentid) {
    return NextResponse.json(
      { error: 'Missing subjectid or studentid' },
      { status: 400 }
    );
  }

  try {
    const { data, error } = await supabase
      .from('student')
      .select('*')
      .eq('subjectid', subjectid)
      .single();

    if (error) {
      return NextResponse.json({ error: `Subject not found: Subject ID ${subjectid} Student ID ${studentid}` }, { status: 404 });
  
    }

    // Optionally, add studentid validation logic here if needed
    return NextResponse.json(data, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}