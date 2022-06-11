// <div use:shortcut={{shift: true, control: true, code: 'KeyA', fn: () => trigger()}} on:click={() => trigger()}></div>
// will trigger click event if fn not present

export default (node, params) => {
  let handler;
  const removeHandler = () => window.removeEventListener("keydown", handler);
  const setHandler = () => {
    removeHandler();
    if (!params) return;
    handler = (e) => {
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
