import React, { useState } from "react";
import { AgGridReact } from "ag-grid-react";
import { Input, Button, Box } from "@mui/material";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

const CsvUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [columnDefs, setColumnDefs] = useState<any[]>([]);
  const [rowData, setRowData] = useState<any[]>([]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = event.target.files;
    if (fileList) setFile(fileList[0]);
  };

  const handleUpload = async () => {
    if (!file) return;

    const reader = new FileReader();
    reader.readAsText(file);

    reader.onload = async () => {
      const csvData = reader.result as string;
      const { headers, data } = parseCsvData(csvData);
      setColumnDefs(
        headers.map((header: string) => ({ headerName: header, field: header }))
      );
      setRowData(data);
    };
  };

  const parseCsvData = (csvData: string) => {
    const rows = csvData.split("\n");
    const header = rows.shift()?.split(",") || [];
    const data = rows.map((row) => {
      const rowData = row.split(",");
      return header.reduce(
        (acc, key, index) => ({ ...acc, [key]: rowData[index] }),
        {}
      );
    });

    return { headers: header, data };
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      <Input
        type="file"
        inputProps={{ accept: ".csv" }}
        onChange={handleFileChange}
      />
      <Button variant="contained" onClick={handleUpload} disabled={!file}>
        アップロード
      </Button>
      <div
        style={{ height: "400px", width: "100%" }}
        className="ag-theme-balham"
      >
        <AgGridReact columnDefs={columnDefs} rowData={rowData} />
      </div>
    </Box>
  );
};

export default CsvUploader;
