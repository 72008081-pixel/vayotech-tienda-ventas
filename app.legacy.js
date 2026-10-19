"use strict";

const WHATSAPP = "51933685462";

// CATÁLOGO Y STOCK OFICIAL VAYOTECH CUSCO
// Sincronizado con inventario físico (20 unidades en stock) y publicaciones de modelos KZ
const PRODUCTS = [
  // ==========================================
  // PRODUCTOS EN STOCK PARA VENTA INMEDIATA (20 UNIDADES)
  // ==========================================
  {
    id: "edx-pro",
    name: "KZ EDX Pro",
    category: "audifonos",
    categoryLabel: "Audífonos In-Ear HiFi",
    price: 39,
    stock: 5,
    image: "images/kz_edx_pro.jpg",
    altImage: "images/kz_edx_pro_alt.jpg",
    badge: "Destacado · 5 disponibles",
    description: "Sonido potente y definido con driver magnético dual de 10mm. Graves contundentes, agudos cristalinos y cable desmontable con micrófono HD para gaming y música.",
    features: [
      "Driver dinámico dual de 10mm de alto rendimiento",
      "Cable desmontable trenzado Pin C con micrófono HD",
      "Aislamiento de ruido pasivo de hasta 26dB",
      "Ideal para gaming (Free Fire, Warzone, Dota 2) y música diaria"
    ],
    status: "stock"
  },
  {
    id: "edx-pro-x",
    name: "KZ EDX Pro X",
    category: "audifonos",
    categoryLabel: "Audífonos In-Ear HiFi",
    price: 45,
    stock: 1,
    image: "images/kz_edx_pro_x.jpg",
    altImage: "images/kz_edx_pro_x_alt.jpg",
    badge: "¡Última unidad!",
    description: "La evolución del legendario EDX Pro con cámara acústica optimizada, respuesta de agudos más detallada y diafragma acústico superlineal.",
    features: [
      "Driver dinámico superlineal de nueva generación",
      "Cámara acústica optimizada para mayor claridad",
      "Cable libre de oxígeno desmontable con micrófono",
      "Diseño ergonómico ultraligero y muy cómodo"
    ],
    status: "stock"
  },
  {
    id: "edx-lite",
    name: "KZ EDX Lite",
    category: "audifonos",
    categoryLabel: "Audífonos In-Ear HiFi",
    price: 27,
    stock: 2,
    image: "images/kz_edx_lite.jpg",
    altImage: "images/kz_edx_lite_alt.jpg",
    badge: "2 disponibles",
    description: "Rendimiento acústico puro a un precio imbatible. Sonido equilibrado y natural, perfecto para clases, oficina, estudio y viajes diarios.",
    features: [
      "Driver dinámico de alta fidelidad sin distorsión",
      "Estructura liviana y confortable para horas de uso",
      "Cable desmontable Pin C con micrófono para llamadas",
      "Excelente definición en voces e instrumentos"
    ],
    status: "stock"
  },
  {
    id: "pisces",
    name: "KZ Pisces 2DD Type-C",
    category: "audifonos",
    categoryLabel: "Audífonos In-Ear Type-C",
    price: 65,
    stock: 1,
    image: "images/kz_pisces.jpg",
    altImage: "images/kz_pisces_alt.jpg",
    badge: "¡Última unidad!",
    description: "Doble driver dinámico en configuración coaxial con conector Type-C nativo y chip DAC digital integrado. Conéctalo directo a tu celular sin adaptadores.",
    features: [
      "Conector USB Type-C directo con chip DAC integrado",
      "Configuración dual driver dinámico (2DD)",
      "Sonido inmersivo con bajo profundo y sub-graves limpios",
      "Micrófono HD y botones de control multimedia"
    ],
    status: "stock"
  },
  {
    id: "cable-silver",
    name: "Cable KZ Silver Type-C",
    category: "cables",
    categoryLabel: "Cables & Repuestos",
    price: 30,
    stock: 3,
    image: "images/kz_cable_silver.jpg",
    altImage: "images/kz_cable_silver_alt.jpg",
    badge: "3 disponibles",
    description: "Cable plateado de alta pureza con conexión Type-C directa para celulares modernos sin jack de 3.5mm. Conectores Pin C compatibles con la mayoría de modelos KZ.",
    features: [
      "Conector directo Type-C digital sin adaptadores",
      "Conectores Pin C (0.75mm/0.78mm) para audífonos KZ",
      "Trenzado bañado en plata de baja impedancia acústica",
      "Micrófono integrado para llamadas y llamadas de voz"
    ],
    status: "stock"
  },
  {
    id: "adaptador",
    name: "Cable Adaptador Jack 3.5 mm a Type-C",
    category: "accesorios",
    categoryLabel: "Adaptadores & DAC",
    price: 10,
    stock: 5,
    image: "images/kz_adaptador.jpg",
    altImage: "images/kz_adaptador_alt.jpg",
    badge: "5 disponibles",
    description: "Adaptador conversor de Jack hembra 3.5 mm a conector macho Type-C. Permite conectar cualquier audífono convencional a celulares, laptops y tablets modernas.",
    features: [
      "Entrada Jack hembra 3.5 mm universal",
      "Salida USB Type-C compatible con Android, iOS y PC",
      "Chip decodificador para transmisión de sonido limpia",
      "Cable trenzado reforzado y conectores compactos"
    ],
    status: "stock"
  },
  {
    id: "estuche",
    name: "KZ Estuche Rígido para Audífonos",
    category: "accesorios",
    categoryLabel: "Estuches & Protección",
    price: 12,
    stock: 3,
    image: "images/kz_estuche.jpg",
    altImage: "images/kz_estuche_alt.jpg",
    badge: "3 disponibles",
    description: "Funda rígida de material EVA de alta resistencia con cierre de cremallera y bolsillo interior de malla. Protege tus audífonos de golpes, caídas y suciedad.",
    features: [
      "Material EVA rígido anti-impacto y resistente al agua",
      "Bolsillo interno de malla para cables y adaptadores",
      "Cierre de cremallera suave de alta durabilidad",
      "Formato compacto ideal para llevar en el bolsillo o mochila"
    ],
    status: "stock"
  },

  // ==========================================
  // CATÁLOGO COMPLETO KZ (DISPONIBLES POR ENCARGO / RESERVA)
  // ==========================================
  {
    id: "castor",
    name: "KZ Castor (Harman Target / Bass Edition)",
    category: "audifonos",
    categoryLabel: "Audífonos In-Ear HiFi",
    price: 65,
    stock: 0,
    image: "images/kz_castor.jpg",
    altImage: "images/kz_castor_alt.jpg",
    badge: "Catálogo / Por encargo",
    description: "Diseño acústico innovador con doble driver dinámico y 4 micro-switches físicos de ecualización para personalizar bajos, medios y agudos a tu gusto.",
    features: [
      "Doble driver dinámico apilado (10mm + 8mm)",
      "4 interruptores de ajuste acústico (16 perfiles sonoros)",
      "Curva de afinación Harman Target de alta fidelidad",
      "Cuerpo ergonómico de resina con placa de aleación"
    ],
    status: "catalog"
  },
  {
    id: "castor-pro",
    name: "KZ Castor Pro (Bass Edition)",
    category: "audifonos",
    categoryLabel: "Audífonos In-Ear HiFi",
    price: 85,
    stock: 0,
    image: "images/kz_castor_pro.jpg",
    altImage: "images/kz_castor_pro_alt.jpg",
    badge: "Catálogo / Por encargo",
    description: "La versión Pro del aclamado Castor, con diafragmas bio-celulosa de 2da generación y respuesta de frecuencia extendida para audiófilos exigentes.",
    features: [
      "Drivers duales de 2da generación de ultra resolución",
      "Switches físicos de afinación acústica en placa frontal",
      "Separación instrumental superior y microdetalles audiófilos",
      "Cable desmontable bañado en plata Pin C"
    ],
    status: "catalog"
  },
  {
    id: "vader",
    name: "KZ Vader Flagship (3DD)",
    category: "audifonos",
    categoryLabel: "Audífonos In-Ear HiFi",
    price: 90,
    stock: 0,
    image: "images/kz_vader.jpg",
    altImage: "images/kz_vader_alt.jpg",
    badge: "Catálogo / Por encargo",
    description: "Tope de línea con triple driver dinámico de 8mm independientes para graves demoledores, medios transparentes y agudos ultra precisos.",
    features: [
      "Configuración triple driver dinámico (3DD independientes)",
      "Interruptores de afinación acústica profesional",
      "Placa frontal metálica mecanizada en CNC",
      "Escena sonora amplia y espacial de nivel profesional"
    ],
    status: "catalog"
  },
  {
    id: "zsn-pro-2",
    name: "KZ ZSN Pro 2",
    category: "audifonos",
    categoryLabel: "Audífonos In-Ear HiFi",
    price: 75,
    stock: 0,
    image: "images/kz_zsn_pro_2.jpg",
    altImage: "images/kz_zsn_pro_2_alt.jpg",
    badge: "Catálogo / Por encargo",
    description: "Arquitectura híbrida clásica KZ (1 Driver Dinámico + 1 Armadura Balanceada 30095) refinada para un sonido más detallado, cálido y musical.",
    features: [
      "Configuración híbrida 1BA + 1DD de precisión",
      "Armadura balanceada 30095 de respuesta ultra rápida",
      "Placa frontal de aleación de zinc de lujo",
      "Cable trenzado desmontable Pin C con micrófono"
    ],
    status: "catalog"
  },
  {
    id: "duonic",
    name: "KZ Duonic",
    category: "audifonos",
    categoryLabel: "Audífonos In-Ear HiFi",
    price: 110,
    stock: 0,
    image: "images/kz_duonic.jpg",
    altImage: "images/kz_duonic_alt.jpg",
    badge: "Catálogo / Por encargo",
    description: "Monitor intraaural de alta gama diseñado para músicos, productores y audiófilos, con resolución sonora de estudio y máxima dinámica.",
    features: [
      "Drivers duales balanceados de precisión quirúrgica",
      "Crossover pasivo electrónico de 2 vías",
      "Chasis ergonómico de aleación aeroespacial",
      "Cable audiófilo trenzado de cobre de alta pureza"
    ],
    status: "catalog"
  },
  {
    id: "az09",
    name: "KZ AZ09 Bluetooth 5.2 TWS",
    category: "tws",
    categoryLabel: "Módulos Bluetooth TWS",
    price: 89,
    stock: 0,
    image: "images/kz_az09.jpg",
    altImage: "images/kz_az09_alt.jpg",
    badge: "Catálogo / Por encargo",
    description: "Convierte tus audífonos KZ con conector Pin C en auriculares True Wireless sin cables. Gancho ergonómico que no se cae ni al entrenar.",
    features: [
      "Bluetooth 5.2 con modo juego de ultra baja latencia",
      "Compatible con todos los modelos KZ Pin C",
      "Hasta 6 horas continuas por carga + estuche portátil",
      "Micrófonos HD con reducción de ruido ambiental"
    ],
    status: "catalog"
  },
  {
    id: "az10",
    name: "KZ AZ10 Bluetooth Hi-Fi TWS",
    category: "tws",
    categoryLabel: "Módulos Bluetooth TWS",
    price: 99,
    stock: 0,
    image: "images/kz_az10.jpg",
    altImage: "images/kz_az10.jpg",
    badge: "Catálogo / Por encargo",
    description: "Módulos inalámbricos TWS de alto rendimiento con 3 modos de audio (Modo Música Hi-Fi, Modo Gaming y Modo Espacial). Transmisión AAC/SBC estable.",
    features: [
      "Chip Bluetooth de alta definición con 3 modos de sonido",
      "Modo espacial 3D para una experiencia inmersiva",
      "Estuche de carga con batería de gran autonomía",
      "Ganchos anatómicos de silicona suave hipoalergénica"
    ],
    status: "catalog"
  },
  {
    id: "gale",
    name: "KZ Gale Metal Edition",
    category: "audifonos",
    categoryLabel: "Audífonos In-Ear HiFi",
    price: 50,
    stock: 0,
    image: "images/kz_gale.jpg",
    altImage: "images/kz_gale_alt.jpg",
    badge: "Catálogo / Por encargo",
    description: "Sonido equilibrado y natural con chasis metálico robusto. Excelente posicionamiento espacial para gaming y voces claras en llamadas.",
    features: [
      "Cuerpo de aleación metálica premium y resistente",
      "Driver dinámico de alta resolución acústica",
      "Micrófono omnidireccional HD con botón de control",
      "Almohadillas de silicona acústica aislantes"
    ],
    status: "catalog"
  },
  {
    id: "dqs",
    name: "KZ DQS HiFi Semi-Abierto",
    category: "audifonos",
    categoryLabel: "Audífonos In-Ear HiFi",
    price: 60,
    stock: 0,
    image: "images/kz_dqs.jpg",
    altImage: "images/kz_dqs_alt.jpg",
    badge: "Catálogo / Por encargo",
    description: "Diseño acústico semi-abierto con rejilla posterior que reduce la fatiga auditiva y entrega un escenario sonoro espacioso, ventilado y muy natural.",
    features: [
      "Cámara acústica semi-abierta con rejilla metálica",
      "Driver magnético de respuesta de frecuencia amplia",
      "Graves controlados y definidos sin retumbos",
      "Cable desmontable trenzado Pin C"
    ],
    status: "catalog"
  },
  {
    id: "edx-pro-2",
    name: "KZ EDX Pro 2",
    category: "audifonos",
    categoryLabel: "Audífonos In-Ear HiFi",
    price: 55,
    stock: 0,
    image: "images/kz_edx_pro_2.jpg",
    altImage: "images/kz_edx_pro_2_alt.jpg",
    badge: "Catálogo / Por encargo",
    description: "Segunda generación del clásico EDX Pro, con circuitos magnéticos duales mejorados y un acabado estético aún más elegante y ergonómico.",
    features: [
      "Circuito magnético dual de 2da generación",
      "Diseño frontal de resina de alta densidad y aleación",
      "Sonido enérgico ideal para EDM, Trap, Rock y Pop",
      "Micrófono con control multimedia integrado"
    ],
    status: "catalog"
  },
  {
    id: "cable-cobre",
    name: "Cable KZ de Cobre OFC",
    category: "cables",
    categoryLabel: "Cables & Repuestos",
    price: 15,
    stock: 0,
    image: "images/kz_cable_cobre.jpg",
    altImage: "images/kz_cable_cobre_alt.jpg",
    badge: "Catálogo / Por encargo",
    description: "Cable original de repuesto trenzado con hilos de cobre libre de oxígeno (OFC). Conectores Pin C y Jack estándar de 3.5mm chapado en oro.",
    features: [
      "Hilos de cobre OFC de alta pureza y baja distorsión",
      "Conector Jack 3.5 mm estándar bañado en oro",
      "Conectores Pin C (0.75mm/0.78mm)",
      "Micrófono HD integrado para llamadas"
    ],
    status: "catalog"
  },
  {
    id: "cable-m2",
    name: "Cable KZ M2 Type-C / Jack DSP",
    category: "cables",
    categoryLabel: "Cables & Repuestos",
    price: 49,
    stock: 0,
    image: "images/kz_cable_m2.jpg",
    altImage: "images/kz_cable_m2_alt.jpg",
    badge: "Catálogo / Por encargo",
    description: "Cable audiófilo avanzado con procesador de señal digital (DSP) integrado en el conector. Ajusta la curva de ecualización y maximiza la fidelidad.",
    features: [
      "Procesador DSP de alta resolución acústica integrado",
      "Conexión directa Type-C para audio sin pérdidas",
      "Afinación de sonido optimizada de fábrica",
      "Trenzado reforzado de grado profesional"
    ],
    status: "catalog"
  },
  {
    id: "zs10-pro-x",
    name: "KZ ZS10 Pro X",
    category: "audifonos",
    categoryLabel: "Audífonos In-Ear HiFi",
    price: 110,
    stock: 0,
    image: "images/kz_zs10_pro_x.jpg",
    altImage: "images/kz_zs10_pro_x.jpg",
    badge: "Catálogo / Por encargo",
    description: "Monitores profesionales de 5 drivers por lado (4 Armaduras Balanceadas + 1 Driver Dinámico de 10mm). Separación instrumental asombrosa.",
    features: [
      "5 drivers por lado (10 drivers en total en el par)",
      "4 Armaduras balanceadas de alta frecuencia",
      "Driver dinámico de graves profundos de 10mm",
      "Placa de aleación y resina acústica de alta gama"
    ],
    status: "catalog"
  },
  {
    id: "zar",
    name: "KZ ZAR Flagship (8 Drivers)",
    category: "audifonos",
    categoryLabel: "Audífonos In-Ear HiFi",
    price: 209,
    stock: 0,
    image: "images/kz_zar.jpg",
    altImage: "images/kz_zar.jpg",
    badge: "Catálogo / Por encargo",
    description: "El buque insignia de KZ con 8 drivers por lado (7 Armaduras Balanceadas + 1 Driver Dinámico). Máxima fidelidad y precisión audiófila absoluta.",
    features: [
      "8 drivers por lado (16 drivers en total en el par)",
      "7 Armaduras balanceadas de ultra precisión",
      "Circuito de crossover de 3 vías de grado audiófilo",
      "Cable bañado en plata de 8 núcleos de alto rendimiento"
    ],
    status: "catalog"
  }
];

