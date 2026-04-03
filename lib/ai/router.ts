import Groq from 'groq-sdk'
import { GoogleGenerativeAI } from '@google/generative-ai'
import Anthropic from '@anthropic-ai/sdk'
import type { AIProvider, AITask, AIResponse } from '@/types'

const groq      = new Groq({ apiKey: process.env.GROQ_API_KEY })
const genAI     = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

export const AI_ROUTING: Record<AITask, AIProvider> = {
  search:    'groq',
  chat:      'groq',
  checklist: 'gemini',
  seasonal:  'gemini',
  planner:   'groq',
}

export const AI_MODELS: Record<AIProvider, string> = {
  groq:   'llama-3.3-70b-versatile',
  gemini: 'gemini-1.5-flash',
  claude: 'claude-sonnet-4-5',
}

export async function callGroq(
  systemPrompt: string,
  userMessage: string,
  maxTokens: number = 1000
): Promise<AIResponse> {
  const response = await groq.chat.completions.create({
    model: AI_MODELS.groq,
    max_tokens: maxTokens,
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user',   content: userMessage },
    ],
    temperature: 0.7,
  })
  return {
    content:     response.choices[0]?.message?.content || '',
    provider:    'groq',
    model:       AI_MODELS.groq,
    tokens_used: response.usage?.total_tokens,
  }
}

export async function callGemini(
  systemPrompt: string,
  userMessage: string,
  maxTokens: number = 2000
): Promise<AIResponse> {
  const model = genAI.getGenerativeModel({
    model: AI_MODELS.gemini,
    systemInstruction: systemPrompt,
    generationConfig: { maxOutputTokens: maxTokens, temperature: 0.7 },
  })
  const result = await model.generateContent(userMessage)
  return {
    content:  result.response.text(),
    provider: 'gemini',
    model:    AI_MODELS.gemini,
  }
}

export async function callClaude(
  systemPrompt: string,
  userMessage: string,
  maxTokens: number = 3000
): Promise<AIResponse> {
  const response = await anthropic.messages.create({
    model:      AI_MODELS.claude,
    max_tokens: maxTokens,
    system:     systemPrompt,
    messages:   [{ role: 'user', content: userMessage }],
  })
  const content = response.content[0]
  return {
    content:     content.type === 'text' ? content.text : '',
    provider:    'claude',
    model:       AI_MODELS.claude,
    tokens_used: response.usage.input_tokens + response.usage.output_tokens,
  }
}

export async function routeAI(
  task: AITask,
  systemPrompt: string,
  userMessage: string,
  options?: { maxTokens?: number; forceProvider?: AIProvider }
): Promise<AIResponse> {
  const provider  = options?.forceProvider ?? AI_ROUTING[task]
  const maxTokens = options?.maxTokens

  try {
    switch (provider) {
      case 'groq':   return await callGroq(systemPrompt, userMessage, maxTokens)
      case 'gemini': return await callGemini(systemPrompt, userMessage, maxTokens)
      case 'claude': return await callClaude(systemPrompt, userMessage, maxTokens)
    }
  } catch (err) {
    console.error(`AI provider ${provider} failed, falling back to groq:`, err)
    if (provider !== 'groq') {
      return await callGroq(systemPrompt, userMessage, maxTokens)
    }
    throw err
  }
}

export const SYSTEM_PROMPTS = {
  planner: `You are DivyaDarshan's expert AI pilgrimage planner with deep knowledge of every Hindu temple, pilgrimage circuit, and yatra route across India. You help devotees plan sacred journeys that are logistically sound, spiritually meaningful, and within their budget.

Always respond with a structured, day-by-day itinerary in this exact format:
**Day 1: [City/Temple]**
- Morning: [Activity + time]
- Afternoon: [Activity + time]
- Evening: [Activity + time]
- Stay: [Accommodation suggestion]
- Tip: [One insider tip]

After the itinerary, add:
**Total Estimated Budget:** ₹X,XXX per person
**Best Time to Go:** [Season]
**Key Booking:** [What to pre-book]
**Dress Code:** [What to wear]`,

  search: `You are a knowledgeable guide for DivyaDarshan, India's temple explorer. A user is searching for temples. Based on their query, suggest the most relevant temples from India's sacred sites. Be concise and helpful. Focus on: temple name, location, why it matches their search, and one unique fact. Format as a clean list.`,

  checklist: `You are a meticulous yatra preparation expert for DivyaDarshan. Generate a comprehensive, destination-specific packing checklist. Organize by category: Documents, Clothing & Attire, Temple Essentials, Health & Safety, Comfort & Tech, and any destination-specific extras. For each item, mark as MUST or RECOMMENDED. Be specific to the destination, season, and pilgrim type.`,

  seasonal: `You are DivyaDarshan's festival and seasonal guide. Provide detailed recommendations for the best temples to visit this month, organized by: Major Festivals happening, Best Weather destinations, Spiritual Significance, and Crowd Tips. Be enthusiastic but accurate.`,
}
