import Navbar from "./Navbar";

const MainLayout = ({ children }) => {
  return (
    <>
      <Navbar />

      <main
        style={{
          maxWidth: "1200px",
          margin: "30px auto",
          padding: "0 20px",
        }}
      >
        {children}
      </main>
    </>
  );
};

export default MainLayout;