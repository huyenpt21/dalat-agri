import { BrowserRouter, Route, Routes } from "react-router-dom";
import DanhMucCayTrong from "./component/danhMucCayTrong";
import LayoutMain from "./component/layout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutMain />}>
          <Route path="danh-muc-cay-trong" element={<DanhMucCayTrong />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
