// We use 'node-fetch' if available, but Netlify supports global fetch now
exports.handler = async function(event, context) {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const { prompt } = JSON.parse(event.body);
        const apiKey = process.env.GEMINI_API_KEY;

        if (!apiKey) {
            console.error("MISSING API KEY IN NETLIFY ENV");
            return { statusCode: 500, body: JSON.stringify({ error: "API Key missing" }) };
        }

        // Updated URL for the latest Gemini model
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        const data = await response.json();

        // If Google sends an error, we need to see it in Netlify logs
        if (!response.ok) {
            console.error("Google API Error:", JSON.stringify(data));
            return { statusCode: response.status, body: JSON.stringify(data) };
        }

        const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response";

        return {
            statusCode: 200,
            body: JSON.stringify({ result: text })
        };

    } catch (error) {
        console.error("FUNCTION CRASH:", error);
        return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
    }
};
