import React, { useState, useEffect } from "react";
import WebsiteForm from "../components/WebsiteForm";
import CategoryList from "../components/CategoryList";
import { Categories } from "../types";
import Header from "../components/Header";
import Footer from "../components/Footer";

const Popup: React.FC = () => {
  const [categories, setCategories] = useState<Categories>({});

  useEffect(() => {
    chrome.storage.sync.get(["categories"], (result) => {
      setCategories(result.categories || {});
    });
  }, []);

  const handleUpdateCategories = (updatedCategories: Categories) => {
    setCategories(updatedCategories);
  };

  return (
    <div className="w-[500px] mx-auto p-4 bg-gray-50 rounded-lg shadow-lg flex flex-col gap-3">
      <Header />
      <WebsiteForm
        onUpdateCategories={handleUpdateCategories}
        categories={categories}
      />
      <CategoryList
        categories={categories}
        onUpdateCategories={handleUpdateCategories}
      />
      <Footer />
    </div>
  );
};

export default Popup;