// Helper functions
const $ = selector => document.querySelector(selector);
const $$ = selector => document.querySelectorAll(selector);
const money = num => "S/ " + Number(num).toFixed(2);

// Cart handling with localStorage
function readCart() {
  try {
    const raw = JSON.parse(localStorage.getItem("vayotech-cart-v4") || "{}");
    return Object.fromEntries(
      Object.entries(raw).filter(([id, q]) => {
        const p = PRODUCTS.find(x => x.id === id);
        return p && p.stock > 0 && Number.isInteger(q) && q > 0;
      }).map(([id, q]) => {
        const p = PRODUCTS.find(x => x.id === id);
        return [id, Math.min(q, p.stock)];
      })
    );
  } catch (e) {
    return {};
  }
}

let cart = readCart();
let activeTab = "stock"; // "stock", "catalog", "all"
let activeCategory = "all"; // "all", "audifonos", "tws", "cables", "accesorios"
let toastTimer = null;
let previousFocus = null;

function saveCart() {
  localStorage.setItem("vayotech-cart-v4", JSON.stringify(cart));
}

function notify(message) {
  const toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 3000);
}

function getBadgeHtml(product) {
  if (product.stock > 0) {
    if (product.stock === 1) {
      return `<span class="badge badge-urgent">⚡ ¡Última unidad en stock!</span>`;
    }
    return `<span class="badge badge-stock">🟢 ${product.stock} disponibles en stock</span>`;
  }
  return `<span class="badge badge-catalog">📋 Catálogo / Por encargo</span>`;
}

