import { ExpandLess, ExpandMore } from "@mui/icons-material";
import { Box, Collapse, List, Typography } from "@mui/material";
import React, { useState } from "react";

const AllFiltering = ({ title, children, opened = true, initialCount = 4 }) => {
  const [open, setOpen] = useState(opened);
  const [showAll, setShowAll] = useState(false);

  const toggleCategoryBox = () => setOpen((prev) => !prev);

  const itemsArray = React.Children.toArray(children);
  const visibleItems = showAll ? itemsArray : itemsArray.slice(0, initialCount);

  return (
    <>
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
        onClick={toggleCategoryBox}
      >
        <Typography
          variant="h6"
          sx={{ fontSize: "1rem", fontWeight: 600, mb: 1, mt: 1 }}
        >
          {title}
        </Typography>
        {open ? <ExpandLess fontSize="small" /> : <ExpandMore fontSize="small" />}
      </Box>

      {/* Expandable content */}
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List dense sx={{ p: 0 }}>
          {visibleItems}
          {itemsArray.length > initialCount && (
            <Typography
              color="#046dff"
              mb={2}
              fontSize="16px"
              sx={{ cursor: "pointer" }}
              onClick={() => setShowAll((prev) => !prev)}
            >
              {showAll ? "See less" : "See all"}
            </Typography>
          )}
        </List>
      </Collapse>
    </>
  );
};

export default AllFiltering;
