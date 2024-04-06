import { FeedPage } from "./page/FeedPage";
import { HomePage } from "./page/HomePage";
import { HabitPage } from "./page/HabitPage";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { MePage } from "./page/MePage";
import { MenuBar } from "./component/MenuBar";
import ProfilePage from "./page/ProfilPage";
import SimpleSidebar from "./component/NewMenuBar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          element={
            <>
              {/* <MenuBar /> */}
              <SimpleSidebar />
              <Outlet />
            </>
          }
        >
          <Route path="/feed" element={<FeedPage />} />
          <Route path="me" element={<MePage />}></Route>
          <Route path="/profil/:id" element={<ProfilePage />}></Route>
          <Route path="habits" element={<HabitPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
