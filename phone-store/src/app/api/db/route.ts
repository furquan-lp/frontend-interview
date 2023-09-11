import { NextResponse } from 'next/server';
import conn from '@/app/lib/db';

export async function GET() {
  try {
    const metadata = await conn.query('SELECT * FROM phone_metadata;');
    const brandsList: string[] = metadata.rows[0].brands;
    const map1 = new Map();
    for (const brand of brandsList) {
      const brandQuery = await conn.query(`SELECT * FROM phone_models WHERE brand = '${brand}';`);
      map1.set(brand, brandQuery.rows);
    }
    return NextResponse.json(Object.fromEntries(map1));
  } catch (error) {
    console.error('DB Error encountered.', error);
  }
}