import React from "react";
import { Button, useToast } from "@chakra-ui/react";

const FileConverter = () => {
  const toast = useToast();

  const handleConversion = () => {
    toast({
      title: "Conversion complete.",
      description: "Your WAV file has been converted to MP3.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Button onClick={handleConversion} colorScheme="blue">
      Convert WAV to MP3
    </Button>
  );
};

export default FileConverter;
