document.addEventListener("contextmenu", (e) => {
  // console.debug(e);
  chrome.runtime.sendMessage({ command: "get_text" }, (response) => {
    e.target.value += response.text;
  });
});
