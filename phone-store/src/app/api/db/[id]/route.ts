import conn from '@/app/lib/db';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const phoneQuery = await conn.query(`SELECT * FROM phone_models WHERE id = '${params.id}'`);
    if (phoneQuery.rows.length === 0) {
      return new Response(`Unknown id: '${params.id}'`, { status: 404 });
    } else {
      return new Response(JSON.stringify(phoneQuery.rows), {
        status: 200, headers: { 'Content-Type': 'application/json', }
      });
    }
  } catch (error) {
    console.error(`DB Error encountered in dynamic API route: api/db/${params.id}`, error);
    return new Response(`A database error occurred: ${error}`, { status: 400 });
  }
}