import ReactDOM from "react-dom";

import { Container, Box, Divider } from "@mui/material";
import CsvUploader from "../src/table/fileUpload/CsvUploader";
import DragAndDropUploader from "../src/table/fileUpload/DragAndDropUploader";
import Table from "../src/table/Table";

function App() {
  return (
    <div className="App">
      <Container sx={{ maxWidth: "1280px" }}>
        <Box sx={{ mb: 4 }}>
          <CsvUploader />
        </Box>

        <Box sx={{ mb: 4 }}>
          <DragAndDropUploader />
        </Box>

        <Divider />

        <Box sx={{ mt: 3 }}>
          <Table />
        </Box>
      </Container>
    </div>
  );
}
export default App;

ReactDOM.render(<App />, document.getElementById("root"));
