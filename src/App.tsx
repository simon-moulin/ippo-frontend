import { FeedPage } from "./page/FeedPage";
import { HomePage } from "./page/HomePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MePage } from "./page/MePage";
import ProfilePage from "./page/ProfilPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "user/:id",
      element: <ProfilePage />,
    },
    {
      path: "/feed",
      element: <FeedPage />,
    },
    {
      path: "/me",
      element: <MePage />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
