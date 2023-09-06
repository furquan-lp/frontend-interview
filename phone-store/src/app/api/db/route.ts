import { NextResponse } from 'next/server';
import conn from '@/app/lib/db';

export async function GET() {
  try {
    const query: string = 'SELECT * FROM phone_models;'
    const result = await conn.query(query);
    return NextResponse.json(result.rows);
  } catch (error) {
    console.error('DB Error encountered.', error);
  }
}