import { FeedPage } from "./page/FeedPage";
import { HomePage } from "./page/HomePage";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { MePage } from "./page/MePage";
import { MenuBar } from "./component/MenuBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          element={
            <>
              <MenuBar />
              <Outlet />
            </>
          }
        >
          <Route path="/feed" element={<FeedPage />} />
          <Route path="me" element={<MePage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
