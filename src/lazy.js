const options = {
  root: null,
  rootMargin: "0px",
  threshold: 0,
};

export default (image, src) => {
  if ("IntersectionObserver" in window) {
    const loaded = () => {
      image.style.opacity = "1";
    };
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        image.src = src;
        if (image.complete) {
          loaded();
        } else {
          image.addEventListener("load", loaded);
        }
      }
    }, options);

    observer.observe(image);

    return {
      destroy() {
        image.removeEventListener("load", loaded); // clean up the event listener
      },
    };
  } else {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      image.setAttribute("src", src);
    };

    return {
      destroy() {},
    };
  }
};
