import { Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import CreatePostPage from "./pages/CreatePostPage";
import PostDetailsPage from "./pages/PostDetailsPage";
import EditProfilePage from "./pages/EditProfilePage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />

      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route path="/profile/:id" element={<ProfilePage />} />

      <Route path="/create-post" element={<CreatePostPage />} />

      <Route path="/posts/:id" element={<PostDetailsPage />} />

      <Route path="/edit-profile" element={<EditProfilePage />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;