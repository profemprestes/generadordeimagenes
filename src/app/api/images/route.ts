
import { NextResponse } from 'next/server';
import path from 'path';
import { promises as fs } from 'fs';

export async function GET() {
  try {
    // Construct the path to the JSON file
    const jsonDirectory = path.join(process.cwd(), 'src', 'lib');
    const fileContents = await fs.readFile(path.join(jsonDirectory, 'imagenes.json'), 'utf8');
    
    // Parse the JSON data and return it
    const data = JSON.parse(fileContents);
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error reading image profiles:', error);
    return NextResponse.json({ error: 'Failed to load image profiles' }, { status: 500 });
  }
}
