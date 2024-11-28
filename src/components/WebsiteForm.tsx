import React, { useState } from "react";
import { Categories } from "../types";

interface WebsiteFormProps {
  onUpdateCategories: (categories: Categories) => void;
  categories: Categories;
}

const WebsiteForm: React.FC<WebsiteFormProps> = ({
  onUpdateCategories,
  categories,
}) => {
  const [title, setTitle] = useState<string>(""); // Title for the website
  const [url, setUrl] = useState<string>(""); // URL for the website
  const [categoryTitle, setCategoryTitle] = useState<string>(""); // Title for the category
  const [newCategory, setNewCategory] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !url || (newCategory && !categoryTitle)) {
      alert("Please fill out all required fields.");
      return;
    }

    const categoryKey = newCategory ? categoryTitle : categoryTitle.trim();

    const newWebsite = {
      id: crypto.randomUUID(),
      title,
      url,
    };

    const updatedCategories: Categories = { ...categories };

    if (!updatedCategories[categoryKey]) {
      updatedCategories[categoryKey] = {
        id: crypto.randomUUID(),
        title: categoryTitle.trim(),
        websites: [],
      };
    }

    updatedCategories[categoryKey].websites.push(newWebsite);

    chrome.storage.sync.set({ categories: updatedCategories }, () => {
      onUpdateCategories(updatedCategories);
    });

    setTitle("");
    setUrl("");
    setCategoryTitle("");
    setNewCategory(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 bg-white p-6 rounded-md shadow-md"
    >
      <h2 className="text-xl font-semibold text-gray-700">Add Website</h2>
      <input
        type="text"
        placeholder="Website Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        required
      />
      <input
        type="url"
        placeholder="Website URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        required
      />
      <div className="flex flex-col gap-2">
        <select
          onChange={(e) =>
            e.target.value === "new"
              ? setNewCategory(true)
              : setCategoryTitle(e.target.value)
          }
          className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
        >
          <option value="">Select a Category</option>
          {Object.keys(categories).map((key) => (
            <option key={categories[key].id} value={key}>
              {categories[key].title}
            </option>
          ))}
          <option value="new">+ Create New Category</option>
        </select>
        {newCategory ? (
          <input
            type="text"
            placeholder="Category Title"
            value={categoryTitle}
            onChange={(e) => setCategoryTitle(e.target.value)}
            className="p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400"
            required
          />
        ) : (
          ""
        )}
      </div>
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
      >
        Save Website
      </button>
    </form>
  );
};

export default WebsiteForm;
