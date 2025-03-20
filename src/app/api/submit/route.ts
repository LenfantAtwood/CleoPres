import { unauthorized } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

interface FormData {
  studentID: string;
  [key: string]: any;
}

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const formData: FormData = await req.json();
    const { studentID } = formData;

    // Step 0: Validation
    // if failed return 200 with error message
    // do not care about studentID
    

    // Step 1: Check if student number exists in student table
    const { data: studentData, error: studentError } = await supabase
      .from('student')
      .select('studentid')
      .eq('studentid', studentID)
      .single();

      // failed case, that is error not null, return unauthorized
    if (studentError) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    // Step 2: Check if user has already submitted
    const { data: submissionData, error: submissionError } = await supabase
      .from('submissions')
      .select('id')
      .eq('studentid', studentID)
      .single();

    if (submissionData) {
      // return json
      return NextResponse.json(
        { error: "You have already submitted" },
        { status: 401 }
      );
    }

    // Step 3: Insert submission data
    const { error: insertError } = await supabase
      .from('submissions')
      .insert({
        studentid: studentID,
        submissiondata: formData,
        created_at: new Date().toISOString()
      });

    if (insertError) {
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
    // Step 4: Handle other errors
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}







// // import { unauthorized } from "next/navigation";
// // import { NextRequest, NextResponse } from "next/server";
// // // import { MongoClient, MongoClientOptions } from "mongodb";

// // // Define the type for the form data
// // interface FormData {
// //   [key: string]: any; // Adjust this to match your form data structure
// // }

// // // Load environment variables
// // const uri = process.env.MONGODB_URI as string; // MongoDB connection string
// // const dbName = process.env.MONGODB_DB as string; // Database name
// // const collectionName = process.env.MONGODB_COLLECTION as string; // Collection name

// // export async function POST(req: NextRequest) {
// //   try {
// //     // Validate incoming data
// //     const data: FormData = await req.json();
// //     if (!data) {
// //       return NextResponse.json({ message: "No data provided" }, { status: 400 });
// //     }

// //     // Connect to MongoDB
// //     const client = new MongoClient(uri, {
// //       useNewUrlParser: true,
// //       useUnifiedTopology: true,
// //     } as MongoClientOptions);

// //     await client.connect();

// //     // Insert data into MongoDB
// //     const db = client.db(dbName);
// //     const collection = db.collection(collectionName);
// //     const result = await collection.insertOne(data);

// //     // Close the connection
// //     await client.close();

// //     // Send success response
// //     return NextResponse.json(
// //       { message: "Data submitted successfully", result },
// //       { status: 201 }
// //     );
// //   } catch (error) {
// //     console.error("Error submitting data:", error);
// //     return NextResponse.json(
// //       { message: "Internal server error", error: error.message },
// //       { status: 500 }
// //     );
// //   }
// // }


// import { unauthorized } from "next/navigation";
// import { NextRequest, NextResponse } from "next/server";
// // import { MongoClient, MongoClientOptions } from "mongodb";

// // Define the type for the form data
// interface FormData {
//   [key: string]: any; // Adjust this to match your form data structure
// }



// import { createClient } from '@supabase/supabase-js';

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;

// export const supabase = createClient(supabaseUrl, supabaseKey);

// // now mock the interface with always return success without connecting to the database and validation
// export async function POST(req: NextRequest) {

//   const { data, error } = await supabase.from('your_table_name').select('*').limit(1);

//   try {
//   // TODO:
//   // step 1: check if user student number is in db, if not return unauthorized
//   // step 2: check if user has already submitted, if yes return unauthorized
//    // step 3: try insert data into db, if success return 201, if error return 500
//   // step 4: Other error

//   }

// //   return NextResponse.json(
// //     { message: "Data submitted successfully", result: { insertedId: "123" } },
// //     { status: 201 }
// //   );
// // } catch (error) {
// //   console.error("Error connecting to Supabase:", error);
// //   return NextResponse.json(
// //     { message: "Failed to connect to Supabase", error: error.message },
// //     { status: 500 }
// //   );


// //   return NextResponse.json(
// //     { message: "Data submitted successfully", result: { insertedId: "123" } },
// //     { status: 201 }
// //   );
// // }



// // 2 cases when submit:
// //   1. success
// //   2. error
// //     2.1 Error because validation failed
// //     2.2 Error because of server error, database error , ....
// //     2.3 Error because of unauthorized user OR user not found
// //     2.4 Error because of repeated submission









// // -- Drop the submissions table if it exists
// // DROP TABLE IF EXISTS submissions;
// // DROP TABLE IF EXISTS student;

// // -- Create the student table
// // CREATE TABLE student (
// //   studentID text primary key,  -- Unique identifier for each student
// //   studentName text not null,    -- Student's name
// //   chineseName text,             -- Student's name in Chinese
// //   subjectID text                -- Subject ID associated with the student
// // );


// // -- Create the submissions table
// // CREATE TABLE submissions (
// //   id uuid default uuid_generate_v4() primary key,    -- Unique identifier for each submission
// //   studentID text not null,                           -- Foreign key referencing student table
// //   submissionData jsonb not null,                     -- Stores the form data as JSON
// //   created_at timestamp with time zone default now(), -- Submission timestamp
// //   foreign key (studentID) references student(studentID)
// // );

// // -- Create index for faster lookups by studentID
// // CREATE INDEX idx_submissions_studentID ON submissions(studentID);