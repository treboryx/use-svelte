export default (node, target) => {
  const copyText = async () => {
    let text = target
      ? document.querySelector(target).innerText
      : node.innerText;

    try {
      await navigator.clipboard.writeText(text);

      node.dispatchEvent(
        new CustomEvent("copySuccess", {
          bubbles: true,
        })
      );
    } catch (error) {
      node.dispatchEvent(
        new CustomEvent("copyError", {
          bubbles: true,
          detail: error,
        })
      );
    }
  };

  node.addEventListener("click", copyText);

  return {
    destroy() {
      node.removeEventListener("click", copyText);
    },
  };
};
