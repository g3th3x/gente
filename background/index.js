import { words } from "./wordsdb.js";
import { character } from "./characterdb.js";
import { frases } from "./frasesdb.js";

let pendingSendResponse;

// Top level menu item
chrome.contextMenus.create({
  id: "top-level",
  title: "gente",
  contexts: ["editable"],
});

// First level child item
chrome.contextMenus.create({
  id: "first-level-a",
  title: "Add Character",
  contexts: ["editable"],
  parentId: "top-level",
});

// Second level child item
chrome.contextMenus.create({
  id: "second-level",
  title: "Past character",
  contexts: ["editable"],
  parentId: "first-level-a",
});

// First level child item
chrome.contextMenus.create({
  id: "addTextFirst",
  title: "Add Text",
  contexts: ["editable"],
  parentId: "top-level",
});

// Second level child item
chrome.contextMenus.create({
  id: "addText5",
  title: "Add 5 words",
  contexts: ["editable"],
  parentId: "addTextFirst",
});

chrome.contextMenus.create({
  id: "addText10",
  title: "Add 10 words",
  contexts: ["editable"],
  parentId: "addTextFirst",
});

chrome.contextMenus.create({
  id: "addText20",
  title: "Add 20 words",
  contexts: ["editable"],
  parentId: "addTextFirst",
});

chrome.contextMenus.create({
  id: "addText30",
  title: "Add 30 words",
  contexts: ["editable"],
  parentId: "addTextFirst",
});

chrome.contextMenus.create({
  id: "addText50",
  title: "Add 50 words",
  contexts: ["editable"],
  parentId: "addTextFirst",
});

chrome.contextMenus.create({
  id: "addText100",
  title: "Add 100 words",
  contexts: ["editable"],
  parentId: "addTextFirst",
});

// First level child item
chrome.contextMenus.create({
  id: "addFraseFirst",
  title: "Add Frase",
  contexts: ["editable"],
  parentId: "top-level",
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
        pendingSendResponse({ text: randomText(1) });
      }
      break;
    case "addText5":
      if (typeof pendingSendResponse === "function") {
        pendingSendResponse({ text: generateWords(5) });
      }
      break;
    case "addText10":
      if (typeof pendingSendResponse === "function") {
        pendingSendResponse({ text: generateWords(10) });
      }
      break;
    case "addText20":
      if (typeof pendingSendResponse === "function") {
        pendingSendResponse({ text: generateWords(20) });
      }
      break;
    case "addText30":
      if (typeof pendingSendResponse === "function") {
        pendingSendResponse({ text: generateWords(30) });
      }
      break;
    case "addText50":
      if (typeof pendingSendResponse === "function") {
        pendingSendResponse({ text: generateWords(50) });
      }
      break;
    case "addText100":
      if (typeof pendingSendResponse === "function") {
        pendingSendResponse({ text: generateWords(100) });
      }
      break;
    case "addFraseFirst":
      if (typeof pendingSendResponse === "function") {
        pendingSendResponse({ text: randomText(2) });
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

function randomText(param) {
  if (param === 1) {
    const rand = Math.floor(Math.random() * character.length);
    return character[rand];
  }
  const rand = Math.floor(Math.random() * frases.length);
  return frases[rand];
}

function randomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function getRandomWord(firstLetterToUppercase = false) {
  const word = words[randomNumber(0, words.length - 1)];
  return firstLetterToUppercase
    ? word.charAt(0).toUpperCase() + word.slice(1)
    : word;
}

function generateWords(length = 10) {
  return (
    [...Array(length)]
      .map((_, i) => getRandomWord(i === 0))
      .join(" ")
      .trim() + "."
  );
}
