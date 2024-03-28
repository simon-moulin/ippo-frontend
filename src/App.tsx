import { FeedPage } from "./page/FeedPage";
import { HomePage } from "./page/HomePage";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { MePage } from "./page/MePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
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
