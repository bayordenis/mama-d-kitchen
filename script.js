// =========================================================
// Mama D Kitchen — interactions
// =========================================================
document.addEventListener("DOMContentLoaded", () => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------- Free plugins ----------
  // AOS: gentle fade/zoom as sections scroll into view
  if (window.AOS) {
    AOS.init({ duration: 700, once: true, offset: 60, disable: reduceMotion });
  }
  // GLightbox: full-screen photo viewer for the gallery
  if (window.GLightbox) {
    GLightbox({ selector: ".glightbox", touchNavigation: true, loop: true });
  }

  // ---------- Footer year ----------
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ---------- Mobile menu ----------
  const toggle = document.querySelector(".nav-toggle");
  const menu = document.getElementById("nav-menu");
  const setMenu = (open) => {
    menu.classList.toggle("open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  };
  toggle.addEventListener("click", () => setMenu(!menu.classList.contains("open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("open")) { setMenu(false); toggle.focus(); }
  });

  // ---------- Highlight current section in the nav ----------
  const links = [...menu.querySelectorAll('a[href^="#"]')];
  if ("IntersectionObserver" in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((a) => a.classList.toggle("active", a.getAttribute("href") === `#${entry.target.id}`));
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    document.querySelectorAll("main section[id]").forEach((s) => io.observe(s));
  }

  // ---------- Menu filter ----------
  const chips = document.querySelectorAll(".chip");
  const dishes = document.querySelectorAll(".dish");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const f = chip.dataset.filter;
      chips.forEach((c) => {
        const on = c === chip;
        c.classList.toggle("is-active", on);
        c.setAttribute("aria-pressed", String(on));
      });
      dishes.forEach((d) => { d.hidden = !(f === "all" || d.dataset.cat === f); });
      if (window.AOS) AOS.refresh();
    });
  });

  // ---------- Reservation form ----------
  const form = document.getElementById("reserve-form");
  const status = form.querySelector(".form-status");
  const dateInput = document.getElementById("r-date");
  const pad = (n) => String(n).padStart(2, "0");
  const now = new Date();
  dateInput.min = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;

  // The WhatsApp number from the "Order" button, reused for booking requests
  const waLink = document.querySelector(".wa-float").getAttribute("href");
  const waNumber = (waLink.match(/wa\.me\/(\d+)/) || [])[1] || "";
  const formspreeReady = !form.action.includes("YOUR_FORM_ID");

  const say = (msg, type = "") => { status.textContent = msg; status.className = `form-status ${type}`; };

  const validate = () => {
    let ok = true;
    form.querySelectorAll("[required]").forEach((field) => {
      const good = field.value.trim() !== "" && field.checkValidity();
      field.classList.toggle("invalid", !good);
      field.setAttribute("aria-invalid", String(!good));
      if (!good) ok = false;
    });
    return ok;
  };

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    if (!validate()) {
      say("Please add your name, phone, a date and a time between 8 am and 9 pm.", "err");
      form.querySelector(".invalid").focus();
      return;
    }
    const d = new FormData(form);

    // No Formspree yet → send the booking through WhatsApp instead
    if (!formspreeReady) {
      const text =
        `Hello Mama D Kitchen, I'd like to book a table.\n` +
        `Name: ${d.get("name")}\nPhone: ${d.get("phone")}\n` +
        `Date: ${d.get("date")} at ${d.get("time")}\nGuests: ${d.get("guests")}` +
        (d.get("note") ? `\nNote: ${d.get("note")}` : "");
      window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, "_blank", "noopener");
      say("Opening WhatsApp with your booking details…", "ok");
      return;
    }

    const btn = form.querySelector("button[type=submit]");
    btn.disabled = true;
    say("Sending…");
    try {
      const res = await fetch(form.action, { method: "POST", body: d, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(res.status);
      form.reset();
      say("Thank you! We've received your booking request and will confirm on WhatsApp shortly.", "ok");
    } catch {
      say("We couldn't send that. Please call or WhatsApp us to book.", "err");
    } finally {
      btn.disabled = false;
    }
  });

  form.querySelectorAll("input, textarea, select").forEach((f) =>
    f.addEventListener("input", () => { f.classList.remove("invalid"); f.removeAttribute("aria-invalid"); })
  );
});
