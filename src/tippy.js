import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

export default (node, options) => {
  let tip = tippy(node, options);
  return {
    update: (newOptions) => {
      tip.setProps(newOptions);
    },
    destroy: () => {
      tip.destroy();
    },
  };
};