// Generate HTML for a product card
function createProductCard(p) {
  const inStock = p.stock > 0;
  return `
    <article class="product-card ${inStock ? 'is-in-stock' : 'is-catalog'}" data-id="${p.id}">
      <div class="photo" data-detail="${p.id}" role="button" tabindex="0" aria-label="Ver detalles de ${p.name}">
        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='images/kz_edx_pro.jpg'">
        ${getBadgeHtml(p)}
        ${p.altImage && p.altImage !== p.image ? `<span class="photo-hint" title="Tiene vista adicional">📸 2 fotos</span>` : ''}
      </div>
      <div class="card-content">
        <div class="card-meta">
          <span class="card-category">${p.categoryLabel}</span>
          ${inStock ? `<span class="stock-indicator in-stock">⚡ Entrega Inmediata</span>` : `<span class="stock-indicator on-demand">📦 A Pedido</span>`}
        </div>
        <h3 class="product-title" data-detail="${p.id}">${p.name}</h3>
        <p class="product-desc">${p.description}</p>
        
        <div class="card-bottom">
          <div class="price-box">
            <span class="price-label">Precio oficial:</span>
            <strong class="price">${money(p.price)}</strong>
          </div>
          <div class="stock-status-box">
            ${inStock 
              ? `<span class="stock-count-text"><b>${p.stock}</b> en Cusco</span>`
              : `<span class="catalog-order-text">Disponible a pedido</span>`
            }
          </div>
        </div>
        
        <div class="card-actions">
          ${inStock 
            ? `<button class="add-button" type="button" data-add="${p.id}">
                 <svg viewBox="0 0 24 24" aria-hidden="true" class="btn-icon"><path d="M3 4h2l2.3 11h11.2l2-8H6M9 20h.01M18 20h.01"/></svg>
                 Añadir al carrito
               </button>`
            : `<a class="consult-button" href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hola VayoTech Cusco, quisiera consultar para pedir el modelo ' + p.name + ' (S/ ' + p.price.toFixed(2) + '). ¿Cuándo llega y cómo coordinamos?')}" target="_blank" rel="noopener">
                 <span>Pedir por WhatsApp</span>
                 <svg viewBox="0 0 24 24" aria-hidden="true" class="btn-icon"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
               </a>`
          }
          <button class="detail-button" type="button" data-detail="${p.id}" title="Ver especificaciones completas">
            Detalles
          </button>
        </div>
      </div>
    </article>
  `;
}

