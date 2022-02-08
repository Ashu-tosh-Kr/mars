import { HStack, Box } from "@chakra-ui/layout";
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
    <HStack spacing={"4rem"}>
      <Button
        onClick={() => navigate("/todo", { replace: true })}
        height="48px"
        width="200px"
        fontSize="2rem"
        leftIcon={<FcTodoList />}
        variant="ghost"
      >
        Todos: {userInfo?.todos?.length}
      </Button>

      <Box>
        <iframe
          // TODO 1. ↓ ctz shall be Japan for now - or, what if we get rid of the ctz param itself?
          src="https://calendar.google.com/calendar/embed?src=test123sbjct%40gmail.com&ctz=Asia%2FKolkata"
          style={{ border: 0 }}
          width="900"
          height="600"
          frameBorder="0"
          scrolling="no"
        ></iframe>
      </Box>
    </HStack>
  );
};

export default Dashboard;
