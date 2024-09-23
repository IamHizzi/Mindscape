
import botImage from '../airobot.png';
// Frontend: ChatPage.js (React Component)
import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { FaPaperPlane } from 'react-icons/fa';
import styled, { createGlobalStyle } from 'styled-components';


const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap');

  body {
    font-family: 'Poppins', sans-serif;
    background-color: #121212;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    color: #ffffff;
  }
`;

const Container = styled.div`
  display: flex;
  width: 90%;
  max-width: 1400px;
  height: 80vh;
  background-color: #1e1e1e;
  border-radius: 10px;
  border: 2px solid #00bcd4;
  box-shadow: 0 8px 15px rgba(0, 0, 0, 0.5);
  overflow: hidden;
`;

const ChatSection = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
  background-color: #000000;
`;

const DesignSection = styled.div`
  flex: 1;
  background: linear-gradient(to top, #2e2e4f, #00bcd4);
  color: #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1rem;
`;

const BotImage = styled.img`
  width: 225px;
  height: auto;
  margin-bottom: 20px;
`;

const BotName = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  background: linear-gradient(90deg, #00c6ff, #0072ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  transition: all 0.3s ease-in-out;
`;

const ChatArea = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  background-color: #1e1e1e;
  border-radius: 10px;
  box-shadow: inset 0 0 10px rgba(0, 188, 212, 0.5);
  margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
`;

const ChatBubble = styled.div`
  background-color: ${(props) => (props.isUser ? '#00bcd4' : '#43484d')};
  color: ${(props) => (props.isUser ? '#000000' : '#f5f5f5')};
  padding: 10px;
  border-radius: 20px;
  margin: 10px 0;
  align-self: ${(props) => (props.isUser ? 'flex-end' : 'flex-start')};
  max-width: 70%;
  box-shadow: 0 2px 5px rgba(0, 188, 212, 0.5);
  word-wrap: break-word;
`;

const FormContainer = styled.form`
  display: flex;
  align-items: center;
  width: 100%;
`;

const InputField = styled.input`
  flex: 1;
  padding: 10px 15px;
  border-radius: 20px;
  border: 2px solid #00bcd4;
  font-family: 'Poppins', sans-serif;
  font-size: 1rem;
  margin-right: 10px;
  outline: none;
  box-shadow: 0 2px 5px rgba(0, 188, 212, 0.2);

  &:focus {
    border-color: #ff4081;
  }
`;

const SubmitButton = styled.button`
  background-color: #000000;
  color: white;
  padding: 10px;
  border: none;
  border-radius: 50%;
  font-family: 'Poppins', sans-serif;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: 0 2px 5px rgba(255, 64, 129, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #ff4081;
  }
`;

const ChatPage = () => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const chatAreaRef = useRef(null);

  useEffect(() => {
    if (chatAreaRef.current) {
      chatAreaRef.current.scrollTop = chatAreaRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userMessage = { content: input, isUser: true, timestamp: new Date() };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const botResponse = await axios.post('http://localhost:5000/chatbot_response', { message: input });

      const botMessageContent = botResponse.data.response;

      const botMessage = {
        content: botMessageContent,
        isUser: false,
        timestamp: new Date(),
      };

      setMessages((prevMessages) => [...prevMessages, botMessage]);

      setInput('');
    } catch (err) {
      console.error('Error sending message:', err);
    }
  };

  return (
    <>
      <GlobalStyle />
      <Container>
        <ChatSection>
          <ChatArea ref={chatAreaRef}>
            {messages.map((message, index) => (
              <ChatBubble key={index} isUser={message.isUser}>
                <p>{message.content}</p>
                <small>{new Date(message.timestamp).toLocaleString()}</small>
              </ChatBubble>
            ))}
          </ChatArea>
          <FormContainer onSubmit={handleSubmit}>
            <InputField
              type="text"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <SubmitButton type="submit">
              <FaPaperPlane />
            </SubmitButton>
          </FormContainer>
        </ChatSection>
        <DesignSection>
          <BotImage src={botImage} alt="bot" />
          <BotName>Mindscape ✨</BotName>
        </DesignSection>
      </Container>
    </>
  );
};

export default ChatPage;
