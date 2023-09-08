import { Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { Navbar } from ".";
import { COMPONENT_WIDTH } from "../utils";

const WorkflowLayout = () => {
  return (
    <>
      <Navbar />
      <Box
        w='100%'
        maxW={COMPONENT_WIDTH.desktopLarge}
        marginX='auto'
        px={1}
      >
        <Outlet />
      </Box>
    </>
  );
}

export default WorkflowLayout;