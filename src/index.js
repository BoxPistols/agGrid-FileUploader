import ReactDOM from "react-dom";

import { Container, Box, Divider, Typography } from "@mui/material";
import CsvUploader from "../src/table/fileUpload/CsvUploader";
import DragAndDropUploader from "../src/table/fileUpload/DragAndDropUploader";
import DragTable from "../src/table/fileUpload/DragTable";
import Table from "../src/table/Table";

function App() {
  return (
    <div className="App">
      <Container sx={{ maxWidth: "1280px" }}>
        <Box sx={{ mb: 4, mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Drag&Dropエリア CSVファイルアップロード
          </Typography>
          <DragAndDropUploader />
        </Box>

        <Divider mt={1} />

        <Box sx={{ mb: 4, mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Tableダイレクト Drag&Drop CSVファイルアップロード
          </Typography>
          <DragTable />
        </Box>

        <Divider mt={1} />

        <Box sx={{ mb: 4, mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            CSVファイルアップロード
          </Typography>
          <CsvUploader />
        </Box>

        <Divider />

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            タイトル一致検索
          </Typography>
          <Table />
        </Box>
      </Container>
    </div>
  );
}
export default App;

ReactDOM.render(<App />, document.getElementById("root"));
