import { Flex, Box } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/react";
import { FcTodoList } from "react-icons/fc";

//non lib imports
import { useGetCurrUserInfo } from "api/hooks";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  /**
   * hooks
   */
  const navigate = useNavigate();
  //queries
  const { userInfo } = useGetCurrUserInfo();

  //jsx
  return (
    <Flex
      flexDir={["column", "column", "row"]}
      justify="spaced-between"
      align={"center"}
      w="100%"
      spacing={"4rem"}
    >
      <Button
        onClick={() => navigate("/todo", { replace: true })}
        height="48px"
        width="200px"
        fontSize={["1.5rem", "1.5rem", "1.75rem", "2rem"]}
        leftIcon={<FcTodoList />}
        variant="ghost"
      >
        Todos: {userInfo?.todos?.length}
      </Button>

      <Box w="100%" mt={10}>
        <iframe
          // TODO 1. ↓ ctz shall be Japan for now - or, what if we get rid of the ctz param itself?
          src="https://calendar.google.com/calendar/embed?src=test123sbjct%40gmail.com&ctz=Asia%2FTokyo"
          style={{ border: 0 }}
          width="100%"
          height="600"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </Box>
    </Flex>
  );
};

export default Dashboard;
