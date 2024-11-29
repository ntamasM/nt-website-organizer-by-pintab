import React, { useState } from "react";
import { Website } from "../types";

interface WebsiteItemProps {
  website: Website;
  index: number;
  categoryId: string;
  onOpen: (url: string) => void;
  onRemove: (website: Website, categoryId: string) => void;
  onMove: (categoryId: string, index: number, direction: "up" | "down") => void;
  onEdit: (
    updatedWebsite: Website,
    oldCategoryId: string,
    newCategoryId: string
  ) => void;
  categories: string[]; // List of available category titles
  isLast: boolean;
}

const WebsiteItem: React.FC<WebsiteItemProps> = ({
  website,
  index,
  categoryId,
  onOpen,
  onRemove,
  onMove,
  onEdit,
  categories,
  isLast,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedWebsite, setEditedWebsite] = useState({
    label: website.title,
    url: website.url,
    category: categoryId,
  });
  const [newCategory, setNewCategory] = useState(false);

  const handleEditSave = () => {
    setIsEditing(false);
    const updatedWebsite = {
      ...website,
      title: editedWebsite.label,
      url: editedWebsite.url,
    };
    onEdit(updatedWebsite, categoryId, editedWebsite.category);
  };

  return (
    <li className="text-gray-600 p-2 rounded-md flex flex-col bg-white shadow-md">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={editedWebsite.label}
            onChange={(e) =>
              setEditedWebsite({ ...editedWebsite, label: e.target.value })
            }
            className="p-2 border rounded-md"
            placeholder="Label"
          />
          <input
            type="url"
            value={editedWebsite.url}
            onChange={(e) =>
              setEditedWebsite({ ...editedWebsite, url: e.target.value })
            }
            className="p-2 border rounded-md"
            placeholder="URL"
          />
          <div className="flex flex-col gap-2">
            <select
              value={editedWebsite.category}
              onChange={(e) =>
                e.target.value === "new"
                  ? setNewCategory(true)
                  : setEditedWebsite({
                      ...editedWebsite,
                      category: e.target.value,
                    })
              }
              className="p-2 border rounded-md"
            >
              <option value="">Select a Category</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
              <option value="new">+ Create New Category</option>
            </select>
            {newCategory ? (
              <input
                type="text"
                placeholder="New Category"
                value={editedWebsite.category}
                onChange={(e) =>
                  setEditedWebsite({
                    ...editedWebsite,
                    category: e.target.value,
                  })
                }
                className="p-2 border rounded-md"
              />
            ) : null}
          </div>
          <div className="flex gap-2 mt-2">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
              onClick={handleEditSave}
            >
              Save
            </button>
            <button
              className="bg-gray-300 px-2 py-1 rounded-md hover:bg-gray-400"
              onClick={() => {
                setIsEditing(false);
                setNewCategory(false);
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-between items-center">
          <span>{website.title}</span>
          <div className="flex gap-2">
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
              onClick={() => onOpen(website.url)}
            >
              Open
            </button>
            <button
              className="bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300"
              onClick={() => onMove(categoryId, index, "up")}
              disabled={index === 0}
            >
              ↑
            </button>
            <button
              className="bg-gray-200 px-2 py-1 rounded-md hover:bg-gray-300"
              onClick={() => onMove(categoryId, index, "down")}
              disabled={isLast}
            >
              ↓
            </button>
            <button
              className="bg-yellow-500 text-white px-2 py-1 rounded-md hover:bg-yellow-600"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
            <button
              className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
              onClick={() => onRemove(website, categoryId)}
            >
              Remove
            </button>
          </div>
        </div>
      )}
    </li>
  );
};

export default WebsiteItem;