// Filter and render products
function renderProducts() {
  const searchInput = $("#search");
  const sortSelect = $("#sort");
  const grid = $("#productGrid");
  const countBadge = $("#resultCount");

  const query = searchInput ? searchInput.value.trim().toLocaleLowerCase("es") : "";
  const sort = sortSelect ? sortSelect.value : "featured";

  let items = PRODUCTS.filter(p => {
    // Tab filter
    if (activeTab === "stock" && p.stock <= 0) return false;
    if (activeTab === "catalog" && p.stock > 0 && false) return true; // keep both in catalog if wanted

    // Category filter
    if (activeCategory !== "all" && p.category !== activeCategory) return false;

    // Search query filter
    if (query) {
      const matchText = (p.name + " " + p.categoryLabel + " " + p.description + " " + p.features.join(" ")).toLocaleLowerCase("es");
      if (!matchText.includes(query)) return false;
    }

    return true;
  });

  // Sort logic
  if (sort === "low") {
    items.sort((a, b) => a.price - b.price);
  } else if (sort === "high") {
    items.sort((a, b) => b.price - a.price);
  } else if (sort === "stock") {
    items.sort((a, b) => b.stock - a.stock);
  } else {
    // Featured: In-stock first, then by popularity
    items.sort((a, b) => {
      if (a.stock > 0 && b.stock <= 0) return -1;
      if (a.stock <= 0 && b.stock > 0) return 1;
      return 0;
    });
  }

  // Update counts
  if (countBadge) {
    let contextName = activeTab === "stock" ? "en stock inmediato" : (activeTab === "catalog" ? "del catálogo completo" : "en total");
    countBadge.textContent = `Mostrando ${items.length} productos ${contextName}`;
  }

  // Render grid
  if (grid) {
    if (items.length === 0) {
      grid.innerHTML = `
        <div class="empty-results">
          <div class="empty-icon">🔍</div>
          <h3>No encontramos productos que coincidan</h3>
          <p>Prueba buscando con otro término o cambiando los filtros seleccionados.</p>
          <button class="button subtle" type="button" id="resetFiltersBtn">Restablecer filtros</button>
        </div>
      `;
      const resetBtn = $("#resetFiltersBtn");
      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          if (searchInput) searchInput.value = "";
          activeCategory = "all";
          updateCategoryButtons();
          renderProducts();
        });
      }
    } else {
      grid.innerHTML = items.map(createProductCard).join("");
    }
  }

  // Update tab badge counts
  const stockCount = PRODUCTS.filter(p => p.stock > 0).length;
  const stockTotalUnits = PRODUCTS.reduce((sum, p) => sum + p.stock, 0);
  const catalogCount = PRODUCTS.length;

  const stockBadgeEl = $("#tabStockBadge");
  if (stockBadgeEl) stockBadgeEl.textContent = `${stockTotalUnits} unids (${stockCount} modelos)`;

  const catalogBadgeEl = $("#tabCatalogBadge");
  if (catalogBadgeEl) catalogBadgeEl.textContent = `${catalogCount} modelos`;
}

