(() => {
  "use strict";
  const PRODUCTS = [
    {
      "id": "paraiba",
      "code": "CF-3123-PABL",
      "name": "Open Gear Flying Tourbillon Paraiba",
      "family": "Tourbillon",
      "face": "assets/img/paraiba.webp",
      "case": "steel",
      "strap": "blue",
      "size": 42,
      "price": 34800,
      "usd": 38200,
      "tone": "blue"
    },
    {
      "id": "jupiter",
      "code": "CF-9343-CUBK",
      "name": "Space Timer Jupiter",
      "family": "Regulator",
      "face": "assets/img/jupiter.webp",
      "case": "steel",
      "strap": "black",
      "size": 44,
      "price": 18500,
      "usd": 20300,
      "tone": "gold"
    },
    {
      "id": "cowboy",
      "code": "CF-6725-BKGO",
      "name": "Flying Grand Regulator Skeleton Cowboy",
      "family": "Skeleton",
      "face": "assets/img/skeleton.webp",
      "case": "black",
      "strap": "brown",
      "size": 44,
      "price": 16200,
      "usd": 17800,
      "tone": "violet"
    },
    {
      "id": "opus-orange",
      "code": "CF-7543-BLOR",
      "name": "Opus Chronograph",
      "family": "Chronograph",
      "face": "assets/img/opus.webp",
      "case": "steel",
      "strap": "blue",
      "size": 40,
      "price": 14200,
      "usd": 15600,
      "tone": "blue"
    },
    {
      "id": "jupiter-gold",
      "code": "CF-9343-GOLD",
      "name": "Space Timer Jupiter Gold",
      "family": "Regulator",
      "face": "assets/img/jupiter.webp",
      "case": "gold",
      "strap": "brown",
      "size": 44,
      "price": 24800,
      "usd": 27300,
      "tone": "gold"
    },
    {
      "id": "black-hole",
      "code": "CF-9343-DARK",
      "name": "Space Timer Black Hole",
      "family": "Regulator",
      "face": "assets/img/skeleton.webp",
      "case": "black",
      "strap": "black",
      "size": 44,
      "price": 21600,
      "usd": 23800,
      "tone": "violet"
    },
    {
      "id": "sunset",
      "code": "CF-3123-ORBL",
      "name": "Open Gear Flying Tourbillon Sunset",
      "family": "Tourbillon",
      "face": "assets/img/opus.webp",
      "case": "steel",
      "strap": "brown",
      "size": 42,
      "price": 34800,
      "usd": 38200,
      "tone": "gold"
    },
    {
      "id": "meteorite",
      "code": "CF-3123-BKBL",
      "name": "Open Gear Flying Tourbillon Meteorite",
      "family": "Tourbillon",
      "face": "assets/img/ice.webp",
      "case": "steel",
      "strap": "black",
      "size": 42,
      "price": 34800,
      "usd": 38200,
      "tone": "blue"
    },
    {
      "id": "skeleton-gold",
      "code": "CF-3715R-BK",
      "name": "Skeleton",
      "family": "Skeleton",
      "face": "assets/img/skeleton.webp",
      "case": "gold",
      "strap": "black",
      "size": 40,
      "price": 27200,
      "usd": 29900,
      "tone": "rose"
    },
    {
      "id": "skeleton-steel",
      "code": "CF-3715S-BK",
      "name": "Skeleton Steel",
      "family": "Skeleton",
      "face": "assets/img/skeleton.webp",
      "case": "steel",
      "strap": "black",
      "size": 40,
      "price": 18800,
      "usd": 20700,
      "tone": "violet"
    },
    {
      "id": "opus-ice",
      "code": "CF-7543-BLSI",
      "name": "Opus Chronograph Ice",
      "family": "Chronograph",
      "face": "assets/img/ice.webp",
      "case": "steel",
      "strap": "blue",
      "size": 40,
      "price": 14200,
      "usd": 15600,
      "tone": "blue"
    }
  ];
  const FEATURED = ["paraiba", "jupiter", "cowboy", "opus-orange"];
  const byId = (id) => PRODUCTS.find((product) => product.id === id);
  const stage = document.querySelector("#watch-stage");
  const shell = document.querySelector(".site-shell");
  const bag = /* @__PURE__ */ new Map();
  const saved = /* @__PURE__ */ new Set();
  let featuredIndex = 0, detailId = "skeleton-gold", currency = "EUR", motion = true;
  let view = "home", carouselFrame = 0, loaderFrame = 0, loaderToken = 0, opener;
  let visual = { x: 0, opacity: 1 };
  const renderer = window.ChronoWatch3D ? new window.ChronoWatch3D(stage, byId("paraiba")) : null;
  const clamp = (value) => Math.max(0, Math.min(1, value));
  const ease = (value) => 1 - Math.pow(1 - value, 3);
  const money = (value) => new Intl.NumberFormat("en-GB", { style: "currency", currency, minimumFractionDigits: 2 }).format(value);
  const price = (product) => currency === "EUR" ? product.price : product.usd;
  function setModel(product) {
    if (renderer) renderer.setModel(product);
    else stage.querySelectorAll("[data-dial]").forEach((image) => image.setAttribute("href", product.face));
    shell.dataset.tone = product.tone;
    stage.setAttribute("aria-label", `${product.name} concept watch. Drag to inspect its shape.`);
  }
  function copyWatch(id, suffix) {
    const svg = document.querySelector(`.watch-card[data-product="${id}"] .watch-fallback`).cloneNode(true);
    svg.querySelectorAll("[id]").forEach((node) => {
      const previous = node.id;
      node.id += `-${suffix}`;
      svg.querySelectorAll("[clip-path]").forEach((image) => {
        if (image.getAttribute("clip-path") === `url(#${previous})`) image.setAttribute("clip-path", `url(#${node.id})`);
      });
    });
    return svg;
  }
  function heroCopy() {
    const product = byId(FEATURED[featuredIndex]);
    document.querySelector("#hero-code").textContent = product.code;
    const headings = ["OPEN GEAR\nFLYING\nTOURBILLON\nPARAIBA", "SPACE\nTIMER\nJUPITER", "FLYING GRAND\nREGULATOR\nSKELETON\nCOWBOY", "OPUS\nCHRONOGRAPH"];
    const title = document.querySelector("#hero-name");
    title.replaceChildren();
    headings[featuredIndex].split("\n").forEach((line, i) => {
      if (i) title.append(document.createElement("br"));
      title.append(document.createTextNode(line));
    });
    document.querySelector("#previous-name").textContent = byId(FEATURED[(featuredIndex + 3) % 4]).name;
    document.querySelector("#next-name").textContent = byId(FEATURED[(featuredIndex + 1) % 4]).name;
    document.querySelectorAll("[data-feature]").forEach((button) => button.setAttribute("aria-pressed", String(Number(button.dataset.feature) === featuredIndex)));
    document.querySelector("#selection-status").textContent = `${product.name} selected.`;
  }
  function detailCopy() {
    const product = byId(detailId), family = PRODUCTS.filter((p) => p.family === product.family);
    document.querySelector("#detail-name").textContent = product.name.toUpperCase();
    document.querySelector("#detail-code").textContent = product.code;
    document.querySelector("#detail-price").textContent = money(price(product));
    document.querySelector("#detail-info-title").textContent = `${product.name} \xB7 ${product.code}`;
    document.querySelector("#detail-description").textContent = "Sculptural bridges, an open movement and carefully contrasted finishes. This independent watchmaking concept uses illustrative specifications, edition sizes and prices.";
    document.querySelector("#detail-case").textContent = `${product.size} mm \xB7 ${product.case === "gold" ? "Rose-gold" : product.case === "black" ? "Dark coated" : "Steel"} concept case`;
    document.querySelector("#detail-strap").textContent = `Textured ${product.strap} strap`;
    document.querySelector("#detail-counter").textContent = `${String(family.indexOf(product) + 1).padStart(2, "0")} / ${String(family.length).padStart(2, "0")}`;
    document.querySelector("#detail-save").setAttribute("aria-pressed", String(saved.has(product.id)));
    const related = document.querySelector("#related-models");
    related.replaceChildren();
    family.forEach((p) => {
      const button = document.createElement("button");
      button.type = "button";
      button.setAttribute("aria-label", `Show ${p.name}`);
      button.setAttribute("aria-pressed", String(p.id === product.id));
      button.append(copyWatch(p.id, "related"));
      button.addEventListener("click", () => changeDetail(p.id, p.id === product.id ? 1 : family.indexOf(p) >= family.indexOf(product) ? 1 : -1));
      related.append(button);
    });
  }
  function stopMovement() {
    renderer?.stop();
    document.querySelector("#movement-label").textContent = "View movement";
  }
  function settle() {
    cancelAnimationFrame(carouselFrame);
    carouselFrame = 0;
    visual = { x: 0, opacity: 1 };
    stage.style.transform = "none";
    stage.style.opacity = "1";
    setModel(byId(view === "detail" ? detailId : FEATURED[featuredIndex]));
    renderer?.pose(view === "detail" ? -0.05 : -0.25, view === "detail" ? 0 : -0.38, view === "detail" ? 0 : -0.26);
    view === "detail" ? detailCopy() : heroCopy();
  }
  function animateModel(product, direction, copy) {
    cancelAnimationFrame(carouselFrame);
    stopMovement();
    const start = performance.now(), previous = { ...visual }, angles = renderer ? { ...renderer.angle } : { x: 0, y: 0, z: 0 };
    let replaced = false;
    if (!motion) {
      setModel(product);
      copy();
      settle();
      return;
    }
    const frame = (now) => {
      const p = clamp((now - start) / 1050);
      if (p < 0.45) {
        const t = ease(p / 0.45);
        visual.x = previous.x - direction * stage.clientWidth * 0.3 * t;
        visual.opacity = previous.opacity * (1 - t);
        if (renderer) {
          renderer.angle.y = angles.y + direction * Math.PI * t;
          renderer.draw();
        }
      } else {
        if (!replaced) {
          setModel(product);
          copy();
          replaced = true;
        }
        const t = ease((p - 0.45) / 0.55);
        visual.x = direction * stage.clientWidth * 0.3 * (1 - t);
        visual.opacity = t;
        if (renderer) {
          renderer.angle = { x: view === "detail" ? -0.05 : -0.25, y: (view === "detail" ? 0 : -0.38) + direction * Math.PI * (1 - t), z: view === "detail" ? 0 : -0.26 };
          renderer.draw();
        }
      }
      stage.style.transform = `translateX(${visual.x}px)`;
      stage.style.opacity = String(visual.opacity);
      if (p < 1) carouselFrame = requestAnimationFrame(frame);
      else {
        carouselFrame = 0;
        visual = { x: 0, opacity: 1 };
        stage.style.transform = "none";
        stage.style.opacity = "1";
      }
    };
    carouselFrame = requestAnimationFrame(frame);
  }
  function changeFeature(requested, direction) {
    featuredIndex = (requested % 4 + 4) % 4;
    animateModel(byId(FEATURED[featuredIndex]), direction, heroCopy);
  }
  function changeDetail(id, direction = 1) {
    detailId = id;
    animateModel(byId(id), direction, detailCopy);
  }
  function routeFlash() {
    cancelAnimationFrame(loaderFrame);
    const token = ++loaderToken, overlay = document.querySelector(".route-loader"), clock = overlay.querySelector(".loader-clock");
    if (!motion) {
      overlay.style.opacity = "0";
      return;
    }
    const start = performance.now();
    const frame = (now) => {
      if (token !== loaderToken) return;
      const p = clamp((now - start) / 650);
      overlay.style.opacity = String(p < 0.25 ? p / 0.25 : (1 - p) / 0.75);
      clock.style.transform = `rotate(${p * 180}deg)`;
      overlay.querySelector("i").style.transform = `rotate(${p * 330}deg)`;
      overlay.querySelector("b").style.transform = `rotate(${-p * 170}deg)`;
      if (p < 1) loaderFrame = requestAnimationFrame(frame);
      else {
        loaderFrame = 0;
        overlay.style.opacity = "0";
      }
    };
    loaderFrame = requestAnimationFrame(frame);
  }
  function setView(next, flash = true, anchor = null) {
    cancelAnimationFrame(carouselFrame);
    stopMovement();
    closeMenu();
    view = next;
    document.querySelectorAll("[data-view]").forEach((panel) => {
      const active = panel.dataset.view === next;
      panel.classList.toggle("is-active", active);
      panel.hidden = !active;
      panel.inert = !active;
    });
    if (next === "detail") {
      document.querySelector(".detail__visual-slot").append(stage);
      detailCopy();
    }
    if (next === "home") {
      document.querySelector(".hero__visual-slot").append(stage);
      heroCopy();
    }
    if (next === "home" || next === "detail") {
      settle();
      renderer?.resize();
    }
    if (next === "collection") {
      filterCollection();
      shell.dataset.tone = "violet";
    }
    if (next === "cart") {
      renderBag();
      shell.dataset.tone = "blue";
    }
    window.scrollTo({ top: 0, behavior: "instant" });
    if (flash) routeFlash();
    if (anchor) requestAnimationFrame(() => document.querySelector(`#${anchor}`)?.scrollIntoView({ behavior: motion ? "smooth" : "auto" }));
  }
  function navigate(next, anchor = null) {
    const hash = anchor || { home: "home", collection: "collection", detail: "detail", cart: "cart" }[next];
    history.pushState(null, "", `#${hash}`);
    setView(next, true, anchor);
  }
  document.querySelectorAll('a[href^="#"]').forEach((link) => link.addEventListener("click", (event) => {
    const target = link.getAttribute("href").slice(1);
    if (["home", "collection", "detail", "cart", "service", "contact"].includes(target)) {
      event.preventDefault();
      navigate(["service", "contact"].includes(target) ? "home" : target, ["service", "contact"].includes(target) ? target : null);
    }
  }));
  addEventListener("popstate", () => {
    const hash = location.hash.slice(1);
    setView(["collection", "detail", "cart"].includes(hash) ? hash : "home", false, ["service", "contact"].includes(hash) ? hash : null);
  });
  document.querySelectorAll("[data-direction]").forEach((button) => button.addEventListener("click", () => changeFeature(featuredIndex + Number(button.dataset.direction), Number(button.dataset.direction))));
  document.querySelectorAll("[data-feature]").forEach((button) => button.addEventListener("click", () => changeFeature(Number(button.dataset.feature), Number(button.dataset.feature) >= featuredIndex ? 1 : -1)));
  document.querySelector(".hero__controls").addEventListener("keydown", (event) => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      const d = event.key === "ArrowRight" ? 1 : -1;
      changeFeature(featuredIndex + d, d);
    }
  });
  document.querySelector("#find-out").addEventListener("click", () => {
    detailId = FEATURED[featuredIndex];
    navigate("detail");
  });
  document.querySelectorAll("[data-open]").forEach((button) => button.addEventListener("click", () => {
    detailId = button.dataset.open;
    navigate("detail");
  }));
  document.querySelector("#movement-preview").addEventListener("click", () => {
    if (renderer?.rotationFrame) {
      stopMovement();
      return;
    }
    if (!motion || !renderer) {
      showInfo("Movement inspection", "Rotation is paused or WebGL is unavailable. You can still explore every model and specification.");
      return;
    }
    cancelAnimationFrame(carouselFrame);
    settle();
    document.querySelector("#movement-label").textContent = "Stop movement";
    renderer.turn(3200, stopMovement);
  });
  document.querySelector("#front-view").addEventListener("click", () => renderer?.pose(-0.05, 0, 0));
  document.querySelector("#back-view").addEventListener("click", () => renderer?.pose(-0.05, Math.PI, 0));
  document.querySelector("#rotate-view").addEventListener("click", () => {
    if (motion) renderer?.turn(3e3);
  });
  function stepDetail(direction) {
    const family = PRODUCTS.filter((p) => p.family === byId(detailId).family);
    changeDetail(family[(family.findIndex((p) => p.id === detailId) + direction + family.length) % family.length].id, direction);
  }
  document.querySelector("#detail-previous").addEventListener("click", () => stepDetail(-1));
  document.querySelector("#detail-next").addEventListener("click", () => stepDetail(1));
  const toggle = document.querySelector(".menu-toggle"), menu = document.querySelector("#menu-panel");
  function closeMenu(focus = false) {
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    if (focus) toggle.focus();
  }
  toggle.addEventListener("click", () => {
    const open = toggle.getAttribute("aria-expanded") !== "true";
    menu.hidden = !open;
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  });
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => closeMenu()));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") closeMenu(true);
  });
  let savedOnly = false;
  function toggleSaved(id) {
    saved.has(id) ? saved.delete(id) : saved.add(id);
    document.querySelectorAll(`[data-save="${id}"]`).forEach((button) => {
      button.setAttribute("aria-pressed", String(saved.has(id)));
      button.textContent = saved.has(id) ? "\u2665" : "\u2661";
    });
    if (view === "detail") detailCopy();
    if (savedOnly) filterCollection();
  }
  document.querySelectorAll("[data-save]").forEach((button) => button.addEventListener("click", () => toggleSaved(button.dataset.save)));
  document.querySelector("#detail-save").addEventListener("click", () => toggleSaved(detailId));
  document.querySelector("#saved-toggle").addEventListener("click", () => {
    savedOnly = !savedOnly;
    navigate("collection");
  });
  const filters = { family: "all", size: "all", material: "all", query: "" };
  function filterCollection() {
    let count = 0;
    document.querySelectorAll(".watch-card").forEach((card) => {
      const p = byId(card.dataset.product), match = (filters.family === "all" || p.family === filters.family) && (filters.size === "all" || p.size === Number(filters.size)) && (filters.material === "all" || p.case === filters.material) && (!filters.query || `${p.name} ${p.code}`.toLowerCase().includes(filters.query)) && (!savedOnly || saved.has(p.id));
      card.hidden = !match;
      if (match) count++;
    });
    document.querySelectorAll(".collection-group").forEach((group) => {
      group.hidden = ![...group.querySelectorAll(".watch-card")].some((card) => !card.hidden);
    });
    document.querySelector("#filter-status").textContent = `${count} concept watch${count === 1 ? "" : "es"} ${savedOnly ? "saved in this session" : "in the collection"}.`;
  }
  document.querySelector("#family-filter").addEventListener("change", (event) => {
    filters.family = event.target.value;
    filterCollection();
  });
  document.querySelectorAll("[data-size-filter]").forEach((button) => button.addEventListener("click", () => {
    filters.size = button.dataset.sizeFilter;
    document.querySelectorAll("[data-size-filter]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    filterCollection();
  }));
  document.querySelectorAll("[data-material-filter]").forEach((button) => button.addEventListener("click", () => {
    filters.material = button.dataset.materialFilter;
    document.querySelectorAll("[data-material-filter]").forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
    filterCollection();
  }));
  document.querySelector("#collection-search").addEventListener("input", (event) => {
    filters.query = event.target.value.toLowerCase().trim();
    filterCollection();
  });
  document.querySelector("#reset-filters").addEventListener("click", () => {
    Object.assign(filters, { family: "all", size: "all", material: "all", query: "" });
    savedOnly = false;
    document.querySelector("#family-filter").value = "all";
    document.querySelector("#collection-search").value = "";
    document.querySelectorAll("[data-size-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.sizeFilter === "all")));
    document.querySelectorAll("[data-material-filter]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.materialFilter === "all")));
    filterCollection();
  });
  function addToBag(id) {
    if (!bag.has(id)) bag.set(id, { size: "M \xB7 17\u201320 cm" });
    document.querySelector("#bag-count").textContent = String(bag.size);
  }
  document.querySelector("#buy-now").addEventListener("click", () => {
    addToBag(detailId);
    navigate("cart");
  });
  document.querySelector("#bag-toggle").addEventListener("click", () => navigate("cart"));
  document.querySelector("#sample-bag").addEventListener("click", () => {
    bag.clear();
    addToBag("opus-orange");
    addToBag("opus-ice");
    renderBag();
  });
  function renderBag() {
    const items = document.querySelector("#cart-items");
    items.replaceChildren();
    let gross = 0;
    bag.forEach((choice, id) => {
      const p = byId(id);
      gross += price(p);
      const article = document.createElement("article");
      article.className = "cart-item";
      const visual2 = document.createElement("div");
      visual2.className = "cart-item__visual";
      visual2.append(copyWatch(id, "bag"));
      const title = document.createElement("p");
      title.textContent = `${p.code}
${p.name}`;
      visual2.append(title);
      article.append(visual2);
      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "remove-item";
      remove.textContent = "\xD7";
      remove.setAttribute("aria-label", `Remove ${p.name}`);
      remove.addEventListener("click", () => {
        bag.delete(id);
        renderBag();
      });
      article.append(remove);
      const options = document.createElement("div");
      options.className = "cart-item__options";
      options.innerHTML = "<div><span>Strap</span><p>Textured leather concept</p></div><div><span>Clasp/buckle</span><p>Folding clasp concept</p></div>";
      const label = document.createElement("label");
      label.textContent = "Strap size";
      const select = document.createElement("select");
      select.setAttribute("aria-label", `Strap size for ${p.name}`);
      ["S \xB7 15\u201317 cm", "M \xB7 17\u201320 cm", "L \xB7 19.5\u201323 cm"].forEach((value) => {
        const option = document.createElement("option");
        option.textContent = value;
        option.value = value;
        option.selected = value === choice.size;
        select.append(option);
      });
      select.addEventListener("change", () => choice.size = select.value);
      label.append(select);
      options.append(label);
      const amount = document.createElement("strong");
      amount.className = "cart-item__price";
      amount.textContent = money(price(p));
      options.append(amount);
      article.append(options);
      items.append(article);
    });
    if (!bag.size) {
      const empty = document.createElement("p");
      empty.className = "empty-bag";
      empty.textContent = "Your enquiry bag is empty. Choose a watch from the collection.";
      items.append(empty);
      const browse = document.createElement("button");
      browse.type = "button";
      browse.className = "button";
      browse.textContent = "Explore watches";
      browse.addEventListener("click", () => navigate("collection"));
      items.append(browse);
    }
    document.querySelector("#gross-total").textContent = money(gross);
    document.querySelector("#net-total").textContent = money(gross / 1.19);
    document.querySelector("#vat-total").textContent = money(gross - gross / 1.19);
    document.querySelector("#checkout").disabled = bag.size === 0;
    document.querySelector("#bag-count").textContent = String(bag.size);
  }
  document.querySelector("#currency").addEventListener("change", (event) => {
    currency = event.target.value;
    detailCopy();
    if (view === "cart") renderBag();
  });
  const dialog = document.querySelector(".info-dialog");
  function showInfo(title, text) {
    opener = document.activeElement;
    document.querySelector("#dialog-title").textContent = title;
    const body = document.querySelector("#dialog-body");
    body.replaceChildren();
    const paragraph = document.createElement("p");
    paragraph.textContent = text;
    body.append(paragraph);
    if (typeof dialog.showModal === "function") dialog.showModal();
    else navigate("home", "contact");
  }
  document.querySelector("#session-info").addEventListener("click", () => showInfo("Your showcase session", "Saved watches and the enquiry bag stay in memory only while this page is open. There is no account, tracking, live inventory or payment service. All prices, editions, specifications and tax calculations are illustrative."));
  document.querySelector("#checkout").addEventListener("click", () => {
    const lines = [...bag].map(([id, choice]) => `${byId(id).name} \xB7 ${choice.size} \xB7 ${money(price(byId(id)))}`);
    showInfo("Request a consultation", `Your concept selection:
${lines.join("\n")}
No order or payment is submitted. Replace the demo email before using this enquiry.`);
    const link = document.createElement("a");
    link.className = "button";
    link.textContent = "Prepare an enquiry email \u2197";
    link.href = `mailto:hello@chronoform.example?subject=${encodeURIComponent("Chronoform concept enquiry")}&body=${encodeURIComponent(lines.join("\n") + (document.querySelector("#care-option").checked ? "\nPlease include a care note." : ""))}`;
    document.querySelector("#dialog-body").append(link);
  });
  document.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("close", () => opener?.focus());
  let scrollFrame = 0;
  function updateScroll() {
    scrollFrame = 0;
    if (!motion || view !== "home") return;
    const story = document.querySelector(".craft-story"), box = story.getBoundingClientRect();
    const p = clamp(-box.top / Math.max(1, story.offsetHeight - innerHeight));
    document.querySelector(".craft-story__watch").style.transform = `translateY(${-42 * p}px) rotate(${16 * p}deg) scale(${1 + 0.08 * p})`;
  }
  function scheduleScroll() {
    if (!scrollFrame) scrollFrame = requestAnimationFrame(updateScroll);
  }
  addEventListener("scroll", scheduleScroll, { passive: true });
  addEventListener("resize", () => {
    closeMenu();
    renderer?.resize();
    scheduleScroll();
  });
  const reveals = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.08 });
    reveals.forEach((el) => observer.observe(el));
  } else reveals.forEach((el) => el.classList.add("is-visible"));
  document.querySelector(".motion-toggle").addEventListener("click", (event) => {
    motion = !motion;
    document.body.classList.toggle("motion-paused", !motion);
    event.currentTarget.textContent = motion ? "Pause motion" : "Resume motion";
    event.currentTarget.setAttribute("aria-pressed", String(!motion));
    if (!motion) {
      stopMovement();
      settle();
      cancelAnimationFrame(loaderFrame);
      document.querySelector(".route-loader").style.opacity = "0";
      reveals.forEach((el) => el.classList.add("is-visible"));
      document.querySelector(".craft-story__watch").style.transform = "none";
    } else scheduleScroll();
  });
  document.body.classList.add("js");
  const initial = location.hash.slice(1);
  setView(["collection", "detail", "cart"].includes(initial) ? initial : "home", false, ["service", "contact"].includes(initial) ? initial : null);
})();
