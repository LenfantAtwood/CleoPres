import { unauthorized } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

interface FormData {
  studentNumber: string;
  name: string;
  [key: string]: any;
}

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
// here only checks if the user is authorized, so return either 401 or 200
  try {
    // Parse request body
    const formData: FormData = await req.json();
    const { studentNumber } = formData;
    const { name } = formData;

    // Step 0: Validation
    // if failed return 200 with error message
    // do not care about studentID
    // Step 1: Check if student number exists in student table
    const { data: studentData, error: studentError } = await supabase
      .from('student')
      .select('studentid')
      .eq('studentid', studentNumber)
      .eq('studentname', name)
      .single();

    // failed case, that is error not null, return unauthorized
    if (studentError) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Authorized" },
      { status: 200 }
    );

  }
  catch (error) {
    return NextResponse.json(
      { error: `Internal server error: ${error.message}` },
      { status: 500 }
    );
  }

}
