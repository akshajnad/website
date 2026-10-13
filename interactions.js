(function () {
  "use strict";
  var focusContent = {
    cloud: {
      title: "AI with a human in the loop.",
      description: "Bedrock agents + serverless workflows at Travelers.",
      href: "#travelers",
    },
    product: {
      title: "An idea becomes a working product.",
      description: "Linked requirements + interactive prototypes at Signifi.",
      href: "#signifi",
    },
    vision: {
      title: "Make every voice part of the conversation.",
      description: "Audio + computer vision power live captions in Graption.",
      href: "#graption",
    },
  };
  document.querySelectorAll("[data-focus]").forEach(function (button) {
    button.addEventListener("click", function () {
      var content = focusContent[button.dataset.focus];
      document.querySelectorAll("[data-focus]").forEach(function (item) {
        item.setAttribute("aria-pressed", String(item === button));
      });
      document.querySelector("[data-focus-title]").textContent = content.title;
      document.querySelector("[data-focus-description]").textContent =
        content.description;
      document.querySelector("[data-focus-link]").href = content.href;
    });
  });
  document
    .querySelectorAll('a[href="#signifi-details"]')
    .forEach(function (link) {
      link.addEventListener("click", function () {
        document.getElementById("signifi-details").open = true;
      });
    });
  var copyButton = document.querySelector("[data-copy-email]");
  var copyStatus = document.querySelector("[data-copy-status]");
  if (copyButton)
    copyButton.addEventListener("click", async function () {
      try {
        if (!navigator.clipboard) throw new Error("Clipboard unavailable");
        await navigator.clipboard.writeText("akshajnadn@gmail.com");
        copyButton.textContent = "Email copied ✓";
        copyStatus.textContent = "Email address copied to clipboard.";
      } catch (error) {
        copyButton.textContent = "Select the email above to copy";
        copyStatus.textContent =
          "Copy is unavailable in this browser. Select akshajnadn@gmail.com above, or use the email link.";
      }
    });
})();
