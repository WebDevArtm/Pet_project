import { Box } from "@mui/system";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import React from "react";

const LikeDislike: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        width: "300px",
      }}
    >
      <Box
        sx={{ color: "green", borderRadius: 0, paddingRight: "20px" }}
        aria-label="like"
      >
        <ThumbUpIcon color="success" />
        {0}
      </Box>
      <Box
        sx={{ color: "red", borderRadius: 0, paddingLeft: "20px" }}
        aria-label="dislike"
      >
        <ThumbDownIcon color="error" />
        {0}
      </Box>
    </Box>
  );
};

export default LikeDislike;
