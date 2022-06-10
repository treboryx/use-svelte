// <div use:tooltip contet='some content'></div>

export default (element) => {
  let div;
  let content;
  function mouseOver(event) {
    content = element.getAttribute("content");
    if (content) {
      element.removeAttribute("content");

      div = document.createElement("div");
      div.textContent = content;
      div.style = `
      top: ${event.pageX + 5}px; 
      left: ${event.pageY + 5}px;
      position: absolute;
      border-radius: 0.25rem;
      border-width: 1px;
      border-color: rgb(31 41 55 / 0.2);
      background-color: rgb(255 255 255 / 1);
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      font-size: 0.875rem;
      line-height: 1.25rem;
      font-weight: 600;
      text-transform: uppercase;
      color: rgb(0 0 0 / 1);
      box-shadow: 0 0 #0000, 0 0 #0000, 0 1px 3px 0 rgb(0 0 0 / 0.1),
        0 1px 2px -1px rgb(0 0 0 / 0.1);`;
      div.classList = "use_svelte_tooltip";
      document.body.appendChild(div);
    }
  }

  function mouseMove(event) {
    div.style.left = `${event.pageX + 5}px`;
    div.style.top = `${event.pageY + 5}px`;
  }

  function mouseLeave() {
    document.body.removeChild(div);
    element.setAttribute("content", content);
  }

  element.addEventListener("mouseover", mouseOver);
  element.addEventListener("mouseleave", mouseLeave);
  element.addEventListener("mouseout", mouseLeave);
  element.addEventListener("mousemove", mouseMove);

  return {
    destroy() {
      element.removeEventListener("mouseover", mouseOver);
      element.removeEventListener("mouseleave", mouseLeave);
      element.removeEventListener("mousemove", mouseMove);
    },
  };
};
