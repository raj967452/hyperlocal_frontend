import React from "react";
import { LinearProgress, Box } from "@material-ui/core";

const LoadingBox = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <LinearProgress />
    </Box>
  );
};

export default LoadingBox;
