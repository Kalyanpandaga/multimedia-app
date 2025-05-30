import React from "react";
import Upload from "./Upload";
import Header from "./Header";

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Header />
      <Upload />
    </div>
  );
};

export default Dashboard;
