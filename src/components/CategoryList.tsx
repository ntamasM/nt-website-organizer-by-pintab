import React, { useState, useEffect } from "react";
import { Categories, Website } from "../types";
import WebsiteItem from "./WebsiteItem";

interface CategoryListProps {
  categories: Categories;
  onUpdateCategories: (categories: Categories) => void;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  onUpdateCategories,
}) => {
  const [localCategories, setLocalCategories] = useState<Categories>({});
  const [editingCategory, setEditingCategory] = useState<string | null>(null); // Tracks the category being edited
  const [editedLabel, setEditedLabel] = useState<string>("");

  useEffect(() => {
    setLocalCategories(categories);
  }, [categories]);

  const handleOpenAll = (categoryId: string) => {
    const websites = localCategories[categoryId]?.websites || [];
    websites.forEach(({ url }) => chrome.tabs.create({ url, pinned: true }));
  };

  const handleRemoveCategory = (categoryId: string) => {
    if (
      window.confirm(
        `Are you sure you want to delete the category "${localCategories[categoryId].title}"? This will delete all websites within it.`
      )
    ) {
      const updatedCategories = { ...localCategories };
      delete updatedCategories[categoryId];

      chrome.storage.sync.set({ categories: updatedCategories }, () => {
        setLocalCategories(updatedCategories);
        onUpdateCategories(updatedCategories);
      });
    }
  };

  const handleEditCategory = (categoryId: string) => {
    setEditingCategory(categoryId);
    setEditedLabel(localCategories[categoryId].title);
  };

  const handleSaveCategoryEdit = (categoryId: string) => {
    if (!editedLabel.trim()) {
      alert("Category label cannot be empty.");
      return;
    }

    const updatedCategories = { ...localCategories };
    updatedCategories[categoryId].title = editedLabel;

    chrome.storage.sync.set({ categories: updatedCategories }, () => {
      setLocalCategories(updatedCategories);
      onUpdateCategories(updatedCategories);
    });

    setEditingCategory(null);
    setEditedLabel("");
  };

  const handleCancelCategoryEdit = () => {
    setEditingCategory(null);
    setEditedLabel("");
  };

  const handleMoveWebsite = (
    categoryId: string,
    index: number,
    direction: "up" | "down"
  ) => {
    const updatedCategories = { ...localCategories };
    const websites = updatedCategories[categoryId].websites;

    if (
      (direction === "up" && index === 0) ||
      (direction === "down" && index === websites.length - 1)
    ) {
      return; // Prevent moving out of bounds
    }

    const swapIndex = direction === "up" ? index - 1 : index + 1;

    // Swap the two websites
    [websites[index], websites[swapIndex]] = [
      websites[swapIndex],
      websites[index],
    ];

    updatedCategories[categoryId].websites = websites;

    chrome.storage.sync.set({ categories: updatedCategories }, () => {
      setLocalCategories(updatedCategories);
      onUpdateCategories(updatedCategories);
    });
  };

  const handleEditWebsite = (
    updatedWebsite: Website,
    oldCategoryId: string,
    newCategoryId: string
  ) => {
    const updatedCategories = { ...localCategories };

    // Remove the website from the old category
    updatedCategories[oldCategoryId].websites = updatedCategories[
      oldCategoryId
    ].websites.filter((site) => site.id !== updatedWebsite.id);

    // Add the website to the new category
    if (!updatedCategories[newCategoryId]) {
      updatedCategories[newCategoryId] = {
        id: newCategoryId,
        title: newCategoryId,
        websites: [],
      };
    }
    updatedCategories[newCategoryId].websites.push(updatedWebsite);

    // Update the state and storage
    chrome.storage.sync.set({ categories: updatedCategories }, () => {
      setLocalCategories(updatedCategories);
      onUpdateCategories(updatedCategories);
    });
  };

  const handleRemoveWebsite = (website: Website, categoryId: string) => {
    const updatedCategories = { ...localCategories };
    updatedCategories[categoryId].websites = updatedCategories[
      categoryId
    ].websites.filter((site) => site.id !== website.id);

    chrome.storage.sync.set({ categories: updatedCategories }, () => {
      setLocalCategories(updatedCategories);
      onUpdateCategories(updatedCategories);
    });
  };

  return (
    <div>
      {Object.keys(localCategories).length === 0 ? (
        <p className="text-gray-500">No categories available.</p>
      ) : (
        Object.keys(localCategories).map((key) => {
          const category = localCategories[key];
          const isEditing = editingCategory === key;

          return (
            <div
              key={category.id}
              className="bg-white p-4 rounded-md shadow-md mb-4 flex flex-col"
            >
              <div className="flex justify-between items-center mb-2">
                {isEditing ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={editedLabel}
                      onChange={(e) => setEditedLabel(e.target.value)}
                      className="p-2 border rounded-md"
                      placeholder="Category Label"
                    />
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                      onClick={() => handleSaveCategoryEdit(key)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400"
                      onClick={handleCancelCategoryEdit}
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <h3 className="text-lg font-semibold text-gray-700">
                    {category.title}
                  </h3>
                )}
                {!isEditing && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleOpenAll(key)}
                      className="bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                    >
                      Open All
                    </button>
                    <button
                      onClick={() => handleEditCategory(key)}
                      className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleRemoveCategory(key)}
                      className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                )}
              </div>
              <ul className="mt-2 space-y-2">
                {category.websites.map((website, index) => (
                  <WebsiteItem
                    key={website.id}
                    website={website}
                    index={index}
                    categoryId={key}
                    onOpen={(url) => chrome.tabs.create({ url, pinned: true })}
                    onRemove={(website) => handleRemoveWebsite(website, key)}
                    onMove={handleMoveWebsite}
                    onEdit={handleEditWebsite}
                    categories={Object.keys(localCategories).map(
                      (categoryKey) => localCategories[categoryKey].title
                    )} // Pass available categories
                    isLast={index === category.websites.length - 1}
                  />
                ))}
              </ul>
            </div>
          );
        })
      )}
    </div>
  );
};

export default CategoryList;
