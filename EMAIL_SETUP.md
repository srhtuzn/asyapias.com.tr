# AS Yapı — İletişim Formu E-posta Kurulum Kılavuzu (EMAIL_SETUP.md)

Bu kılavuz, web sitesindeki iletişim formundan (`contact.html` ve `contact-en.html`) gönderilen mesajların **info@asyapias.com.tr** adresine güvenli bir şekilde e-posta olarak ulaştırılması için gereken adımları ve altyapı şablonlarını içerir.

---

## 1. Mimari ve Güvenlik Yaklaşımı

Web sitesi statik HTML/JS olarak barındırıldığı için (Cloudflare Pages), API anahtarları veya SMTP şifreleri doğrudan tarayıcı tarafındaki JavaScript koduna (`script.js`) **yazılmamalıdır**. Aksi takdirde, sitenin ziyaretçileri bu kodları inceleyerek e-posta şifrelerinizi çalabilir ve adınıza spam mailler gönderebilir.

**Güvenli Çözüm:**
1. Form verileri, sunucu tarafında çalışan ve tarayıcıdan gizli olan bir **Cloudflare Pages Function (Serverless API)** adresine (`/api/send-mail`) gönderilir.
2. Bu sunucusuz fonksiyon, Cloudflare paneline güvenli olarak girilen gizli çevre değişkenlerini (Environment Variables) okur.
3. Mesajı **Brevo (eski adıyla Sendinblue)** API'si üzerinden hedefe postalar.

---

## 2. Brevo Altyapısının Hazırlanması

Brevo, günde 300 adet ücretsiz e-posta gönderim hakkı tanıyan güvenilir bir e-posta servis sağlayıcısıdır (transactional mail provider).

1. **Hesap Oluşturun:** [Brevo](https://www.brevo.com/) üzerinde ücretsiz bir hesap açın.
2. **Domain Ekleyin & Doğrulayın:**
   - Panelden `Senders & Domains` > `Domains` > `Add a new domain` seçeneğine tıklayın.
   - `asyapias.com.tr` alan adını girin.
   - Brevo'nun verdiği **SPF**, **DKIM** ve **TXT** kayıtlarını Cloudflare DNS panelinize ekleyerek alan adınızı doğrulayın. (Bu adım maillerin spam klasörüne düşmesini önler).
3. **API Key Alın:**
   - Panelden `SMTP & API` sekmesine giderek bir **v3 API Key** oluşturun. Bu anahtarı kopyalayın (Cloudflare'a ekleyeceğiz).

---

## 3. Sunucu Tarafı: Cloudflare Pages Function Şablonu

Proje kök dizininde `functions` adında yeni bir klasör ve içerisine `api/send-mail.js` dosyası oluşturularak aşağıdaki sunucusuz API entegre edilmelidir:

### [NEW] `functions/api/send-mail.js`
```javascript
export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    
    const { name, email, phone, subject, message } = body;
    
    // Basit veri doğrulama
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: "Lütfen zorunlu alanları doldurun." }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Brevo API Key kontrolü
    if (!env.BREVO_API_KEY) {
      return new Response(
        JSON.stringify({ error: "E-posta servis yapılandırması eksik." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    // Brevo API Gönderim İsteyi
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "accept": "application/json",
        "api-key": env.BREVO_API_KEY,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        sender: { name: "AS Yapı Web Formu", email: "info@asyapias.com.tr" },
        to: [{ email: env.TO_EMAIL || "info@asyapias.com.tr", name: "AS Yapı İletişim" }],
        replyTo: { email: email, name: name },
        subject: `Yeni İletişim Formu Mesajı: ${subject || "Konu Belirtilmedi"}`,
        htmlContent: `
          <h3>Yeni Mesaj Detayları:</h3>
          <p><strong>Gönderen:</strong> ${name}</p>
          <p><strong>E-posta:</strong> ${email}</p>
          <p><strong>Telefon:</strong> ${phone || "Belirtilmedi"}</p>
          <p><strong>Konu:</strong> ${subject || "Belirtilmedi"}</p>
          <hr/>
          <p><strong>Mesaj:</strong></p>
          <p style="white-space: pre-line;">${message}</p>
        `
      })
    });

    if (response.ok) {
      return new Response(
        JSON.stringify({ success: "Mesajınız başarıyla gönderildi." }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    } else {
      const errData = await response.json();
      return new Response(
        JSON.stringify({ error: "E-posta gönderimi başarısız oldu.", details: errData }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Sunucu hatası oluştu.", details: error.message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
```

---

## 4. Tarayıcı Tarafı: `script.js` Entegrasyonu

Şu an `script.js` dosyasında sadece arayüzde sahte başarı mesajı gösterilmektedir. Gerçek gönderim için form submit olayındaki işleyici (event listener) aşağıdaki şekilde güncellenmelidir:

### `script.js` Üzerinde Yapılacak Değişiklik Şablonu
```javascript
// İletişim Formu Gönderimi
const contactForm = document.getElementById("contactForm");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Butonu yükleniyor durumuna getir
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = "Gönderiliyor...";
    
    // Form verilerini al
    const formData = {
      name: document.getElementById("formName").value,
      email: document.getElementById("formEmail").value,
      phone: document.getElementById("formPhone")?.value || "",
      subject: document.getElementById("formSubject")?.value || "Konu Belirtilmedi",
      message: document.getElementById("formMessage").value
    };

    try {
      const response = await fetch("/api/send-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      if (response.ok) {
        // Başarı mesajı göster (Mevcut UI animasyonlarınız kullanılabilir)
        alert("Mesajınız başarıyla iletildi!");
        contactForm.reset();
      } else {
        alert("Hata: " + result.error);
      }
    } catch (err) {
      alert("Bağlantı hatası oluştu. Lütfen daha sonra tekrar deneyin.");
      console.error(err);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  });
}
```

---

## 5. Cloudflare Pages Ortam Değişkenleri Ayarı

Kodlar GitHub deposuna itildiğinde, Cloudflare Pages projenizin yönetim panelinden bu iki değişken tanımlanmalıdır:

1. Cloudflare Pages projenize gidin.
2. **Settings** > **Environment variables** adımlarını izleyin.
3. **Production** ve **Preview** için şu değişkenleri tanımlayın:
   - `BREVO_API_KEY` = *(Brevo panelinden aldığınız API anahtarı)*
   - `TO_EMAIL` = `info@asyapias.com.tr`

Kurulum tamamlandıktan sonra siteniz tamamen güvenli, SMTP şifrelerinizi dışarı sızdırmayan ve spam engellemelerine takılmayan bir e-posta bildirim sistemine sahip olacaktır.
