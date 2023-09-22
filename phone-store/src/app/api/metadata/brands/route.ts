import { NextResponse } from 'next/server';
import conn from '@/app/lib/db';

export async function GET() {
  try {
    const metadata = await conn.query('SELECT * FROM phone_metadata;');
    return NextResponse.json(metadata.rows[0].brands);
  } catch (error) {
    console.error('DB Error encountered.', error);
    return NextResponse.json({ status: 400 });
  }
}