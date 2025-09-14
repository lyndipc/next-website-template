import { NextRequest, NextResponse } from "next/server";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
  category: string;
}

export async function POST(request: NextRequest) {
  try {
    const data: ContactFormData = await request.json();

    if (
      !data.name ||
      !data.email ||
      !data.subject ||
      !data.message ||
      !data.category
    ) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 },
      );
    }

    const airtableData = {
      fields: {
        Name: data.name.trim(),
        Email: data.email.trim().toLowerCase(),
        Subject: `${data.subject.trim()}`,
        Message: data.message.trim(),
        Category: data.category.trim(),
        "Submitted At": new Date().toISOString(),
        Status: "New",
        "Source App": "Fake Company",
      },
    };

    const response = await fetch(
      `https://api.airtable.com/v0/${process.env.AIRTABLE_BASE_ID}/${process.env.AIRTABLE_TABLE_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.AIRTABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(airtableData),
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Airtable API Error:", errorData);

      console.error("Data sent to Airtable:", airtableData);

      throw new Error(`Airtable API error: ${response.status}`);
    }

    const result = await response.json();

    return NextResponse.json({
      success: true,
      message: "Your message has been sent successfully!",
      id: result.id,
    });
  } catch (error) {
    console.error("Contact API Error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 },
    );
  }
}
