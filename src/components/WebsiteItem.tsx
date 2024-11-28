import React from "react";
import { Website } from "../types";

interface WebsiteItemProps {
  website: Website;
  index: number;
  categoryId: string;
  onOpen: (url: string) => void;
  onRemove: (website: Website, categoryId: string) => void;
  onMove: (categoryId: string, index: number, direction: "up" | "down") => void;
  isLast: boolean;
}

const WebsiteItem: React.FC<WebsiteItemProps> = ({
  website,
  index,
  categoryId,
  onOpen,
  onRemove,
  onMove,
  isLast,
}) => {
  const handleRemove = () => {
    if (window.confirm(`Are you sure you want to delete "${website.title}"?`)) {
      onRemove(website, categoryId);
    }
  };

  return (
    <li className="text-gray-600 p-2 rounded-md flex justify-between items-center bg-white shadow-md">
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
          className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
          onClick={handleRemove}
        >
          Remove
        </button>
      </div>
    </li>
  );
};

export default WebsiteItem;
