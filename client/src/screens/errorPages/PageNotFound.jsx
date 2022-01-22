import { Button, Center, Image, VStack } from "@chakra-ui/react";
import pageNotFoundsvg from "assets/404/404.svg";
import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <Center w="100%">
      <VStack>
        <Image
          src={pageNotFoundsvg}
          alt="404"
          boxSize="500px"
          objectFit="cover"
        />
        <Button leftIcon={<FiArrowLeft />} onClick={() => navigate(-1)}>
          Go Back
        </Button>
      </VStack>
    </Center>
  );
};

export default PageNotFound;
