import MainLayout from "../components/layout/MainLayout";
import PostList from "../components/post/PostList";

import "../styles/home.css";

const HomePage = () => {
  return (
    <MainLayout>

      <div className="home-container">

        <h1>🌍 Social Feed</h1>

        <PostList />

      </div>

    </MainLayout>
  );
};

export default HomePage;