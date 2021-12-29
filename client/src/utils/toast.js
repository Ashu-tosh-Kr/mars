import { createStandaloneToast, theme } from "@chakra-ui/react";

const root = createStandaloneToast({ theme });

const toast = ({ title, duration, ...rest }) => {
  root({
    title: title || "",
    position: "bottom",
    duration: duration || 3000,
    isClosable: true,
    ...rest,
  });
};

export default toast;
