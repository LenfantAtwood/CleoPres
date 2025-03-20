// pages/subjects/[subjectId].tsx
import { GetServerSideProps } from 'next';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { subjectId } = context.params!;

  try {
    const subjectRes = await pool.query(
      'SELECT * FROM subjects WHERE subject_id = $1',
      [subjectId]
    );

    if (subjectRes.rows.length === 0) {
      return { notFound: true };
    }

    return {
      props: {
        subject: subjectRes.rows[0]
      }
    };
  } catch (err) {
    return { props: { error: 'Database error' } };
  }
};

const SubjectPage = ({ subject }) => {
  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">{subject.subject_name}</h1>
      <div className="prose max-w-none">
        {subject.content}
      </div>
    </div>
  );
};

export default SubjectPage;