function updateCategoryButtons() {
  $$(".filter").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.filter === activeCategory);
  });
}

function updateTabButtons() {
  $$(".view-tab").forEach(tab => {
    const isCurrent = tab.dataset.tab === activeTab;
    tab.classList.toggle("active", isCurrent);
    tab.setAttribute("aria-selected", isCurrent ? "true" : "false");
  });

  const sectionHeadH2 = $("#shopSectionTitle");
  const sectionHeadDesc = $("#shopSectionDesc");
  if (sectionHeadH2 && sectionHeadDesc) {
    if (activeTab === "stock") {
      sectionHeadH2.innerHTML = `Stock Disponible para <em>Entrega Inmediata</em>`;
      sectionHeadDesc.textContent = `7 productos con stock físico en Cusco (20 unidades totales). Entrega hoy mismo en Cusco o envíos rápidos a todo el Perú.`;
    } else if (activeTab === "catalog") {
      sectionHeadH2.innerHTML = `Catálogo Completo <em>VayoTech & KZ Audio</em>`;
      sectionHeadDesc.textContent = `21 modelos oficiales KZ. Encuentra tu modelo ideal; si no está en stock para entrega hoy, lo coordinamos bajo reserva con total garantía.`;
    } else {
      sectionHeadH2.innerHTML = `Todos los Modelos y <em>Accesorios KZ</em>`;
      sectionHeadDesc.textContent = `Explora toda la selección de monitores in-ear, módulos inalámbricos Bluetooth y repuestos originales.`;
    }
  }
}

