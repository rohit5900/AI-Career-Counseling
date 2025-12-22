const express = require('express');
const router = express.Router();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post('/message', async (req, res) => {
  const { message } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest"});
    
    const chat = model.startChat({
        history: [
            {
                role: "user",
                parts: [{ text: "You are a helpfull career counselor." }],
            },
            {
                role: "model",
                parts: [{ text: "Hello! I am ready to help you with your career planning." }],
            },
        ],
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    res.json({
      role: 'assistant',
      content: text
    });
  } catch (error) {
    console.error('Error calling Gemini:', error);
    res.status(500).json({ 
        role: 'assistant', 
        content: "I'm sorry, I'm having trouble connecting to my brain right now. Please try again later." 
    });
  }
});

module.exports = router;
