// AS Yapı - Proje Veritabanı ve Yönetim Modülü
// Yeni proje eklemek için bu dosyayı düzenleyebilir veya tarayıcıda ?admin=true parametresiyle görsel aracı kullanabilirsiniz.

const PROJECTS_DATA = [
  {
    id: "as-bosphorus-villas",
    title: "AS Bosphorus Konakları",
    category: "residential",
    categoryTitle: "Konut Projesi",
    location: "Sarıyer, İstanbul",
    year: "2025",
    area: "18.500 m²",
    description: "İstanbul Boğazı'nın nefes kesen manzarasına hakim, modern mimari çizgileri ile tarihi yalı estetiğini harmanlayan ultra lüks konut projesi. Doğal taş, yapısal çelik ve lamine ahşap detayların eşsiz uyumu.",
    mainImage: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Boğaz Manzaralı Özel Infinity Havuz",
      "Akıllı İklimlendirme ve Güvenlik Altyapısı",
      "Doğal Taş ve Tik Ağacı Cephe Detayları",
      "Özel Yat İskelesi ve Helikopter Pisti",
      "LEED Gold Sertifikalı Çevre Dostu Tasarım"
    ]
  },
  {
    id: "as-marina-plaza",
    title: "AS Marina Plaza",
    category: "commercial",
    categoryTitle: "Ticari Proje",
    location: "Kartal, İstanbul",
    year: "2026",
    area: "65.000 m²",
    description: "Marmara Denizi ve Adalar manzarasına karşı konumlanmış, kendi yat marinasına sahip A+ sınıfı ticari ofis ve yaşam merkezi projesi. Yenilikçi ve aerodinamik kule tasarımıyla iş dünyasının yeni prestij merkezi.",
    mainImage: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Deniz Manzaralı Modüler Çalışma Alanları",
      "Helikopter Pisti ve Marina Erişim İskelesi",
      "Double-skin Akustik ve Akıllı Cephe Sistemi",
      "LEED Platinum Sertifika Adaylığı",
      "Yüksek Hızlı Akıllı Asansörler (10m/s)"
    ]
  },
  {
    id: "as-galata-loft",
    title: "AS Galata Loft",
    category: "interior",
    categoryTitle: "İç Mimari & Tasarım",
    location: "Beyoğlu, İstanbul",
    year: "2024",
    area: "340 m²",
    description: "Tarihi Galata bölgesinde yer alan, 19. yüzyıldan kalma tescilli bir taş binanın endüstriyel minimalist tarzda restore edilerek loft daireye dönüştürülmesi projesi. Tarihi tuğla duvarların modern metal strüktürlerle uyumu.",
    mainImage: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Tarihi Tuğla ve Horasan Harcı Restorasyonu",
      "Brüt Beton ve Siyah Çelik Strüktürler",
      "Yüksek Tavanlı Akustik Aydınlatma Çözümleri",
      "Gizli Ev Sinema ve Ses Altyapısı",
      "El Yapımı İtalyan Mutfak Tasarımı"
    ]
  },
  {
    id: "as-tower",
    title: "AS Tower Rezidans",
    category: "residential",
    categoryTitle: "Konut Projesi",
    location: "Çankaya, Ankara",
    year: "2025",
    area: "45.000 m²",
    description: "Modern mimari çizgileri, çevreci teknolojileri ve lüks sosyal donatıları bir araya getiren 32 katlı prestijli rezidans projesi. Akıllı ev sistemleri ve panoramik şehir manzarasıyla standartların ötesinde bir yaşam sunmaktadır.",
    mainImage: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "A+ Enerji Sınıfı Sürdürülebilir Yapı",
      "7/24 Kesintisiz Akıllı Güvenlik Sistemleri",
      "Kapalı Otopark ve Elektrikli Araç Şarj İstasyonları",
      "Açık/Kapalı Yüzme Havuzu ve Wellness Center",
      "Kendi Enerjisini Üreten Akıllı Cephe Sistemi"
    ]
  },
  {
    id: "as-elite-villas",
    title: "AS Elite Villaları",
    category: "residential",
    categoryTitle: "Konut Projesi",
    location: "Gölbaşı, Ankara",
    year: "2024",
    area: "12.500 m²",
    description: "Doğayla iç içe, müstakil havuzlu ve geniş bahçeli 12 adet ultra lüks akıllı villa projesi. Doğal taş ve ahşap detaylarla bezeli mimarisiyle, doğallığı ve konforu bir arada sunan özel bir yaşam alanı.",
    mainImage: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "350 m² Müstakil Bahçe ve Özel Havuz",
      "Yerden Isıtma ve VRF Soğutma Sistemleri",
      "Isı Pompalı ve Çevre Dostu İklimlendirme",
      "Özel Sinema ve Fitness Odası",
      "Lamine Parke ve İthal Seramik Kaplamalar"
    ]
  },
  {
    id: "as-vadisi-villas",
    title: "AS Vadisi Konutları",
    category: "residential",
    categoryTitle: "Konut Projesi",
    location: "Çankaya, Ankara",
    year: "2025",
    area: "35.000 m²",
    description: "Ankara'nın vadi manzarasına hakim, sürdürülebilir mimarinin ön planda olduğu, geniş yeşil alanlara ve güneş paneli kiremitlerine sahip yeni nesil lüks daire kompleksi projesi.",
    mainImage: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Fotovoltaik Güneş Enerjili Çatı Kiremitleri",
      "Geniş Vadi Manzaralı Koşu ve Rekreasyon Alanı",
      "Gri Su Arıtma ve Geri Kazanım Altyapısı",
      "Dikey Orman Bitkilendirmeli Kat Balkonları",
      "7/24 Kesintisiz Güç ve Jeneratör Yedeklemesi"
    ]
  },
  {
    id: "as-gokturk-houses",
    title: "AS Göktürk Orman Evleri",
    category: "residential",
    categoryTitle: "Konut Projesi",
    location: "Göktürk, İstanbul",
    year: "2026",
    area: "9.200 m²",
    description: "Belgrad Ormanı sınırında, doğanın kalbinde konumlandırılmış, brüt beton, masif ahşap ve temperli cam cepheli 8 adet ultra lüks müstakil orman evi projesi.",
    mainImage: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Masif Ahşap ve Doğal Taş Dış Cephe Kaplamaları",
      "Akıllı Yağmur Suyu Toplama Deposu ve Bahçe Sulama",
      "Jeotermal Isı Pompası ile Düşük Enerji Tüketimi",
      "Müstakil Isıtmalı Havuz ve Geniş Deck Teraslar",
      "Özel Güvenlik ve Çevre Çit Koruma Sistemleri"
    ]
  },
  {
    id: "as-modular-maslak",
    title: "AS Modüler Maslak",
    category: "commercial",
    categoryTitle: "Ticari Proje",
    location: "Maslak, İstanbul",
    year: "2026",
    area: "42.000 m²",
    description: "Maslak finans bölgesinde yükselen, esnek ve modüler kat planlarına sahip, HEPA filtreli taze hava iklimlendirmeli ve akıllı cam cepheli yeni nesil yeşil ofis kulesi projesi.",
    mainImage: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Birleştirilebilir ve Modüler Ofis Alanları",
      "Güneş Isısı Kırıcı Akıllı Cam Giydirme Cephe",
      "Kat Terasları ve Sosyal Ortak Alanlar",
      "HEPA Filtreli Havalandırma (HVAC)",
      "Bina Yönetim Otomasyonu (BMS)"
    ]
  },
  {
    id: "as-kadikoy-office",
    title: "AS Kadıköy Kreatif Ofis",
    category: "interior",
    categoryTitle: "İç Mimari & Tasarım",
    location: "Kadıköy, İstanbul",
    year: "2025",
    area: "480 m²",
    description: "Kadıköy'de eski bir antreponun, yüksek tavanlı, brüt beton zeminli, açık çalışma alanları ve ses yalıtımlı toplantı kapsülleri sunan modern bir kreatif ajans ofisine dönüştürülmesi projesi.",
    mainImage: "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1542744094-3a31f103e35f?auto=format&fit=crop&w=800&q=80"
    ],
    features: [
      "Yüksek Tavan ve Özel Akustik Panel Askıları",
      "Ses Yalıtımlı Mobil Toplantı Kapsülleri",
      "Gizli Kablolama ve Zemin Kanal Sistemleri",
      "Kişiselleştirilebilir Dimlenebilir Aydınlatma",
      "Minimalist Endüstriyel Mobilya Tasarımları"
    ]
  }
];

