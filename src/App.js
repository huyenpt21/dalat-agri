import { BrowserRouter, Route, Routes } from "react-router-dom";
import DanhMucCayTrong from "./component/danhMucCayTrong";
import LayoutMain from "./component/layout";

function App() {
  return (
    // sử dụng react-router-dom để chuyển trang (menu)
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutMain />}>
          {/* component với path tương ứng */}
          <Route path="danh-muc-cay-trong" element={<DanhMucCayTrong />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
