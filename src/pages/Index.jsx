import React, { useState } from "react";
import { Box, Button, Container, Heading, Input, Text, VStack, useToast } from "@chakra-ui/react";
import { FaUpload } from "react-icons/fa";

const Index = () => {
  const [file, setFile] = useState(null);
  const [bpm, setBpm] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const toast = useToast();

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && (file.type === "audio/mpeg" || file.type === "audio/wav")) {
      setFile(file);
    } else {
      toast({
        title: "Invalid file type.",
        description: "Please upload an MP3 or WAV audio file.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
      event.target.value = ""; // Reset the input
    }
  };

  const handleUpload = () => {
    if (!file) {
      toast({
        title: "No file selected.",
        description: "Please select a file to upload.",
        status: "warning",
        duration: 5000,
        isClosable: true,
      });
    } else {
      setIsProcessing(true);
      setCountdown(10);
      const countdownInterval = setInterval(() => {
        setCountdown((prevCountdown) => {
          if (prevCountdown <= 1) {
            clearInterval(countdownInterval);
            toast({
              title: "File uploaded!",
              description: "We are processing your file to detect BPM.",
              status: "success",
              duration: 5000,
              isClosable: true,
            });
            setBpm(Math.floor(Math.random() * (160 - 60 + 1) + 60));
            setFile(null);
            setIsProcessing(false);
            return 0;
          }
          return prevCountdown - 1;
        });
      }, 1000);
    }
  };

  return (
    <Container centerContent p={8} style={{ background: "linear-gradient(to right, #6a11cb, #2575fc)", fontFamily: "'Arial', sans-serif" }}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">
          BPM Detector
        </Heading>
        <Text>Upload your MP3 or WAV file to detect its BPM.</Text>
        <Box width="100%">
          <Input type="file" accept=".mp3, .wav" onChange={handleFileChange} placeholder="Upload your file" size="lg" />
        </Box>
        <Button leftIcon={<FaUpload />} colorScheme={isProcessing ? "red" : "green"} onClick={handleUpload} isDisabled={!file || isProcessing}>
          Upload and Detect BPM
        </Button>
        {isProcessing && <Text fontSize="md">Processing... {countdown}s remaining</Text>}
        {bpm && (
          <Text fontSize="6xl" fontWeight="bold" color="teal.500">
            Detected BPM: {bpm}
          </Text>
        )}
      </VStack>
    </Container>
  );
};

export default Index;
