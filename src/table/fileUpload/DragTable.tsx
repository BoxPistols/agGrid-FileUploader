import React, { useState } from "react";
import { Button } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-balham.css";

const DragTable = () => {
  const [, setFile] = useState<File | null>(null);
  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const [rowData, setRowData] = useState<{ [key: string]: string }[]>([]);

  //   const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
  //     const files = event.target.files;
  //     if (files) {
  //       setFile(files[0]);
  //     }
  //   };

  const parseCsvData = (csvData: string) => {
    const [headers, ...rows] = csvData.trim().split("\n");
    const parsedHeaders = headers.split(",");
    const parsedRows = rows.map((row) => {
      const rowData = row.split(",");
      const rowObj: { [key: string]: string } = {};
      parsedHeaders.forEach((header, index) => {
        rowObj[header] = rowData[index];
      });
      return rowObj;
    });

    return { headers: parsedHeaders, data: parsedRows };
  };

  const handleUpload = (uploadedFile: File) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const csvData = reader.result as string;
      const { headers, data } = parseCsvData(csvData);
      setColumnDefs(
        headers.map((header: string) => ({ headerName: header, field: header }))
      );
      setRowData(data);
    };
    reader.readAsText(uploadedFile);
  };

  const handleReset = () => {
    setFile(null);
    setColumnDefs([]);
    setRowData([]);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length) {
      const file = files[0];
      if (file.type === "text/csv") {
        setFile(file);
        handleUpload(file);
      }
    }
  };

  // AgGrid
  const customNoRowsMessage =
    "ここにファイルをドロップして添付アップロードしてください";

  return (
    <div>
      <div
        className="ag-theme-alpine"
        style={{ height: 180, width: "100%" }}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <AgGridReact
          columnDefs={columnDefs}
          rowData={rowData}
          localeText={{
            noRowsToShow: customNoRowsMessage,
          }}
        />
      </div>
      {rowData.length > 0 && (
        <Button
          onClick={handleReset}
          color="secondary"
          variant="outlined"
          sx={{ mt: 1 }}
        >
          リセット
        </Button>
      )}{" "}
    </div>
  );
};

export default DragTable;
