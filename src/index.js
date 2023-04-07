import ReactDOM from "react-dom";

import { Container, Box, Divider, Typography } from "@mui/material";
import CsvUploader from "../src/table/fileUpload/CsvUploader";
import DragAndDropUploader from "../src/table/fileUpload/DragAndDropUploader";
import Table from "../src/table/Table";

function App() {
  return (
    <div className="App">
      <Container sx={{ maxWidth: "1280px" }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h5" gutterBottom>
            CSVファイルアップロード
          </Typography>
          <CsvUploader />
        </Box>

        <Divider mt={1} />

        <Box sx={{ mb: 4, mt: 3 }}>
          <Typography variant="h5" gutterBottom>
            Drag&Drop CSVファイルアップロード
          </Typography>
          <DragAndDropUploader />
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
