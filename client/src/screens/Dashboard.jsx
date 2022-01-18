import { Box } from "@chakra-ui/layout";

const Dashboard = () => {
  return (
    <Box>
      <iframe
        src="https://calendar.google.com/calendar/embed?src=test123sbjct%40gmail.com&ctz=Asia%2FKolkata"
        style={{ border: 0 }}
        width="1200"
        height="600"
        frameBorder="0"
        scrolling="no"
      ></iframe>
    </Box>
  );
};

export default Dashboard;
