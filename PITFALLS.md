# AS Yapı — Bilinen Tuzaklar ve Çözümler

## P1 — Scroll animasyonunda siyah flash (GPU katmanı)

**Belirti:** Bölümler scroll ile görünüme girerken elementler bir kare siyah olarak görünür.

**Kök neden:** Statik CSS `will-change: transform` tarayıcının GPU compositing katmanını önceden oluşturmasına neden olur, ancak içerik o katmana geç boyanır → siyah görünür.

**Çözüm:**
- CSS'de statik `will-change` kaldır (service-card, modal-card, form-submit-btn)
- GSAP scroll reveal'larda `opacity: 0` yerine `autoAlpha: 0` kullan — `autoAlpha` `visibility:hidden` ile başlar, boyasız GPU katmanı göstermez
- `transform-style: preserve-3d` olan elementlere `backface-visibility: hidden` ekle
- 3D tilt gibi hover animasyonlarında `will-change`'i `mouseenter`'da JS ile ekle, `mouseleave`'de kaldır

**Etkilenen dosyalar:** `style.css`, `script.js`

---

## P2 — JPEG logo beyaz arka plan / koyu tema uyumsuzluğu

**Belirti:** Koyu temada logo.jpeg'in beyaz arka planı görünür, kötü görünür.

**Kök neden:** JPEG transparanlık desteklemez. `mix-blend-mode: multiply` koyu arka planda renkleri de karartır, `screen` modu beyazı kaldırmaz.

**Çözüm:** Logo'yu kasıtlı tasarlanmış bir badge içine koy:
```css
.logo-img {
  height: 46px;
  padding: 4px 14px;
  background: oklch(97% 0.004 85); /* ılık beyaz */
  border: 1px solid oklch(75% 0.155 81 / 0.20);
  border-radius: 5px;
  box-shadow: 0 2px 14px oklch(75% 0.155 81 / 0.14);
}
```
Uzun vadeli çözüm: logonun şeffaf arka planlı PNG versiyonunu kullan.

---

## P3 — DNS kayıtları nereye eklenmeli

**Belirti:** isimtescil.net DNS paneline eklenen kayıtlar çalışmıyor.

**Kök neden:** Alan adının nameserver'ları Cloudflare'a taşındıysa, isimtescil.net'e eklenen kayıtlar etkisiz. Kayıtların yetkili nameserver'ın olduğu panele eklenmesi gerekir.

**Kontrol:** `nslookup -type=NS asyapias.com.tr 8.8.8.8` — sonuç `cloudflare.com` içeriyorsa Cloudflare paneli, `dnsenable.com` içeriyorsa isimtescil.net.

**E-posta kurulumu için:**
- Cloudflare Email Routing: gelen maili yönlendirmek için (ücretsiz)
- Brevo SMTP + Gmail "Send mail as": info@... olarak göndermek için (ücretsiz)
- SMTP username = Brevo hesap e-postası (info@asyapias.com.tr değil)

---

## P7 — Hero bölümünde scroll takılması (pin süresi)

**Belirti:** Ana sayfa açılışında aşağı kaydırınca sayfa belirli bir süre hareket etmiyor.

**Kök neden:** ScrollTrigger `pin: true` + `end: "+=200%"` hero bölümünü 2 tam ekran yüksekliği boyunca sabit tutuyor. `scrub: 1.5` ise animasyona 1.5 sn gecikme ekliyor.

**Çözüm:** `end: "+=80%"`, `scrub: 0.8` — animasyon daha hızlı tamamlanır. Hâlâ fazla hissedilirse `end: "+=50%"` ya da `pin: false`.

---

## P4 — PowerShell'de git commit heredoc sözdizimi

**Belirti:** `git commit -m "$(cat <<'EOF'...EOF)"` PowerShell'de `ParserError` verir.

**Kök neden:** Bash heredoc sözdizimi PowerShell'de çalışmaz.

**Çözüm:** PowerShell single-quoted here-string kullan:
```powershell
git commit -m @'
Commit mesajı buraya.
'@
```

---

## P5 — Flutter `--base-href` Git Bash path mangling

**Belirti:** `flutter build web --base-href /...` komutunda path bozulur.

**Çözüm:** `MSYS_NO_PATHCONV=1 flutter build web --base-href /...`

---

## P6 — Cloudflare Pages + özel domain — nameserver taşıma süresi

**Belirti:** Nameserver değişikliği isimtescil.net'te yapıldı ama etki etmedi.

**Kök neden:** .com.tr TLD değişiklikleri NIC.TR registry'ye iletilmesi gerekir, bu 2-24 saat sürebilir. Tüm .com.tr root NS'lerini kontrol etmek için:
```powershell
foreach ($ns in @("ns43.ns.tr","ns44.ns.tr","ns61.ns.tr")) {
  nslookup -type=NS asyapias.com.tr $ns
}
```
