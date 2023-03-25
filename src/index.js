import ReactDOM from "react-dom";

import { Container, Box, Divider } from "@mui/material";
import CsvUploader from "../src/table/CsvUploader";
import Table from "../src/table/Table";

function App() {
  return (
    <div className="App">
      <Container sx={{ maxWidth: "1280px" }}>
        <Box sx={{ mb: 4 }}>
          <CsvUploader />
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
