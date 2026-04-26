exports.handler = async function(event, context) {
    // Senior Dev Rule: Only allow POST requests for security
    if (event.httpMethod !== "POST") {
        return { 
            statusCode: 405, 
            body: JSON.stringify({ error: "Method Not Allowed" }) 
        };
    }

    try {
        // 1. Parse the prompt sent from your frontend index.html
        const { prompt } = JSON.parse(event.body);
        
        // 2. Access the hidden API key from Netlify's Environment Variables
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return { 
                statusCode: 500, 
                body: JSON.stringify({ error: "Server Error: API key missing in vault." }) 
            };
        }

        // 3. Define the Google Gemini API endpoint
       // Change the model name to gemini-1.5-flash
         const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        // 4. Make the secure request to Google
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Google API Error:", errorData);
            throw new Error(`Google API responded with status ${response.status}`);
        }
        
        const data = await response.json();
        const generatedText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";

        // 5. Return the AI response back to your index.html
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ result: generatedText })
        };

    } catch (error) {
        console.error("Backend Function Error:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ error: "Internal Server Error during AI processing." })
        };
    }
};