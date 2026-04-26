exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { prompt } = JSON.parse(event.body);
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            return { statusCode: 500, body: JSON.stringify({ error: "API Key missing in Netlify" }) };
        }

        // Using the 2026 stable production endpoint
        const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error("Google API detailed error:", data);
            return { statusCode: response.status, body: JSON.stringify(data) };
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "Response empty";

        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ result: text })
        };

    } catch (error) {
        console.error("Crash report:", error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};