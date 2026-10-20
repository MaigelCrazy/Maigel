/* =========================================================
   MAIGEL — datos globales y elementos compartidos
   Aquí se cambian UNA SOLA VEZ: el email, el Instagram, la web y el menú.
   Se actualizan solos en todas las páginas (menú, pie de página, contacto).
   ========================================================= */
(function () {

  /* ✏️ EDITA AQUÍ ---------------------------------------- */
  var SITE = {
    nombre:    "Maigel",
    anio:      "2026",
    email:     "miguelgonzalezalvarez2004@gmail.com",   // ← pon tu email real
    instagram: "@maigel",            // ← pon tu usuario real

    /* Menú: [texto visible, página a la que lleva] */
    menu: [
      ["GALLERY",  "gallery.html"],
      ["ABOUT",    "about.html"],
      ["CONTACT",  "contact.html"],
    ]
  };
  /* ------------------------------------------------------ */

  /* Qué opción del menú se subraya en cada página */
  var ACTIVA = {
    gallery: "gallery.html", actual: "gallery.html",
    shop: "shop.html", archive: "archive.html",
    about: "about.html", contact: "contact.html"
  };

  function rellenarDatos(raiz) {
    var nodos = (raiz || document).querySelectorAll("[data-site]");
    for (var i = 0; i < nodos.length; i++) {
      var clave = nodos[i].getAttribute("data-site");
      if (SITE[clave] === undefined) continue;
      nodos[i].textContent = SITE[clave];
      if (clave === "email" && nodos[i].tagName === "A") {
        nodos[i].setAttribute("href", "mailto:" + SITE.email);
      }
    }
  }

  function pintarMenuYPie(pagina) {
    var nav = document.getElementById("site-nav");
    var pie = document.getElementById("site-footer");
    var destino = ACTIVA[pagina] || "";

    if (nav) {
      var items = "";
      for (var i = 0; i < SITE.menu.length; i++) {
        var txt = SITE.menu[i][0];
        var url = SITE.menu[i][1];
        var actual = (url === destino && txt !== "(0)") ? ' aria-current="page"' : "";
        items += '<li><a href="' + url + '"' + actual + ">" + txt + "</a></li>";
      }
      nav.innerHTML =
        '<div class="container nav-inner">' +
          '<a href="index.html" class="logo">' + SITE.nombre + "</a>" +
          '<nav aria-label="Principal"><ul class="menu">' + items + "</ul></nav>" +
        "</div>";
    }

    if (pie) {
      pie.innerHTML =
        '<div class="container footer-inner">' +
          "<span>MAIGEL © " + SITE.anio + "</span>" +
          "<span>Instagram: " + SITE.instagram + "</span>" +
          "<span>Contacto: " + SITE.email + "</span>" +
        "</div>";
    }
    rellenarDatos(document);
  }

  window.SITE = SITE;
  window.pintarMenuYPie = pintarMenuYPie;
  window.rellenarDatos = rellenarDatos;

  /* En la web normal se ejecuta solo. En la vista previa de Claude lo llama el enrutador. */
  if (!window.__VISTA_PREVIA__) {
    pintarMenuYPie(document.body.getAttribute("data-page") || "");
  }
})();
