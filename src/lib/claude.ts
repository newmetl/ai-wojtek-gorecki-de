// Claude API Client — Wird in Schritt 5 (Scraping) + Phase 4 (User Story Generator) verwendet
import Anthropic from "@anthropic-ai/sdk";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const CLAUDE_MODEL = "claude-sonnet-4-20250514";
