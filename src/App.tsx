import { createBrowserRouter, RouterProvider } from "react-router-dom";
import StartPage from "./pages/start";
import QuizPage from "./pages/question";
import AnswerPage from "./pages/Answer";
import ErrorPage from "./pages/errorPage";
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <StartPage />,
      errorElement: <ErrorPage />,
    },
    {
      path: "/Quiz",
      element: <QuizPage />,
    },
    {
      path: "/Answer",
      element: <AnswerPage />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
