import { Center, Spinner } from "@chakra-ui/react";

const Loader = () => {
  return (
    <Center width="100%" height="100%">
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
    </Center>
  );
};

export default Loader;