// Helper: Projeleri listeleme fonksiyonu
function getProjects(category = "all") {
  if (category === "all") return PROJECTS_DATA;
  return PROJECTS_DATA.filter(p => p.category === category);
}

// Helper: ID'ye göre proje detayını getirme fonksiyonu
function getProjectById(id) {
  return PROJECTS_DATA.find(p => p.id === id);
}

// --- GÖRSEL PROJE EKLEME ARACI (ADMIN PANEL) ---
// Tarayıcı adres çubuğuna ?admin=true eklendiğinde devreye girer.
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('admin') === 'true') {
    initAdminPanel();
  }
});

function initAdminPanel() {
  // CSS Ekle
  const adminStyle = document.createElement("style");
  adminStyle.textContent = `
    .admin-trigger-btn {
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #d4af37 0%, #c5a028 100%);
      color: #0b0f19;
      font-weight: 700;
      border: none;
      border-radius: 50px;
      padding: 12px 24px;
      box-shadow: 0 4px 20px rgba(212, 175, 55, 0.4);
      cursor: pointer;
      z-index: 99999;
      font-family: 'Space Grotesk', sans-serif;
      font-size: 0.9rem;
      display: flex;
      align-items: center;
      gap: 8px;
      transition: transform 0.2s;
    }
    .admin-trigger-btn:hover {
      transform: scale(1.05);
    }
    .admin-panel-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(11, 15, 25, 0.9);
      backdrop-filter: blur(8px);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      font-family: 'Plus Jakarta Sans', sans-serif;
    }
    .admin-panel-overlay.active {
      opacity: 1;
      pointer-events: all;
    }
    .admin-panel-card {
      background: #111827;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 20px;
      width: 90%;
      max-width: 700px;
      max-height: 85vh;
      overflow-y: auto;
      padding: 30px;
      box-shadow: 0 20px 50px rgba(0, 0, 0, 0.5);
      position: relative;
    }
    .admin-panel-close {
      position: absolute;
      top: 20px;
      right: 20px;
      background: transparent;
      border: none;
      color: #9ca3af;
      font-size: 1.5rem;
      cursor: pointer;
      transition: color 0.2s;
    }
    .admin-panel-close:hover {
      color: #f3f4f6;
    }
    .admin-panel-title {
      font-family: 'Space Grotesk', sans-serif;
      color: #f3f4f6;
      font-size: 1.6rem;
      margin-bottom: 20px;
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      padding-bottom: 10px;
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .admin-form-group {
      margin-bottom: 15px;
    }
    .admin-form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 15px;
    }
    .admin-label {
      display: block;
      color: #9ca3af;
      font-size: 0.85rem;
      font-weight: 600;
      margin-bottom: 6px;
    }
    .admin-input, .admin-select, .admin-textarea {
      width: 100%;
      background: #1f2937;
      border: 1px solid rgba(255, 255, 255, 0.08);
      border-radius: 8px;
      color: #f3f4f6;
      padding: 10px 14px;
      font-size: 0.9rem;
      font-family: inherit;
      outline: none;
      transition: border-color 0.2s;
    }
    .admin-input:focus, .admin-select:focus, .admin-textarea:focus {
      border-color: #d4af37;
    }
    .admin-textarea {
      height: 80px;
      resize: vertical;
    }
    .admin-btn {
      background: linear-gradient(135deg, #d4af37 0%, #c5a028 100%);
      color: #0b0f19;
      font-weight: 700;
      border: none;
      border-radius: 8px;
      padding: 12px 20px;
      font-size: 0.95rem;
      width: 100%;
      cursor: pointer;
      margin-top: 15px;
      font-family: 'Space Grotesk', sans-serif;
      transition: opacity 0.2s;
    }
    .admin-btn:hover {
      opacity: 0.9;
    }
    .admin-result-box {
      margin-top: 20px;
      background: #0b0f19;
      border: 1px dashed rgba(212, 175, 55, 0.3);
      padding: 15px;
      border-radius: 8px;
      display: none;
    }
    .admin-result-box.active {
      display: block;
    }
    .admin-result-title {
      color: #d4af37;
      font-size: 0.85rem;
      font-weight: 700;
      margin-bottom: 8px;
      font-family: 'Space Grotesk', sans-serif;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .admin-copy-btn {
      background: rgba(255, 255, 255, 0.08);
      border: none;
      color: #f3f4f6;
      font-size: 0.75rem;
      padding: 4px 10px;
      border-radius: 4px;
      cursor: pointer;
    }
    .admin-copy-btn:hover {
      background: #d4af37;
      color: #0b0f19;
    }
    .admin-code {
      width: 100%;
      height: 120px;
      background: transparent;
      border: none;
      color: #9ca3af;
      font-family: monospace;
      font-size: 0.8rem;
      resize: none;
      outline: none;
    }
  `;
  document.head.appendChild(adminStyle);

  // Panel HTML Ekle
  const panelDiv = document.createElement("div");
  panelDiv.className = "admin-panel-overlay";
  panelDiv.id = "adminPanel";
  panelDiv.innerHTML = `
    <div class="admin-panel-card">
      <button class="admin-panel-close" id="closeAdmin">&times;</button>
      <h3 class="admin-panel-title">🔨 Yeni Proje Ekleme Paneli</h3>
      
      <div class="admin-form-group">
        <label class="admin-label">Proje Başlığı</label>
        <input type="text" class="admin-input" id="projTitle" placeholder="Örn: AS Hill Villaları">
      </div>

      <div class="admin-form-row">
        <div class="admin-form-group">
          <label class="admin-label">Kategori</label>
          <select class="admin-select" id="projCategory">
            <option value="residential">Konut Projesi</option>
            <option value="commercial">Ticari Yapı</option>
            <option value="interior">İç Mimari & Tasarım</option>
          </select>
        </div>
        <div class="admin-form-group">
          <label class="admin-label">Konum / Şehir</label>
          <input type="text" class="admin-input" id="projLocation" placeholder="Örn: İncek, Ankara">
        </div>
      </div>

      <div class="admin-form-row">
        <div class="admin-form-group">
          <label class="admin-label">Proje Yılı</label>
          <input type="text" class="admin-input" id="projYear" placeholder="Örn: 2026">
        </div>
        <div class="admin-form-group">
          <label class="admin-label">İnşaat Alanı</label>
          <input type="text" class="admin-input" id="projArea" placeholder="Örn: 18.000 m²">
        </div>
      </div>

      <div class="admin-form-group">
        <label class="admin-label">Kısa Açıklama</label>
        <textarea class="admin-textarea" id="projDesc" placeholder="Projenin öne çıkan özelliklerini, mimari detaylarını açıklayın..."></textarea>
      </div>

      <div class="admin-form-group">
        <label class="admin-label">Kapak Görseli URL</label>
        <input type="text" class="admin-input" id="projMainImage" placeholder="https://images.unsplash.com/photo-...">
      </div>

      <div class="admin-form-group">
        <label class="admin-label">Diğer Görseller (Virgülle ayırın)</label>
        <input type="text" class="admin-input" id="projImages" placeholder="gorsel1_url, gorsel2_url...">
      </div>

      <div class="admin-form-group">
        <label class="admin-label">Öne Çıkan Özellikler (Virgülle ayırın)</label>
        <input type="text" class="admin-input" id="projFeatures" placeholder="Akıllı Ev Sistemi, Kapalı Otopark, 24/7 Güvenlik...">
      </div>

      <button class="admin-btn" id="generateProjBtn">Proje Kodunu Oluştur</button>

      <div class="admin-result-box" id="resultBox">
        <div class="admin-result-title">
          <span>KOD OLUŞTURULDU (Kopyalayıp projects.js içine yapıştırın)</span>
          <button class="admin-copy-btn" id="copyCodeBtn">Kodu Kopyala</button>
        </div>
        <textarea class="admin-code" id="outputCode" readonly></textarea>
      </div>
    </div>
  `;
  document.body.appendChild(panelDiv);

  // Trigger Butonu Ekle
  const triggerBtn = document.createElement("button");
  triggerBtn.className = "admin-trigger-btn";
  triggerBtn.innerHTML = `<span>⚙️</span> Proje Ekle`;
  triggerBtn.id = "openAdmin";
  document.body.appendChild(triggerBtn);

  // Buton Eventleri
  const panel = document.getElementById("adminPanel");
  const openBtn = document.getElementById("openAdmin");
  const closeBtn = document.getElementById("closeAdmin");
  const generateBtn = document.getElementById("generateProjBtn");
  const resultBox = document.getElementById("resultBox");
  const outputCode = document.getElementById("outputCode");
  const copyBtn = document.getElementById("copyCodeBtn");

  openBtn.addEventListener("click", () => panel.classList.add("active"));
  closeBtn.addEventListener("click", () => panel.classList.remove("active"));
  
  // Dışarı tıklayınca kapansın
  panel.addEventListener("click", (e) => {
    if (e.target === panel) panel.classList.remove("active");
  });

  generateBtn.addEventListener("click", () => {
    const title = document.getElementById("projTitle").value || "Yeni Proje";
    const category = document.getElementById("projCategory").value;
    const catTitle = document.getElementById("projCategory").options[document.getElementById("projCategory").selectedIndex].text;
    const location = document.getElementById("projLocation").value || "Ankara";
    const year = document.getElementById("projYear").value || "2026";
    const area = document.getElementById("projArea").value || "10.000 m²";
    const desc = document.getElementById("projDesc").value || "";
    const mainImg = document.getElementById("projMainImage").value || "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00";
    
    const rawImgs = document.getElementById("projImages").value;
    const images = rawImgs ? rawImgs.split(",").map(i => i.trim()).filter(i => i !== "") : [mainImg];
    
    const rawFeats = document.getElementById("projFeatures").value;
    const features = rawFeats ? rawFeats.split(",").map(f => f.trim()).filter(f => f !== "") : ["Modern Tasarım", "Birinci Sınıf Malzeme"];

    const id = title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    const newProjectObj = {
      id,
      title,
      category,
      categoryTitle: catTitle,
      location,
      year,
      area,
      description: desc,
      mainImage: mainImg,
      images,
      features
    };

    const formattedCode = JSON.stringify(newProjectObj, null, 2);
    // JS listesine eklenebilir format
    outputCode.value = `  ${formattedCode.split('\n').join('\n  ')},`;
    resultBox.classList.add("active");
  });

  copyBtn.addEventListener("click", () => {
    outputCode.select();
    document.execCommand("copy");
    copyBtn.textContent = "Kopyalandı!";
    setTimeout(() => {
      copyBtn.textContent = "Kodu Kopyala";
    }, 2000);
  });
}
