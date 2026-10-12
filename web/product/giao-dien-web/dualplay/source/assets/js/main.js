/* Plain JavaScript. All motion is finite and starts only after an action. */
(() => {
  const editions = [
    {
      name: "Genshin Impact",
      title: "GENSHIN<br>IMPACT",
      theme: "jade",
      image: "jade-v3.webp",
      copy: "A world of adventure, in your hands. Ivory, jade and delicate gold details meet in this fantasy-inspired concept.",
      alt: "Ivory and teal controller with gold ornament and a fantasy crest",
    },
    {
      name: "God of War",
      title: "GOD OF<br>WAR",
      theme: "crimson",
      image: "crimson-v3.webp",
      copy: "For the journey ahead. A striking frost-white shell and crimson finish inspired by an unforgettable adventure.",
      alt: "White and crimson controller with black analog sticks",
    },
    {
      name: "007 First Light",
      title: "007 FIRST<br>LIGHT",
      theme: "gold",
      image: "gold-v3.webp",
      copy: "Style. Power. Precision. Make your next mission a golden one with this collector-inspired finish.",
      alt: "Gold and black controller with a circular 007 touchpad",
    },
  ];
  const scene = document.querySelector(".showroom");
  const hero = document.querySelector("#hero-product");
  let selected = 0,
    requested = 0,
    frame = 0,
    queuedDirection = 1;
  const bag = new Map();
  const asset = (edition) => "assets/img/" + edition.image;
  function render(index) {
    selected = (index + editions.length) % editions.length;
    const edition = editions[selected];
    scene.dataset.theme = edition.theme;
    hero.src = asset(edition);
    hero.alt = edition.alt;
    document.querySelector("#edition-title").innerHTML = edition.title;
    document.querySelector("#edition-copy").textContent = edition.copy;
    document.querySelector(".film-name").textContent =
      edition.name.toUpperCase();
    document.querySelector(".edition-film img").src = asset(edition);
    document.querySelector("#slide-count").textContent =
      "0" + (selected + 1) + " / 03";
    document.querySelectorAll("[data-edition]").forEach((button) => {
      const i = Number(button.dataset.edition);
      const rank = (i - selected + editions.length) % editions.length;
      button.setAttribute("aria-pressed", "false");
      button.hidden = rank === 0;
      button.dataset.upcoming = String(rank);
      button.style.order = String(rank);
      button.setAttribute(
        "aria-label",
        (rank === 1 ? "Next edition: " : "Following edition: ") +
          editions[i].name,
      );
    });
    document
      .querySelectorAll(".pagination span")
      .forEach((dot, i) => dot.classList.toggle("active", i === selected));
    document.querySelector("#announcement").textContent =
      edition.name + " selected";
  }
  /* Keep the latest requested destination while the current scene completes.
     Overlapping layers avoid a blank frame or restarting visible motion. */
  function change(index, direction = 1) {
    requested = (index + editions.length) % editions.length;
    queuedDirection = direction;
    if (frame || requested === selected) return;
    const target = requested;
    const previous = selected;
    const captureSlots = (current) =>
      editions.map((edition, i) => {
        const element =
          i === current
            ? hero
            : document.querySelector(`[data-edition="${i}"] img`);
        const rect = element.getBoundingClientRect();
        const matrix = getComputedStyle(element.parentElement).transform;
        const parts = matrix.startsWith("matrix(")
          ? matrix.slice(7, -1).split(",").map(Number)
          : [1, 0];
        const parentScale = Math.hypot(parts[0], parts[1]);
        const fitWidth = Math.min(
          element.offsetWidth * parentScale,
          element.offsetHeight * parentScale * 1.5,
        );
        return {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          width: fitWidth,
          height: fitWidth / 1.5,
          angle:
            i === current || element.parentElement.dataset.upcoming === "1"
              ? 0
              : -30,
        };
      });
    const beforeSlots = captureSlots(selected);
    const copy = document.querySelector(".hero-copy");
    const oldCopyRect = copy.getBoundingClientRect();
    const sceneRect = scene.getBoundingClientRect();
    const oldAccent = getComputedStyle(scene)
      .getPropertyValue("--accent")
      .trim();
    const backdrop = document.createElement("div");
    backdrop.className = "transition-backdrop";
    backdrop.setAttribute("aria-hidden", "true");
    backdrop.style.background = getComputedStyle(scene).backgroundImage;
    scene.prepend(backdrop);

    const oldCopy = copy.cloneNode(true);
    oldCopy.setAttribute("aria-hidden", "true");
    oldCopy.inert = true;
    oldCopy.querySelectorAll("[id]").forEach((el) => el.removeAttribute("id"));
    oldCopy.style.pointerEvents = "none";
    oldCopy.style.top = oldCopyRect.top - sceneRect.top + "px";
    oldCopy.style.left = oldCopyRect.left - sceneRect.left + "px";
    oldCopy.style.width = oldCopyRect.width + "px";
    scene.append(oldCopy);
    render(target);
    const newAccent = getComputedStyle(scene)
      .getPropertyValue("--accent")
      .trim();
    const afterSlots = captureSlots(selected);
    const visualLayers = editions.map((edition, i) => {
      const image = document.createElement("img");
      image.src = asset(edition);
      image.alt = "";
      image.className = "orbit-product-layer";
      image.setAttribute("aria-hidden", "true");
      const origin = beforeSlots[i];
      Object.assign(image.style, {
        left: origin.x - sceneRect.left - origin.width / 2 + "px",
        top: origin.y - sceneRect.top - origin.height / 2 + "px",
        width: origin.width + "px",
        height: origin.height + "px",
        transform:
          "perspective(200px) rotateY(" +
          (origin.angle ? -35 : 0) +
          "deg) rotate(" +
          origin.angle +
          "deg)",
        zIndex: "2",
      });
      scene.append(image);
      return image;
    });
    const realImages = [
      hero,
      ...document.querySelectorAll(".thumbnail-rail img"),
    ];
    realImages.forEach((image) => (image.style.opacity = "0"));
    copy.style.opacity = "0";
    const rgb = (color) => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const context = canvas.getContext("2d");
      context.fillStyle = color;
      context.fillRect(0, 0, 1, 1);
      return Array.from(context.getImageData(0, 0, 1, 1).data).slice(0, 3);
    };
    const from = rgb(oldAccent),
      to = rgb(newAccent);
    scene.style.setProperty("--accent", oldAccent);
    const start = performance.now();
    function tick(now) {
      const p = Math.min((now - start) / 1300, 1);
      const eased = p * p * p * (p * (p * 6 - 15) + 10);
      const arc = Math.sin(Math.PI * eased);
      const settle = Math.max(0, (p - 0.88) / 0.12);
      visualLayers.forEach((image, i) => {
        const fromSlot = beforeSlots[i],
          toSlot = afterSlots[i];
        const mainLeg = i === previous || i === target;
        const height = Math.min(innerHeight * 0.14, mainLeg ? 125 : 65);
        const bend = i === target ? -direction : direction;
        const x = fromSlot.x + (toSlot.x - fromSlot.x) * eased;
        const y =
          fromSlot.y + (toSlot.y - fromSlot.y) * eased + bend * height * arc;
        const width = fromSlot.width + (toSlot.width - fromSlot.width) * eased;
        const scale = width / fromSlot.width;
        const angle =
          fromSlot.angle +
          (toSlot.angle - fromSlot.angle) * eased +
          direction * arc * (mainLeg ? 8 : 12);
        const tilt =
          (fromSlot.angle ? -35 : 0) * (1 - eased) +
          (toSlot.angle ? -35 : 0) * eased;
        image.style.opacity = String(1 - settle);
        image.style.transform =
          "translate(" +
          (x - fromSlot.x) +
          "px," +
          (y - fromSlot.y) +
          "px) scale(" +
          scale +
          ") perspective(200px) rotateY(" +
          tilt +
          "deg) rotate(" +
          angle +
          "deg)";
        image.style.zIndex = String(i === target ? 4 : 2);
      });
      realImages.forEach((image) => (image.style.opacity = String(settle)));
      const outPhase = Math.min(p / 0.45, 1);
      const inPhase = Math.max(0, (p - 0.45) / 0.55);
      oldCopy.style.opacity = String(
        1 - outPhase * outPhase * (3 - 2 * outPhase),
      );
      oldCopy.style.transform = "translateX(" + -direction * 22 * eased + "px)";
      copy.style.opacity = String(inPhase * inPhase * (3 - 2 * inPhase));
      copy.style.transform =
        "translateX(" + direction * 22 * (1 - eased) + "px)";
      backdrop.style.opacity = String(1 - eased);
      scene.style.setProperty(
        "--accent",
        "rgb(" +
          from.map((v, i) => Math.round(v + (to[i] - v) * eased)).join(",") +
          ")",
      );
      if (p < 1) frame = requestAnimationFrame(tick);
      else {
        frame = 0;
        visualLayers.forEach((image) => image.remove());
        realImages.forEach((image) => image.style.removeProperty("opacity"));
        oldCopy.remove();
        backdrop.remove();
        hero.style.removeProperty("opacity");
        hero.style.removeProperty("transform");
        copy.style.removeProperty("opacity");
        copy.style.removeProperty("transform");
        scene.style.removeProperty("--accent");
        if (requested !== selected) change(requested, queuedDirection);
      }
    }
    frame = requestAnimationFrame(tick);
  }
  document
    .querySelector("#next")
    .addEventListener("click", () => change(requested + 1, 1));
  document
    .querySelector("#previous")
    .addEventListener("click", () => change(requested - 1, -1));
  document
    .querySelectorAll("[data-edition]")
    .forEach((button) =>
      button.addEventListener("click", () =>
        change(Number(button.dataset.edition), 1),
      ),
    );
  document
    .querySelectorAll("[data-select]")
    .forEach((link) =>
      link.addEventListener("click", () => change(Number(link.dataset.select))),
    );
  scene.addEventListener("keydown", (event) => {
    if (event.target.closest("button,a")) return;
    if (event.key === "ArrowRight") change(requested + 1, 1);
    if (event.key === "ArrowLeft") change(requested - 1, -1);
  });
  let touchStart = null;
  const stage = document.querySelector(".product-stage");
  stage.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "touch") touchStart = event.clientX;
  });
  stage.addEventListener("pointerup", (event) => {
    if (touchStart !== null && Math.abs(event.clientX - touchStart) > 45)
      change(
        selected + (event.clientX < touchStart ? 1 : -1),
        event.clientX < touchStart ? 1 : -1,
      );
    touchStart = null;
  });
  stage.addEventListener("pointercancel", () => {
    touchStart = null;
  });
  const details = document.querySelector("#detail-dialog");
  let previewFrame = 0;
  const detailImage = document.querySelector("#detail-image");
  function stopPreview() {
    cancelAnimationFrame(previewFrame);
    previewFrame = 0;
    detailImage.style.removeProperty("transform");
  }
  details.addEventListener("close", stopPreview);
  document.querySelectorAll(".info-open").forEach((button) =>
    button.addEventListener("click", () => {
      const edition = editions[selected];
      document.querySelector("#detail-title").textContent = edition.name;
      document.querySelector("#detail-image").src = asset(edition);
      document.querySelector("#detail-image").alt = edition.alt;
      document.querySelector("#detail-copy").textContent = edition.copy;
      details.showModal();
      if (button.classList.contains("edition-film")) {
        stopPreview();
        const start = performance.now();
        function tick(now) {
          const progress = Math.min((now - start) / 6000, 1);
          const ease = Math.sin(progress * Math.PI);
          detailImage.style.transform = `scale(${1 + ease * 0.07}) rotate(${ease * -3}deg)`;
          if (progress < 1 && details.open)
            previewFrame = requestAnimationFrame(tick);
          else stopPreview();
        }
        previewFrame = requestAnimationFrame(tick);
      }
    }),
  );
  document
    .querySelectorAll(".dialog-close")
    .forEach((button) =>
      button.addEventListener("click", () => button.closest("dialog").close()),
    );
  function renderBag() {
    const items = document.querySelector("#cart-items");
    items.replaceChildren();
    let count = 0;
    bag.forEach((quantity, index) => {
      count += quantity;
      const row = document.createElement("div");
      row.className = "cart-row";
      const img = document.createElement("img");
      img.src = asset(editions[index]);
      img.alt = "";
      const text = document.createElement("div");
      text.textContent = editions[index].name;
      const small = document.createElement("small");
      small.textContent = quantity + " × $79.99";
      text.append(small);
      const remove = document.createElement("button");
      remove.type = "button";
      remove.textContent = "×";
      remove.setAttribute("aria-label", "Remove " + editions[index].name);
      remove.addEventListener("click", () => {
        bag.delete(index);
        renderBag();
      });
      row.append(img, text, remove);
      items.append(row);
    });
    if (!count) {
      const empty = document.createElement("p");
      empty.textContent = "Your bag is empty.";
      items.append(empty);
    }
    document.querySelector("#bag-count").textContent = String(count);
    document.querySelector("#bag-count").hidden = count === 0;
    document.querySelector("#cart-total").textContent =
      "$" + (count * 79.99).toFixed(2);
  }
  document.querySelector("#add-cart").addEventListener("click", () => {
    bag.set(selected, (bag.get(selected) || 0) + 1);
    renderBag();
    document.querySelector("#announcement").textContent =
      editions[selected].name + " added to demo bag";
    document.querySelector("#cart-dialog").showModal();
  });
  document
    .querySelector(".cart-open")
    .addEventListener("click", () =>
      document.querySelector("#cart-dialog").showModal(),
    );
  const reveals = document.querySelectorAll(
    ".edition-grid article,.story,.support",
  );
  if ("IntersectionObserver" in window) {
    document.documentElement.classList.add("js");
    reveals.forEach((element) => element.classList.add("reveal"));
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const start = performance.now();
          function tick(now) {
            const p = Math.min((now - start) / 700, 1),
              e = 1 - (1 - p) ** 3;
            entry.target.style.opacity = String(e);
            entry.target.style.transform = `translateY(${30 * (1 - e)}px)`;
            if (p < 1) requestAnimationFrame(tick);
            else {
              entry.target.classList.remove("reveal");
              entry.target.style.removeProperty("opacity");
              entry.target.style.removeProperty("transform");
            }
          }
          requestAnimationFrame(tick);
        }),
      { threshold: 0.12 },
    );
    reveals.forEach((element) => observer.observe(element));
  }
  /* Avoid presenting inert interactive controls when JavaScript is unavailable. */
  document.documentElement.classList.add("ready");
  render(0);
})();
