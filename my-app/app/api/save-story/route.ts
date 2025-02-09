import { NextResponse } from 'next/server';
import { Pool } from 'pg';
import { stories } from '@/config/schema';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const requiredFields = [
      'title', 'storySubject', 'storyType', 
      'imageStyle', 'ageGroup', 'coverImage', 'chapters'
    ];

    const missingFields = requiredFields.filter(field => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: `Missing required fields: ${missingFields.join(', ')}` },
        { status: 400 }
      );
    }

    if (!Array.isArray(body.chapters) || body.chapters.length !== 5) {
      return NextResponse.json(
        { error: "Exactly 5 chapters required" },
        { status: 400 }
      );
    }

    const query = {
      text: `INSERT INTO stories (
        title, story_subject, story_type, image_style, age_group, cover_image, chapters
      ) VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb) RETURNING id`,
      values: [
        body.title,
        body.storySubject,
        body.storyType,
        body.imageStyle,
        body.ageGroup,
        body.coverImage,
        JSON.stringify(body.chapters)
      ]
    };

    const result = await pool.query(query);
    return NextResponse.json({ 
      success: true,
      storyId: result.rows[0].id 
    });

  } catch (error: any) {
    console.error("Database Error:", error);
    return NextResponse.json(
      { error: "Failed to save story", details: error.message },
      { status: 500 }
    );
  }
}