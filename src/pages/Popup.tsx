import React, { useState, useEffect } from "react";
import WebsiteForm from "../components/WebsiteForm";
import CategoryList from "../components/CategoryList";
import { Categories } from "../types";

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
    <div className="w-[500px] mx-auto p-4 bg-gray-50 rounded-lg shadow-lg">
      <WebsiteForm
        onUpdateCategories={handleUpdateCategories}
        categories={categories}
      />
      <CategoryList
        categories={categories}
        onUpdateCategories={handleUpdateCategories}
      />
    </div>
  );
};

export default Popup;
