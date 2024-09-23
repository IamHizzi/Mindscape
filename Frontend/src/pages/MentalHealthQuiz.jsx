import React, { useState, useEffect, useContext } from "react";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Typography, Grid, Paper, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

// Question pool: Add as many questions as you want in this array
const questionPool = [
  "How often have you felt down, depressed, or hopeless in the past two weeks?",
  "How often do you feel little interest or pleasure in doing things?",
  "How often have you felt tired or had little energy?",
  "How often have you felt bad about yourself, or that you're a failure?",
  "How often have you had trouble concentrating on things, such as reading or watching TV?",
  "How often have you felt nervous, anxious, or on edge?",
  "How often have you felt restless or unable to relax?",
  "How often have you had trouble sleeping, or felt overly tired during the day?",
  "How often have you been irritable or had difficulty controlling your temper?",
  "How often have you felt like you were moving or speaking so slowly that others might notice?",
  "How often have you felt that life is not worth living?",
];

// Function to shuffle the questions and pick 5 random ones
const getRandomQuestions = (pool, count) => {
  const shuffled = pool.sort(() => Math.random() - 0.5); // Shuffles the array
  return shuffled.slice(0, count); // Returns the first `count` number of questions
};

// Motivational notes based on the score
const getMotivationalNote = (score) => {
  if (score < 5) {
    return "You're doing well, but it's important to keep checking in with yourself. Stay positive!";
  } else if (score >= 5 && score < 10) {
    return "It seems like you're going through a tough time. It's okay to seek help and take care of yourself.";
  } else {
    return "Your mental health is important. Please consider talking to a professional to get support.";
  }
};

const MentalHealthQuiz = () => {
  const { isAuth } = useContext(AuthContext); // Check if the user is logged in
  const navigate = useNavigate(); // For navigation
  
  const [questions, setQuestions] = useState([]); // State for storing the 5 random questions
  const [answers, setAnswers] = useState([]); // State to store selected answers (0-3 values for each question)
  const [open, setOpen] = useState(false); // State for handling the dialog open/close

  // Fetch 5 random questions on component mount
  useEffect(() => {
    if (!isAuth) {
      navigate("/login"); // Redirect to login if not authenticated
    } else {
      const randomQuestions = getRandomQuestions(questionPool, 5); // Get 5 random questions
      setQuestions(randomQuestions);
      setAnswers(Array(randomQuestions.length).fill(0)); // Initialize answers for the 5 questions
    }
  }, [isAuth, navigate]);

  // Handler for answer change
  const handleAnswerChange = (questionIndex, value) => {
    const updatedAnswers = [...answers];
    updatedAnswers[questionIndex] = value;
    setAnswers(updatedAnswers);
  };

  // Calculate the total score
  const totalScore = answers.reduce((acc, answer) => acc + answer, 0);

  // Handler for submitting the quiz (showing the popup)
  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true); // Open the dialog
  };

  // Handler for closing the dialog
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="quiz-container p-8 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Mental Health Quiz
      </Typography>
      <Paper elevation={3} className="p-4">
        <form onSubmit={handleSubmit}>
          {/* Dynamically render the random 5 questions */}
          {questions.map((question, index) => (
            <FormControl fullWidth margin="normal" key={index}>
              <InputLabel
                htmlFor={`question-${index}`}
                sx={{ fontSize: '18px', fontWeight: 'bold' }} // Increase font size and weight
              >
                {`${index + 1}. ${question}`}
              </InputLabel>
              <Select
                id={`question-${index}`}
                value={answers[index]}
                onChange={(e) => handleAnswerChange(index, parseInt(e.target.value))}
                sx={{ fontSize: '1rem' }} // Ensure the select options are readable
              >
                <MenuItem value={0}>Not at all</MenuItem>
                <MenuItem value={1}>Several days</MenuItem>
                <MenuItem value={2}>More than half the days</MenuItem>
                <MenuItem value={3}>Nearly every day</MenuItem>
              </Select>
            </FormControl>
          ))}

          {/* Add a Submit button */}
          <Grid container justifyContent="center" mt={3}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              sx={{ fontSize: '1rem' }} // Increase font size of the button
            >
              Submit Quiz
            </Button>
          </Grid>
        </form>
      </Paper>

      {/* Dialog Box to Show Score and Motivational Note */}
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Quiz Results</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Your Total Score: {totalScore}</Typography>
          <Typography variant="body1" color="textSecondary" mt={2}>
            {getMotivationalNote(totalScore)}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default MentalHealthQuiz;
