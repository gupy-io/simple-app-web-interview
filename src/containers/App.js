import Header from "@components/Header";

const App = ({ children }) => {
  return (
    <>
      <Header />
      <div className="container p-2">{children}</div>
    </>
  );
};

export default App;
