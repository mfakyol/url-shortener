const urlInput = document.getElementById("url-input");
const urlButton = document.getElementById("url-button");
const errorMessage = document.getElementById("error-message");

const historyList = document.getElementById("history-list");

function isValidUrl(urlString) {
  var urlPattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return !!urlPattern.test(urlString);
}

urlInput.addEventListener("change", (e) => {
  e.target.classList.remove("error");
});
urlInput.addEventListener("keypress", (e) => {
  if (e.code == "Enter") {
    urlButton.click();
    urlButton.focus();
  }
});

urlButton.addEventListener("click", (e) => {
  const isValid = isValidUrl(urlInput.value);

  if (!isValid) {
    urlInput.classList.add("error");
    errorMessage.classList.add("show");
    return;
  } else {
    errorMessage.classList.remove("show");
  }

  fetch("/short", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ url: urlInput.value }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == true) {
        addHistory(data.data.url, data.data.short, true);
        let history = localStorage.getItem("history");

        if (history) history = JSON.parse(history);
        else history = [];
        history = [{ url: data.data.url, short: data.data.short }, ...history];

        localStorage.setItem("history", JSON.stringify(history));
      }
    });
});

function addHistory(url, short, prepend = false) {
  const itemElement = document.createElement("li");
  itemElement.classList.add("history-list-item");

  const urlTitle = document.createElement("p");
  urlTitle.innerText = `${sourceLinkText}:`;
  urlTitle.classList.add("history-list-item-url-title");
  itemElement.appendChild(urlTitle);

  const urlElement = document.createElement("a");
  urlElement.classList.add("history-list-item-url");
  urlElement.setAttribute("target", "_blank");
  urlElement.href = url;
  urlElement.innerText = url;
  itemElement.appendChild(urlElement);

  const shortTitle = document.createElement("p");
  shortTitle.innerText = `${shortLinkText}:`;
  shortTitle.classList.add("history-list-item-short-title");
  itemElement.appendChild(shortTitle);

  const shorElement = document.createElement("a");
  shorElement.classList.add("history-list-item-short");
  shorElement.setAttribute("target", "_blank");
  shorElement.href = short;
  shorElement.innerText = short;
  itemElement.appendChild(shorElement);

  const copyButton = document.createElement("button");
  copyButton.classList.add("history-list-item-button");
  copyButton.addEventListener("click", () => copy(short));
  copyButton.innerText = copyButtonText;
  itemElement.appendChild(copyButton);

  if (prepend) historyList.prepend(itemElement);
  else historyList.append(itemElement);
}

let initialHistory = localStorage.getItem("history");

if (initialHistory) {
  initialHistory = JSON.parse(initialHistory);
  initialHistory.forEach((history) => {
    addHistory(history.url, history.short);
  });
}

function copy(val) {
  navigator.clipboard.writeText(val).then(() => alert(linkCopyedSuccesfuly));
}
