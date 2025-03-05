import { supabase } from "@/lib/supabase";

export interface ChatMessage {
  role: "system" | "user" | "assistant";
  content: string;
}

export async function callLLMApi(
  messages: ChatMessage[],
  apiKey?: string,
): Promise<string> {
  try {
    // Mock response for development - simulates API response
    // This will be used when no API key is provided or API calls fail
    const mockResponses = [
      "I can help you with that! Based on your learning goals, I'd recommend focusing on structured practice sessions with regular breaks.",
      "That's a great question about learning. Research shows that spaced repetition and active recall are the most effective study techniques.",
      "Looking at your progress, you're doing well! Consider adding more practical exercises to reinforce the theoretical concepts you've learned.",
      "For your current learning path, I'd recommend these resources: Khan Academy for fundamentals, Coursera for structured courses, and GitHub projects for practical application.",
      "To improve your retention, try the Pomodoro technique: 25 minutes of focused study followed by a 5-minute break. This helps maintain concentration while preventing burnout.",
    ];

    // Return a mock response if no API key or in development mode
    if (
      (!apiKey && !import.meta.env.VITE_GEMINI_API_KEY) ||
      import.meta.env.DEV
    ) {
      return mockResponses[Math.floor(Math.random() * mockResponses.length)];
    }

    // Always try Google Gemini API first if API key is provided
    if (import.meta.env.VITE_GEMINI_API_KEY) {
      const geminiApiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${geminiApiKey}`;

      // Format messages for Gemini API
      const geminiContent = messages.map((msg) => ({
        role: msg.role === "assistant" ? "model" : msg.role,
        parts: [{ text: msg.content }],
      }));

      const response = await fetch(geminiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: geminiContent,
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 500,
            topP: 0.95,
            topK: 40,
          },
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return (
          data.candidates[0]?.content?.parts[0]?.text ||
          "I couldn't process your request."
        );
      }
    }

    // Only try OpenAI as fallback if Gemini fails and OpenAI API key is provided
    if (apiKey && !import.meta.env.VITE_GEMINI_API_KEY) {
      const response = await fetch(
        "https://api.openai.com/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages,
            temperature: 0.7,
            max_tokens: 500,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        return (
          data.choices[0]?.message?.content ||
          "I couldn't process your request."
        );
      }
    }

    // Fallback to Supabase Edge Functions if available
    const { data, error } = await supabase.functions.invoke("chat-completion", {
      body: { messages },
    });

    if (error) throw new Error(error.message);
    return data?.response || "I couldn't process your request.";
  } catch (error) {
    console.error("Error calling LLM API:", error);
    // Return a mock response when API calls fail
    return "I'm having trouble connecting to my knowledge base right now. Based on your question, I'd recommend exploring different learning techniques like spaced repetition and active recall to improve retention.";
  }
}

// Store chat history in Supabase if user is authenticated
export async function saveChatHistory(userId: string, messages: ChatMessage[]) {
  try {
    const { error } = await supabase.from("chat_history").insert({
      user_id: userId,
      messages,
      created_at: new Date().toISOString(),
    });

    if (error) throw error;
  } catch (error) {
    console.error("Error saving chat history:", error);
  }
}

// Retrieve chat history from Supabase
export async function getChatHistory(userId: string) {
  try {
    const { data, error } = await supabase
      .from("chat_history")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error retrieving chat history:", error);
    return [];
  }
}
