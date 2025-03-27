import { NextRequest, NextResponse } from "next/server";
import { supabase } from '@/utils/supabaseClient';

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const studentid = searchParams.get('studentid');

  // Validate query parameters
  if (!studentid) {
    return NextResponse.json(
      { error: 'Missing required query parameter: studentid' },
      { status: 400 }
    );
  }

  try {
    // Query the 'student' table for the subjectid
    const { data, error } = await supabase
      .from('student')
      .select('studentid, subjectid')
      .eq('studentid', studentid)
      .single();


    // Handle query errors or no matching subject
    if (error || !data) {
      console.error(`Subject not found: Student ID ${studentid}`, error);
      return NextResponse.json(
        { error: `Subject not found: Student ID ${studentid}` },
        { status: 404 }
      );
    }

    // determine the subjectid
    const subjectid = data?.subjectid

    // handle if missing subjectid
    if (!subjectid) {
      console.error(`Subject ID missing: Student ID ${studentid}`);
      return NextResponse.json(
        { error: `Subject ID missing: Student ID ${studentid}` },
        { status: 404 }
      );
    }


    // Optionally, add studentid validation logic here if needed

    // Return the subject data
    return NextResponse.json(data, { status: 200 });

  } catch (err) {
    // Log and handle unexpected errors
    console.error('Unexpected error:', err);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}


// -----------------------------------------------------------------------------------
// Manual Test
//   Path: /workspaces/codespaces-blank/CleoPres/src/app/api/subjects/route.ts
// -----------------------------------------------------------------------------------
// data_will_pass = {"studentid": "dc32734"}
// data_will_fail = {"studentid": "123456"}
// data_missing_student_id = {"name": "John Doe"}
// curl -X GET http://localhost:3000/api/subjects?studentid=dc32734
// curl -X GET http://localhost:3000/api/subjects?studentid=123456
// curl -X GET http://localhost:3000/api/subjects
// -----------------------------------------------------------------------------------
