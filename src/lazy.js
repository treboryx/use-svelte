const loaded = new Map();

// <img src="placeholder" use:lazy="{{src: 'lazy load'}}">

export default (node, data) => {
  const img = new Image();
  img.src = data.src;
  img.onload = () => {
    loaded.set(data.src, img);
    node.setAttribute("src", data.src);
  };

  return {
    destroy() {},
  };
};
