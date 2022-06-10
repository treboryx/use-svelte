// <div use:shortcut={{shift: true, control: true, code: 'KeyA', cb: () => trigger()}} on:click={() => trigger()}></div>
// will trigger click event if cb not present
export const shortcut = (node, params) => {
  let handler;
  const removeHandler = () => window.removeEventListener("keydown", handler),
    setHandler = () => {
      removeHandler();
      if (!params) return;
      handler = (e) => {
        if (
          !!params.alt != e.altKey ||
          !!params.shift != e.shiftKey ||
          !!params.control != (e.ctrlKey || e.metaKey) ||
          params.code != e.code
        )
          return;
        e.preventDefault();
        params.fn ? params.fn() : node.click();
      };
      window.addEventListener("keydown", handler);
    };
  setHandler();
  return {
    update: setHandler,
    destroy: removeHandler,
  };
};
