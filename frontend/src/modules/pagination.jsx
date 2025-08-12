import React from "react";
import { Box, Pagination, Select, MenuItem } from "@mui/material";

export default function CustomPagination({ page, setPage, rowsPerPage, setRowsPerPage, totalPages }) {
  const handlePageChange = (event, value) => setPage(value);

  const handleRowsChange = (event) => {
    setRowsPerPage(event.target.value);
    setPage(1); // reset to first page when changing rows per page
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: "fit-content",
        // position: "relative",
        // right:-110,
      }}
    >
      {/* Rows per page dropdown */}
      <Select
        value={rowsPerPage}
        onChange={handleRowsChange}
        size="small"
        sx={{
          "& .MuiSelect-select": { padding: "4px 8px" },
          height: 32,
        }}
      >    
        {[10, 20, 50].map((size) => (
          <MenuItem key={size} value={size}>
            Show {size}
          </MenuItem>
        ))}
      </Select>

      {/* Pagination Component */}
      <Pagination
        count={totalPages} // ✅ dynamic pages
        page={page}
        onChange={handlePageChange}
        shape="rounded"
        variant="outlined"
        siblingCount={1}
        boundaryCount={1}
        sx={{
          "& .MuiPaginationItem-root": {
            borderRadius: 0,
            border: "1px solid #e0e0e0",
            minWidth: 32,
            height: 32,
            color: "black",
            backgroundColor: "white",
            margin: 0,

          },
          "& .Mui-selected": {
            backgroundColor: "#eff2f4",
             color: "rgba(139, 150, 165, 1)",
          },
        }}
      />
    </Box>
  );
}
