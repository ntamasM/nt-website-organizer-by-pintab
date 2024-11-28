// Listener for when the extension is installed or updated
chrome.runtime.onInstalled.addListener((details) => {
    if (details.reason === "install") {
      console.log("Website Organizer installed!");
      initializeDefaultStorage();
    } else if (details.reason === "update") {
      console.log("Website Organizer updated!");
    }
  });
  
  // Initialize default storage if not already set
  const initializeDefaultStorage = () => {
    chrome.storage.sync.get(["categories"], (result) => {
      if (!result.categories) {
        chrome.storage.sync.set({ categories: {} }, () => {
          console.log("Initialized empty categories in storage.");
        });
      }
    });
  };
  
  // Example listener for runtime messages
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.type === "GET_CATEGORIES") {
      chrome.storage.sync.get(["categories"], (result) => {
        sendResponse(result.categories || {});
      });
      return true; // Keeps the sendResponse channel open for async use
    }
  
    if (message.type === "ADD_CATEGORY") {
      const { categoryName } = message.payload;
      chrome.storage.sync.get(["categories"], (result) => {
        const categories = result.categories || {};
        if (!categories[categoryName]) {
          categories[categoryName] = [];
          chrome.storage.sync.set({ categories }, () => {
            sendResponse({ success: true });
          });
        } else {
          sendResponse({ success: false, error: "Category already exists" });
        }
      });
      return true; // Keeps the sendResponse channel open for async use
    }
  });
  