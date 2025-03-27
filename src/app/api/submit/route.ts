import { NextRequest, NextResponse } from "next/server";
import { supabase } from '@/utils/supabaseClient';

interface FormData {
  studentid: string;
  [key: string]: any;
}

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const formData: FormData = await req.json();
    const { studentid } = formData;

    // Step 0: Validation
    if (!studentid) {
      return NextResponse.json(
        { error: "Missing student ID" },
        { status: 400 }
      );
    }

    // Step 1: Check if student number exists in student table
    const { data: studentData, error: studentError } = await supabase
      .from('student')
      .select('studentid')
      .eq('studentid', studentid)
      .single();

    if (studentError || !studentData) {
      console.error('Student not found or error querying student:', studentError);
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Step 2: Check if user has already submitted
    const { data: submissionData, error: submissionError } = await supabase
      .from('submissions')
      .select('id')
      .eq('studentid', studentid)
      .single();

    if (submissionError) {
      console.error('Error querying submissions:', submissionError);
      return NextResponse.json(
        { error: "Internal server error" },
        { status: 500 }
      );
    }

    if (submissionData) {
      return NextResponse.json(
        { error: "You have already submitted" },
        { status: 409 } // Conflict status code
      );
    }

    // Step 3: Insert submission data
    const { error: insertError } = await supabase
      .from('submissions')
      .insert({
        studentid: studentid,
        submissiondata: formData,
        created_at: new Date().toISOString()
      });

    if (insertError) {
      console.error('Error inserting submission:', insertError);
      return NextResponse.json(
        { error: `Failed to insert submission: ${insertError.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Successfully submitted" },
      { status: 201 }
    );

  } catch (error) {
    console.error('Unexpected error:', error);
    return NextResponse.json(
      { error: `Internal server error: ${error instanceof Error ? error.message : 'Unknown error'}` },
      { status: 500 }
    );
  }
}


// -----------------------------------------------------------------------------------
// Manual Test
//   Path: /workspaces/codespaces-blank/CleoPres/src/app/api/submit/route.ts
// -----------------------------------------------------------------------------------
// data_will_fail = {"studentid": "123456"}
// data_will_pass = {"studentid": "dc32734"}

// Now fake the form data
// TODO:
// curl -X POST http://localhost:3000/api/submit -H "Content-Type: application/json" -d '{"studentid": "dc32734"}'
// curl -X POST http://localhost:3000/api/submit -H "Content-Type: application/json" -d '{"studentid": "123456"}'
// -----------------------------------------------------------------------------------
