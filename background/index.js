let pendingSendResponse;

// Top level menu item
chrome.contextMenus.create({
  id: "top-level",
  title: "Top level",
  contexts: ["editable"],
});

// First level child item
chrome.contextMenus.create({
  id: "first-level",
  title: "First level",
  contexts: ["editable"],
  parentId: "top-level",
});

// Second level child item
chrome.contextMenus.create({
  id: "second-level",
  title: "Second level",
  contexts: ["editable"],
  parentId: "first-level",
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  switch (info.menuItemId) {
    case "top-level":
      // Top level menu, nothing to do
      break;
    case "first-level":
      // First level menu, nothing to do
      break;
    case "second-level":
      if (typeof pendingSendResponse === "function") {
        pendingSendResponse({ text: test() });
      }
      break;
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.command) {
    case "get_text":
      pendingSendResponse = sendResponse;
      console.debug(pendingSendResponse);
      break;
  }
  return true;
});

function test() {
  const characterArray = [
    "Nathan Drake",
    "Chloe Frazer",
    "Samuel Drake",
    "Elena Fisher",
    "Victor Sullivan",
  ];

  const rand = Math.floor(Math.random() * characterArray.length);
  return characterArray[rand];
}
