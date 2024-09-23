const { OpenAI } = require('openai');
const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const natural = require('natural');


const app = express();
const port = 5000; // Ensure this matches the port used in the React app
app.use(bodyParser.json());
app.use(cors());

const llamaUrl = 'https://www.llama2.ai/api'; // Replace with actual Llama2 API URL
const llamaHeaders = {
    'Content-Type': 'application/json',
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36'
};

app.post('/chatbot_response', async (request, res) => {
  const { message } = request.body; // Extracting the message from frontend request

  // Define the Llama2 prompt and request body using the message from frontend
  const body = JSON.stringify({
    prompt: `<s>[INST] <<SYS>>\nYou are a helpful mental assistant.\n<</SYS>>\n\n ${message} [/INST]\n`,
    model: 'meta/llama-2-70b-chat',
    temperature: 0.75,
    topP: 0.9,
    maxTokens: 1024,
    image: null,
    audio: null
  });

  axios.post(llamaUrl, body, { llamaHeaders })
    .then(response => {
        res.json({
          response: response.data.trim(), 
        });
    })
    .catch(error => {
        console.error('Error:', error.message);
    });
});

// const openai = new OpenAI({
//   apiKey: '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',
// });

// app.post('/chatbot_response', async (request, response) => {
//   const { message } = request.body;

//   try {
//     const result = await openai.chat.completions.create({
//       model: 'gpt-3.5-turbo',
//       messages: [
//         {
//           role: 'system',
//           content: 'You are GPT. You can help with MENTAL hEALTH',
//         },
//         {
//           role: 'user',
//           content: message,
//         },
//       ],
//     });

//     response.json({
//       response: result.choices[0].message.content,
//     });
//   } catch (error) {
//     console.error('Error processing request:', error);
//     response.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// Expanded emotion keywords
const emotionKeywords = {
  happy: ['happy', 'joy', 'excited', 'great', 'awesome', 'elated', 'content', 'pleased', 'cheerful'],
  sad: ['sad', 'depressed', 'unhappy', 'down', 'miserable', 'blue', 'gloomy', 'melancholy', 'sorrow'],
  angry: ['angry', 'furious', 'mad', 'enraged', 'irate', 'annoyed', 'outraged', 'infuriated', 'frustrated'],
  surprised: ['surprised', 'shocked', 'amazed', 'stunned', 'astonished', 'startled', 'bewildered', 'confounded'],
  neutral: ['fine', 'okay', 'normal', 'average', 'neutral', 'indifferent', 'apathetic', 'meh', 'so-so']
};

// Function to analyze text and detect emotions based on keyword scores
const analyzeEmotions = (text) => {
  const lowerText = text.toLowerCase();
  const emotionScores = { happy: 0, sad: 0, angry: 0, surprised: 0, neutral: 0 };

  for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
    for (const keyword of keywords) {
      const keywordRegex = new RegExp(`\\b${keyword}\\b`, 'g');
      const matches = (lowerText.match(keywordRegex) || []).length;
      emotionScores[emotion] += matches;
    }
  }

  // Determine the emotion with the highest score
  let detectedEmotion = 'neutral';
  const maxScore = Math.max(...Object.values(emotionScores));
  if (maxScore > 0) {
    detectedEmotion = Object.keys(emotionScores).find(emotion => emotionScores[emotion] === maxScore);
  }

  // Generate a detailed report with mental health recommendations and guided meditation suggestions
  let report;
  switch (detectedEmotion) {
    case 'happy':
      report = {
        message: 'Your message seems upbeat and positive. Keep spreading the joy!',
        recommendation: 'Consider sharing your positive experiences with friends or family. Engaging in activities that you love can further boost your happiness.',
        meditation: 'Try a gratitude meditation: Reflect on things you’re grateful for and allow yourself to experience positive feelings associated with them.',
      };
      break;
    case 'sad':
      report = {
        message: 'Your message indicates sadness. Consider talking to someone who can provide support.',
        recommendation: 'Reach out to a friend, family member, or counselor. Sometimes sharing your feelings can make a big difference. Engage in activities that uplift your mood, like walking in nature or reading a favorite book.',
        meditation: 'Try a self-compassion meditation: Focus on being kind and understanding towards yourself, especially in moments of difficulty.',
      };
      break;
    case 'angry':
      report = {
        message: 'You seem frustrated or angry. Taking a few deep breaths might help you feel better.',
        recommendation: 'Identify the source of your anger and consider healthy ways to address it. Engage in physical activity or relaxation techniques to help manage your anger.',
        meditation: 'Try a calming meditation: Focus on your breath and imagine letting go of the anger as you exhale. Visualization techniques can help in reducing emotional intensity.',
      };
      break;
    case 'surprised':
      report = {
        message: 'Your message conveys surprise. It’s always interesting to encounter the unexpected!',
        recommendation: 'Embrace the new experience and reflect on what surprised you. Sometimes surprise can lead to new opportunities or insights. Share your experience with others if you feel comfortable.',
        meditation: 'Try an openness meditation: Allow yourself to be open to new experiences and acknowledge the emotions that come with them without judgment.',
      };
      break;
    default:
      report = {
        message: 'Your message seems neutral, with no strong emotions detected. Stay balanced!',
        recommendation: 'Maintain your balanced state by engaging in activities that keep you grounded, such as exercise, mindfulness, or connecting with loved ones.',
        meditation: 'Try a grounding meditation: Focus on your present environment and sensations to stay connected and centered.',
      };
      break;
  }

  return {
    emotion: detectedEmotion,
    report
  };
};

// Route for analyzing text and returning emotion analysis
app.post('/analyzeText', (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const emotionAnalysis = analyzeEmotions(text);

  res.json(emotionAnalysis);
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
