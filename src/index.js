import ReactDOM from "react-dom";

import { Container, Box, Divider, Typography } from "@mui/material";
import CsvUploader from "../src/table/CsvUploader";
import Table from "../src/table/Table";

function App() {
  return (
    <div className="App">
      <Container sx={{ maxWidth: "1280px" }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4">Table with CSV Uploader</Typography>
          <CsvUploader />
        </Box>

        <Divider />

        <Box sx={{ mt: 3 }}>
          <Typography variant="h4">Table with SearchFilter</Typography>
          <Table />
        </Box>
      </Container>
    </div>
  );
}
export default App;

ReactDOM.render(<App />, document.getElementById("root"));
