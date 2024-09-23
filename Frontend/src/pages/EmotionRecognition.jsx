import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  CircularProgress,
  Box,
  Chip,
} from "@mui/material";

const EmotionRecognition = () => {
  const [textInput, setTextInput] = useState('');
  const [transcribedText, setTranscribedText] = useState('');
  const [emotion, setEmotion] = useState(null);
  const [emotionReport, setEmotionReport] = useState('');
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);

  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.continuous = false;
  recognition.interimResults = false;
  recognition.lang = 'en-US';

  const startListening = () => {
    setListening(true);
    recognition.start();

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setTranscribedText(transcript);
      setTextInput(transcript);
      setListening(false);
    };

    recognition.onerror = (event) => {
      console.error('Speech recognition error:', event.error);
      setListening(false);
    };

    recognition.onend = () => {
      setListening(false);
    };
  };

  const handleTextSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/analyzeText', { text: textInput });
      setEmotion(response.data.emotion);
      setEmotionReport(response.data.report || {});
    } catch (error) {
      console.error('Error analyzing text:', error);
    }
    setLoading(false);
  };

  const getEmotionColor = (emotion) => {
    switch (emotion) {
      case 'happy':
        return 'success';
      case 'sad':
        return 'primary';
      case 'angry':
        return 'error';
      case 'surprised':
        return 'warning';
      case 'neutral':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" component="h1" gutterBottom style={{ color: 'white' }}>
        Emotion Recognition from Speech and Text
      </Typography>

      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              label="Enter text here"
              fullWidth
              multiline
              rows={4}
              variant="outlined"
              value={textInput}
              onChange={(e) => setTextInput(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleTextSubmit}
              disabled={loading}
            >
              {loading ? <CircularProgress size={24} /> : "Analyze Text"}
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={3} style={{ padding: '20px', marginBottom: '20px' }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Button
              variant="outlined"
              onClick={startListening}
              disabled={listening}
            >
              {listening ? 'Listening...' : 'Start Speaking'}
            </Button>
          </Grid>
          {transcribedText && (
            <Grid item xs={12}>
              <Typography variant="body1">
                <strong>Transcribed Speech:</strong> {transcribedText}
              </Typography>
            </Grid>
          )}
        </Grid>
      </Paper>

      {loading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}

      {emotion && (
        <Paper elevation={3} style={{ padding: '20px', marginTop: '20px' }}>
        <Typography variant="h4" gutterBottom>
          Sentiment Analysis
        </Typography>
        <Chip
          label={emotion.toUpperCase()}
          color={getEmotionColor(emotion)}
          style={{ fontSize: '20px', padding: '10px', marginBottom: '20px' }}
        />
        <Typography variant="body1" style={{ marginBottom: '10px' }}>
          <strong>Message:</strong> {emotionReport.message}
        </Typography>
        <Typography variant="body1" style={{ marginBottom: '10px' }}>
          <strong>Recommendation:</strong> {emotionReport.recommendation}
        </Typography>
        <Typography variant="body1">
          <strong>Guided Meditation:</strong> {emotionReport.meditation}
        </Typography>
      </Paper>
      )}
    </Container>
  );
};

export default EmotionRecognition;
