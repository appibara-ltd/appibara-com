"use server";
import "server-only";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { GoogleGenAI, Type } from "@google/genai";
import { AiSuggestion } from "../types";

const GEMINI_REFERENCE_RESOLUTION = 1000;

const PADDING_PIXELS = 5;

const API_TIMEOUT_MS = 60000;

// HARDCODED API KEY
const API_KEY = process.env.G_API_KEY;

// Utility to convert File to base64 for the API
const fileToGenerativePart = async (file: File) => {
  // For already supported MIME types (like PNG, JPEG)
  // Fallback to image/jpeg if type is missing
  const mimeType = file.type || "image/jpeg";

  return {
    inlineData: {
      data: Buffer.from(await file.arrayBuffer()).toString("base64"),
      mimeType,
    },
  };
};

export async function findSensitiveInfo(
  imageFile: File,
  imageSize: { width: number; height: number },
): Promise<Omit<AiSuggestion, "id">[]> {
  // Use the hardcoded key
  const ai = new GoogleGenAI({ apiKey: API_KEY });

  const imagePart = await fileToGenerativePart(imageFile);

  // Prompt updated to increase detection power and make the model more aggressive
  const prompt = `You are an expert AI dedicated to finding ALL sensitive information in the provided screenshot. Analyze this image thoroughly and identify every instance of sensitive data, no matter how small or obfuscated. Your goal is 100% detection accuracy.

Identify and classify any of the following types based on their content from the GLOBAL SENSITIVE INFORMATION LIST:

1.  Personally Identifiable Information (PII): (e.g., Full name, home address, email, phone number, national ID, passport, driver's license, date of birth, IP address, device ID, geolocation, personal photos, biometric identifiers, online account identifiers).
2.  Financial Information (e.g., Credit card/bit card numbers, CVV, expiration date, bank account numbers, IBAN, transaction records, account balance, tax ID, VAT numbers, investment/salary information, loan details, crypto wallets, payment service IDs).
3.  Health and Medical Information (e.g., Medical history, conditions, diagnoses, test results, prescriptions, health insurance ID, genetic/DNA data, mental health notes, disability/treatment information, vaccination status, hospital records).
4.  Biometric & Behavioral Data (e.g., Fingerprints, iris/retina/palm scans, facial recognition data, voice recordings for identification, typing rhythm, gait patterns).
5.  Government & Legal Identifiers (e.g., Passport, visa, driver's license, voter ID, tax records, social security data, court documents, police records, criminal data, residence/work permit numbers, military/government service numbers).
6.  Employment & Education Data (e.g., Employee ID, HR data, job titles, salary, performance reviews, academic transcripts, degrees, student ID, work email, internal systems credentials, CVs, portfolios, references).
7.  Communication & Personal Content (e.g., Private messages, chats, emails, call logs, voice messages, social media DMs, comments, attachments containing sensitive text, personal notes/journals).
8.  Credentials & Access Information (e.g., Passwords, PIN codes, API keys, tokens, secrets, encryption keys, certificates, SSH keys, system access tokens, authentication QR codes).
9.  Demographic & Sensitive Personal Attributes (e.g., Gender, sexual orientation, race, ethnicity, national origin, religion, beliefs, political opinions, union membership, marital status, family data, citizenship, refugee status).
10. Location & Tracking Data (e.g., GPS coordinates, home/work location, travel history, routes, check-ins, event locations, map screenshots with identifiable regions).
11. Corporate Confidential Information (e.g., Customer names, CRM data, internal project/code names, product roadmaps, unreleased features, pricing, quotes, contracts, legal documents, NDAs, internal memos, source code, repo URLs, API endpoints, server IPs).
12. Visual & Document Data (e.g., Photos containing people or private settings, IDs, badges, business cards, screenshots of apps with personal data, scanned forms, invoices, bills).

For each piece of sensitive information FOUND, you MUST provide its exact text, its classification type (choose one from the 12 main categories above), a confidence score from 0.0 to 1.0, and its precise bounding box (x, y, width, height) in pixels relative to the top-left corner (0,0) of the image.

**CRITICAL INSTRUCTION: If you find NO sensitive information, you must return an empty list in the JSON response: {"redactions": []}. DO NOT miss any sensitive information.** The coordinates MUST be normalized to a 1000x1000 scale, which is the internal analysis resolution.`;

  const apiCallPromise = ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [
      {
        parts: [{ text: prompt }, imagePart],
      },
    ],
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          redactions: {
            type: Type.ARRAY,
            description:
              "A list of sensitive information with its type, confidence, text, and bounding box.",
            items: {
              type: Type.OBJECT,
              properties: {
                x: {
                  type: Type.NUMBER,
                  description: "The x-coordinate of the top-left corner.",
                },
                y: {
                  type: Type.NUMBER,
                  description: "The y-coordinate of the top-left corner.",
                },
                width: {
                  type: Type.NUMBER,
                  description: "The width of the bounding box.",
                },
                height: {
                  type: Type.NUMBER,
                  description: "The height of the bounding box.",
                },
                text: {
                  type: Type.STRING,
                  description: "The sensitive text that was found.",
                },
                type: {
                  type: Type.STRING,
                  description:
                    "The classification of the sensitive information (e.g., 'Email', 'Phone').",
                },
                confidence: {
                  type: Type.NUMBER,
                  description: "The confidence score from 0.0 to 1.0.",
                },
              },
              required: [
                "x",
                "y",
                "width",
                "height",
                "text",
                "type",
                "confidence",
              ],
            },
          },
        },
        required: ["redactions"],
      },
    },
  });

  const timeoutPromise = new Promise((_, reject) => {
    const timeoutId = setTimeout(() => {
      reject(
        new Error(
          `API request timed out after ${API_TIMEOUT_MS / 1000} seconds`,
        ),
      );
    }, API_TIMEOUT_MS);
    apiCallPromise.finally(() => clearTimeout(timeoutId));
  });

  let response;
  try {
    // Manage timeout
    response = await Promise.race([apiCallPromise, timeoutPromise]);
  } catch (error) {
    console.error("Gemini API Error (Timeout or Network):", error);
    throw error;
  }

  try {
    const jsonString = (response as any).text.trim();
    const result = JSON.parse(jsonString);

    if (result.redactions && Array.isArray(result.redactions)) {
      // Stability fix: Dynamic padding increased from 0.5% to 0.7%.
      const dynamicPadding = imageSize.width * 0.007;

      // Combine fixed (5px) and dynamic padding.
      const totalPadding = dynamicPadding + PADDING_PIXELS;

      const scaledRedactions = result.redactions
        .map((r: any) => {
          // 1. Calculate scale factor (based on 1000 reference)
          const scaleX = imageSize.width / GEMINI_REFERENCE_RESOLUTION;
          const scaleY = imageSize.height / GEMINI_REFERENCE_RESOLUTION;

          const scaledX = r.x * scaleX;
          const scaledY = r.y * scaleY;
          const scaledWidth = r.width * scaleX;
          const scaledHeight = r.height * scaleY;

          // 2. Enlarge the box by TOTAL PADDING
          return {
            x: scaledX - totalPadding,
            y: scaledY - totalPadding,
            width: scaledWidth + totalPadding * 2,
            height: scaledHeight + totalPadding * 2,

            text: r.text,
            type: r.type,
            confidence: r.confidence,
          };
        })
        .filter(
          (r: any) =>
            // Filtering and validation
            typeof r.x === "number" &&
            typeof r.y === "number" &&
            typeof r.width === "number" &&
            typeof r.height === "number" &&
            typeof r.text === "string" &&
            typeof r.type === "string" &&
            typeof r.confidence === "number" &&
            r.width > 0 &&
            r.height > 0 &&
            r.text.trim().length > 0 &&
            r.type.trim().length > 0,
        );

      return scaledRedactions;
    }
    return [];
  } catch (e) {
    console.error(
      "Error processing Gemini response:",
      e,
      "Response text:",
      (response as any)?.text,
    );
    throw new Error("Could not process the AI response after receiving it.");
  }
}