// Render Shopping Cart
function renderCart() {
  const entries = Object.entries(cart).filter(([, q]) => q > 0);
  const totalItemsCount = entries.reduce((n, [, q]) => n + q, 0);

  const cartCountEl = $("#cartCount");
  const drawerCountEl = $("#drawerCount");
  if (cartCountEl) cartCountEl.textContent = totalItemsCount;
  if (drawerCountEl) drawerCountEl.textContent = totalItemsCount;

  const cartItemsContainer = $("#cartItems");
  const checkoutContainer = $("#checkout");
  const subtotalEl = $("#subtotal");

  if (!cartItemsContainer) return;

  if (entries.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <div class="cart-empty-icon">🛒</div>
        <strong>Tu carrito está vacío</strong>
        <p>Revisa los productos con stock disponible y añade tus favoritos para coordinar tu entrega.</p>
        <button class="button subtle" type="button" id="continueShopping">Ver productos en stock</button>
      </div>
    `;
    if (checkoutContainer) checkoutContainer.hidden = true;
    if (subtotalEl) subtotalEl.textContent = money(0);
  } else {
    cartItemsContainer.innerHTML = entries.map(([id, q]) => {
      const p = PRODUCTS.find(x => x.id === id);
      if (!p) return "";
      const lineTotal = money(q * p.price);
      return `
        <div class="cart-row">
          <img src="${p.image}" alt="${p.name}">
          <div class="cart-row-details">
            <strong>${p.name}</strong>
            <small class="cart-row-price">${money(p.price)} c/u · Stock disp: ${p.stock}</small>
            <div class="qty">
              <button type="button" data-qty="${id}" data-delta="-1" aria-label="Restar una unidad">−</button>
              <b>${q}</b>
              <button type="button" data-qty="${id}" data-delta="1" aria-label="Sumar una unidad" ${q >= p.stock ? 'disabled title="Máximo stock alcanzado"' : ''}>+</button>
              <button class="remove" type="button" data-remove="${id}">Quitar</button>
            </div>
          </div>
          <b class="line-total">${lineTotal}</b>
        </div>
      `;
    }).join("");

    const totalMoney = entries.reduce((n, [id, q]) => {
      const p = PRODUCTS.find(x => x.id === id);
      return n + (p ? p.price * q : 0);
    }, 0);

    if (subtotalEl) subtotalEl.textContent = money(totalMoney);
    if (checkoutContainer) checkoutContainer.hidden = false;
  }
}

// Open / Close Drawer
function openCart() {
  previousFocus = document.activeElement;
  const scrim = $("#scrim");
  const drawer = $("#drawer");
  if (scrim) scrim.hidden = false;
  if (drawer) drawer.hidden = false;
  document.body.style.overflow = "hidden";
  const closeBtn = $("#closeCart");
  if (closeBtn) closeBtn.focus();
}

function closeCart() {
  const drawer = $("#drawer");
  const scrim = $("#scrim");
  if (!drawer || drawer.hidden) return;
  drawer.hidden = true;
  if (scrim) scrim.hidden = true;
  document.body.style.overflow = "";
  if (previousFocus) previousFocus.focus();
}

// Product Details Modal
function openDetail(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  previousFocus = document.activeElement;

  const modalContent = $("#modalContent");
  const backdrop = $("#modalBackdrop");
  if (!modalContent || !backdrop) return;

  const inStock = p.stock > 0;
  const hasAltImage = p.altImage && p.altImage !== p.image;

  modalContent.innerHTML = `
    <div class="modal-grid">
      <div class="modal-gallery">
        <div class="modal-main-image-wrap">
          <img id="modalMainImg" src="${p.image}" alt="${p.name}">
        </div>
        ${hasAltImage ? `
          <div class="modal-thumbs">
            <button type="button" class="thumb active" data-img="${p.image}" aria-label="Vista frontal">
              <img src="${p.image}" alt="Vista 1">
            </button>
            <button type="button" class="thumb" data-img="${p.altImage}" aria-label="Vista de detalle / publicación">
              <img src="${p.altImage}" alt="Vista 2">
            </button>
          </div>
        ` : ''}
      </div>

      <div class="modal-copy">
        <div class="modal-category-wrap">
          <span class="card-category">${p.categoryLabel}</span>
          ${getBadgeHtml(p)}
        </div>
        
        <h2>${p.name}</h2>
        <div class="modal-price-box">
          <strong class="price">${money(p.price)}</strong>
          <span class="tax-note">Precio en soles (S/.)</span>
        </div>

        <p class="modal-description">${p.description}</p>

        <div class="modal-features">
          <h4>Características destacadas:</h4>
          <ul>
            ${p.features.map(f => `<li>${f}</li>`).join("")}
          </ul>
        </div>

        <div class="modal-delivery-banner">
          <svg viewBox="0 0 24 24" aria-hidden="true" class="icon-car"><path d="M5 18H3c-.6 0-1-.4-1-1V9c0-.6.4-1 1-1h10c.6 0 1 .4 1 1v8c0 .6-.4 1-1 1h-2M14 9h4.5c.3 0 .6.1.8.4l2.4 2.8c.2.3.3.5.3.8V17c0 .6-.4 1-1 1h-1M6 18a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4z"/></svg>
          <div>
            <strong>Entrega en Cusco y envíos nacionales</strong>
            <small>Coordinamos punto céntrico en Cusco o delivery. Envíos garantizados a todo el Perú por Olva o Shalom.</small>
          </div>
        </div>

        <div class="modal-actions">
          ${inStock ? `
            <button class="button primary modal-add-btn" data-add="${p.id}" type="button">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.3 11h11.2l2-8H6M9 20h.01M18 20h.01"/></svg>
              Añadir al carrito (${p.stock} dispon.)
            </button>
          ` : `
            <a class="button whatsapp modal-whatsapp-btn" href="https://wa.me/${WHATSAPP}?text=${encodeURIComponent('Hola VayoTech, quiero encargar / consultar sobre el modelo ' + p.name + ' (S/ ' + p.price.toFixed(2) + '). ¿Cuál es el tiempo de entrega y cómo hacemos la reserva?')}" target="_blank" rel="noopener">
              Consultar / Pedir por WhatsApp ↗
            </a>
          `}
        </div>
      </div>
    </div>
  `;

  // Attach thumbnail switchers
  const thumbs = modalContent.querySelectorAll(".thumb");
  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      thumbs.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      const modalMainImg = $("#modalMainImg");
      if (modalMainImg) modalMainImg.src = thumb.dataset.img;
    });
  });

  backdrop.hidden = false;
  document.body.style.overflow = "hidden";
  const closeBtn = $("#closeModal");
  if (closeBtn) closeBtn.focus();
}

function closeDetail() {
  const backdrop = $("#modalBackdrop");
  if (!backdrop || backdrop.hidden) return;
  backdrop.hidden = true;
  document.body.style.overflow = "";
  if (previousFocus) previousFocus.focus();
}

// Global Event Listeners
document.addEventListener("DOMContentLoaded", () => {
  // Tab Switching
  $$(".view-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      activeTab = tab.dataset.tab;
      updateTabButtons();
      renderProducts();
    });
  });

  // Category Filtering
  $$(".filter").forEach(button => {
    button.addEventListener("click", () => {
      activeCategory = button.dataset.filter;
      updateCategoryButtons();
      renderProducts();
    });
  });

  // Search and Sort
  const searchEl = $("#search");
  if (searchEl) searchEl.addEventListener("input", renderProducts);

  const sortEl = $("#sort");
  if (sortEl) sortEl.addEventListener("change", renderProducts);

  // Cart Drawer open/close
  const openCartBtn = $("#openCart");
  if (openCartBtn) openCartBtn.addEventListener("click", openCart);

  const closeCartBtn = $("#closeCart");
  if (closeCartBtn) closeCartBtn.addEventListener("click", closeCart);

  const scrimEl = $("#scrim");
  if (scrimEl) scrimEl.addEventListener("click", closeCart);

  // Modal close
  const closeModalBtn = $("#closeModal");
  if (closeModalBtn) closeModalBtn.addEventListener("click", closeDetail);

  const modalBackdrop = $("#modalBackdrop");
  if (modalBackdrop) {
    modalBackdrop.addEventListener("click", e => {
      if (e.target === modalBackdrop) closeDetail();
    });
  }

  // Clicks delegation
  document.addEventListener("click", event => {
    // Add to cart
    const addBtn = event.target.closest("[data-add]");
    if (addBtn) {
      const id = addBtn.dataset.add;
      const product = PRODUCTS.find(x => x.id === id);
      if (!product) return;

      if (product.stock <= 0) {
        notify("Este producto no está en stock para entrega inmediata. Puedes pedirlo por encargo.");
        return;
      }

      const currentQty = cart[id] || 0;
      if (currentQty >= product.stock) {
        notify(`¡Ya añadiste todas las ${product.stock} unidades disponibles de ${product.name}!`);
        return;
      }

      cart[id] = currentQty + 1;
      saveCart();
      renderCart();
      notify(`✓ ${product.name} añadido a tu carrito. Abre "Mi carrito" para continuar.`);
      return;
    }

    // Change qty (+/-)
    const qtyBtn = event.target.closest("[data-qty]");
    if (qtyBtn) {
      const id = qtyBtn.dataset.qty;
      const delta = Number(qtyBtn.dataset.delta);
      const product = PRODUCTS.find(x => x.id === id);
      if (!product) return;

      const nextQty = (cart[id] || 0) + delta;
      if (nextQty > product.stock) {
        notify(`Solo contamos con ${product.stock} unidades en stock de ${product.name}.`);
        return;
      }
      if (nextQty <= 0) {
        delete cart[id];
      } else {
        cart[id] = nextQty;
      }
      saveCart();
      renderCart();
      return;
    }

    // Remove item
    const removeBtn = event.target.closest("[data-remove]");
    if (removeBtn) {
      const id = removeBtn.dataset.remove;
      delete cart[id];
      saveCart();
      renderCart();
      notify("Producto retirado del carrito.");
      return;
    }

    // Open detail
    const detailEl = event.target.closest("[data-detail]");
    if (detailEl && !event.target.closest("[data-add]")) {
      openDetail(detailEl.dataset.detail);
      return;
    }

    // Continue shopping inside empty cart
    if (event.target.id === "continueShopping") {
      closeCart();
      const shopSection = $("#disponibles");
      if (shopSection) shopSection.scrollIntoView({ behavior: "smooth" });
      return;
    }

    // Tab jumps from hero / links
    if (event.target.matches("[data-jump-tab]")) {
      const targetTab = event.target.dataset.jumpTab;
      activeTab = targetTab;
      updateTabButtons();
      renderProducts();
      const shopSection = $("#disponibles");
      if (shopSection) shopSection.scrollIntoView({ behavior: "smooth" });
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") {
      closeDetail();
      closeCart();
    }
  });

  // WhatsApp Checkout Form
  const orderForm = $("#orderForm");
  if (orderForm) {
    orderForm.addEventListener("submit", event => {
      event.preventDefault();
      const entries = Object.entries(cart).filter(([, q]) => q > 0);
      if (entries.length === 0) {
        notify("Tu carrito está vacío. Agrega al menos un producto.");
        return;
      }

      const name = $("#customer")?.value.trim() || "";
      const phone = $("#phone")?.value.trim() || "";
      const delivery = $("#delivery")?.value || "Entrega en Cusco";
      const destination = $("#destination")?.value.trim() || "";

      if (!name || !phone || !destination) {
        orderForm.reportValidity();
        return;
      }

      const itemLines = entries.map(([id, q]) => {
        const p = PRODUCTS.find(x => x.id === id);
        return `• ${p ? p.name : id} x ${q} = ${money(p ? p.price * q : 0)}`;
      });

      const total = entries.reduce((sum, [id, q]) => {
        const p = PRODUCTS.find(x => x.id === id);
        return sum + (p ? p.price * q : 0);
      }, 0);

      const message = [
        "🎧 *HOLA VAYOTECH CUSCO, QUIERO COORDINAR ESTE PEDIDO:*",
        "",
        "*PRODUCTOS:*",
        ...itemLines,
        "",
        `💰 *TOTAL PRODUCTOS:* ${money(total)}`,
        "",
        "*DATOS DEL CLIENTE:*",
        `👤 *Nombre:* ${name}`,
        `📱 *Teléfono:* ${phone}`,
        `🚚 *Tipo de entrega:* ${delivery}`,
        `📍 *Dirección / Agencia:* ${destination}`,
        "",
        "Por favor confirmen disponibilidad y horario para coordinar la entrega. ¡Muchas gracias!"
      ].join("\n");

      const link = `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(message)}`;
      const opened = window.open(link, "_blank", "noopener");
      if (!opened) window.location.href = link;
    });
  }

  // Daily Countdown Timer
  function updateCountdown() {
    const now = new Date();
    const end = new Date(now);
    end.setHours(23, 59, 59, 999);
    const seconds = Math.max(0, Math.floor((end - now) / 1000));
    const h = String(Math.floor(seconds / 3600)).padStart(2, "0");
    const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    const countdownEl = $("#countdown");
    if (countdownEl) countdownEl.textContent = `${h}:${m}:${s}`;
  }

  // Initial runs
  saveCart();
  updateTabButtons();
  renderProducts();
  renderCart();
  updateCountdown();
  setInterval(updateCountdown, 1000);
});
