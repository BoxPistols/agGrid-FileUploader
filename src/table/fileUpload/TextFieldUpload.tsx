import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Box, TextField, Button } from "@mui/material";
import { ColDef } from "ag-grid-community";

const TextFieldUpload = () => {
  const [rowData, setRowData] = useState<{ [key: string]: any }[]>([]);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const [url, setUrl] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLoadData = async () => {
    setError(null);
    try {
      const rowResponse = await fetch(`${url}`);
      const rowData = await rowResponse.json();
      setRowData(rowData);

      if (rowData.length > 0) {
        const firstRow = rowData[0];
        const columnData = Object.keys(firstRow).map((key) => ({
          headerName: key,
          field: key,
        }));
        setColumnDefs(columnData);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("データの取得中にエラーが発生しました。");
    }
  };

  const onFirstDataRendered = (params: {
    api: { sizeColumnsToFit: () => void };
  }) => {
    params.api.sizeColumnsToFit();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      {" "}
      <TextField
        label="API URL"
        value={url}
        onChange={(event) => setUrl(event.target.value)}
        sx={{ width: "100%", marginBottom: "16px" }}
      />{" "}
      {error && (
        <Box sx={{ color: "error.main", marginBottom: "16px" }}>{error}</Box>
      )}{" "}
      <Button variant="outlined" onClick={handleLoadData} sx={{ mb: 2 }}>
        {" "}
        Load Data{" "}
      </Button>{" "}
      <div className="ag-theme-alpine" style={{ height: 240, width: "100%" }}>
        {" "}
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          onFirstDataRendered={onFirstDataRendered}
        />{" "}
      </div>{" "}
    </Box>
  );
};

export default TextFieldUpload;
