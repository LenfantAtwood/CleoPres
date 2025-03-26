import { NextRequest, NextResponse } from "next/server";
import { supabase } from '@/utils/supabaseClient';

interface FormData {
  studentNumber: string;
  name: string;
  [key: string]: any;
}


export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const formData: FormData = await req.json();
    const { studentNumber, name } = formData;

    // Step 0: Validation
    if (!studentNumber || !name) {
      return NextResponse.json(
        { error: "Missing student number or name" },
        { status: 400 }
      );
    }

    // Step 1: Check if student number and name exist in the student table
    const { data: studentData, error: studentError } = await supabase
      .from('student')
      .select('subjectid, studentid, studentname')
      .eq('studentid', studentNumber)
      .eq('studentname', name)
      .single();

    // Handle query errors or no matching student
    if (studentError || !studentData) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Extract subjectid from studentData
    const { subjectid } = studentData;

    // Return success response with subjectid
    return NextResponse.json(
      { message: "Authorized", subjectid },
      { status: 200 }
    );

  } catch (error) {
    // Log and handle unexpected errors
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}


// -----------------------------------------------------------------------------------
// Manual Test
//       File loc: CleoPres/src/app/api/login/route.ts
// -----------------------------------------------------------------------------------
// now do unit test manually using curl
// data_will_fail = {"studentNumber": "123456", "name": "John Doe"}
// data_will_pass = {"studentNumber": "dc32734", "name": "Hong Ziyan"}
// data_missing_student_number = {"name": "John Doe"}
// data_missing_name = {"studentNumber": "123456"}
// curl -X POST -H "Content-Type: application/json" -d '{"studentNumber": "123456", "name": "John Doe"}' http://localhost:3000/api/login
// curl -X POST -H "Content-Type: application/json" -d '{"studentNumber": "dc32734", "name": "Hong Ziyan"}' http://localhost:3000/api/login
// curl -X POST -H "Content-Type: application/json" -d '{"name": "John Doe"}' http://localhost:3000/api/login
// curl -X POST -H "Content-Type: application/json" -d '{"studentNumber": "123456"}' http://localhost:3000/api/login
// -----------------------------------------------------------------------------------
