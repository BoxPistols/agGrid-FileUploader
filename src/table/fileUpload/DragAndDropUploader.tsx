import React, { useRef, useState, ChangeEvent } from "react";
import { Input, Button } from "@mui/material";
import { AgGridReact } from "ag-grid-react";
import { ColDef } from "ag-grid-community";

const DragAndDropUploader = () => {
  const [file, setFile] = useState<File | null>(null);

  const [columnDefs, setColumnDefs] = useState<ColDef[]>([]);
  const [rowData, setRowData] = useState<{ [key: string]: string }[]>([]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setFile(files[0]);
    }
  };

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

  const handleUpload = () => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async () => {
      const csvData = reader.result as string;
      const { headers, data } = parseCsvData(csvData);
      setColumnDefs(
        headers.map((header: string) => ({ headerName: header, field: header }))
      );
      setRowData(data);
    };
    reader.readAsText(file);
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
      }
    }
  };

  return (
    <div>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        style={{
          border: "2px dashed #ccc",
          padding: 24,
          textAlign: "center",
          width: 300,
          height: 200,
          marginBottom: 16,
        }}
      >
        <p>CSVファイルをここにドロップしてください</p>
        <Input
          ref={fileInputRef}
          type="file"
          inputProps={{ accept: ".csv" }}
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
        <Button
          onClick={() => fileInputRef.current?.click()}
          variant="contained"
          color="primary"
        >
          ファイルを選択
        </Button>
      </div>
      <Button onClick={handleUpload} disabled={!file}>
        アップロード
      </Button>
      <div className="ag-theme-alpine" style={{ height: 400, width: "100%" }}>
        <AgGridReact columnDefs={columnDefs} rowData={rowData} />
      </div>
    </div>
  );
};

export default DragAndDropUploader;
