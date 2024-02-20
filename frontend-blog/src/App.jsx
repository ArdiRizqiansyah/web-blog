import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import "./scss/app.scss";
import "bootstrap";
import Home from "./pages/Public/Home";
import Login from "./pages/auth/Login";
import UserDashboard from "./pages/user/Dashboard";
import CategoryIndex from "./pages/user/category/CategoryIndex";
import PostIndex from "./pages/user/post/PostIndex";
import PostDetail, { getPostDetail } from "./pages/public/PostDetail";
import { ProtectedLayout } from "./utils/ProtectedLayout";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/">
        <Route index element={<Home/>} />
        <Route path="/post/:slug/detail" element={<PostDetail/>} loader={getPostDetail} />

        <Route path="/login" element={<Login/>} />

        <Route path="/user" element={<ProtectedLayout/>}>
          <Route index element={<UserDashboard/>} />
          <Route path="category" element={<CategoryIndex/>} />
          <Route path="post" element={<PostIndex/>} />
        </Route>

        <Route path="*" element={<h1>Not Found</h1>} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  );
}

export default App;
