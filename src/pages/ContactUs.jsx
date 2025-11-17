/*
Contact.jsx
React component for the Contact page (Bootstrap only).

Features:
- Hero / header like design with title
- Contact form with Name, Email, Message and Send button
- Embedded Google Maps iframe showing Lola Cake location (Kendari placeholder)
- Contact info (address, email, phone) below the form
- Newsletter subscription banner and footer reuse

How to use:
1. Save this file as src/pages/Contact.jsx
2. Ensure Bootstrap CSS is imported in src/main.jsx: `import 'bootstrap/dist/css/bootstrap.min.css'`
3. Replace asset paths (/assets/...) or Google Maps iframe `src` with your own API/embed link if needed.

Note: the `handleSubmit` currently performs simple front-end validation and shows an alert. Replace it with API call as needed.
*/

import React, { useState } from 'react';

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const storeLocation = {
    lat: -4.0033,
    lng: 122.5083
  };

  function handleSubmit(e) {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      alert('Mohon isi semua field sebelum mengirim.');
      return;
    }
    // For now we just show a confirmation. Replace with fetch/post to API.
    alert('Pesan terkirim. Terima kasih — kami akan menghubungi Anda segera.');
    setName('');
    setEmail('');
    setMessage('');
  }

  return (
    <div className="contact-page">
      <style>{`
        :root{--brand-orange:#f08b2d;--brand-dark:#3d231d}
        .contact-hero{background-image:url('/assets/hero-baking.jpg');background-size:cover;background-position:center;padding:72px 0;color:#fff;position:relative}
        .contact-hero::after{content:'';position:absolute;inset:0;background:rgba(61,35,29,0.45)}
        .contact-hero .container{position:relative;z-index:2}

        .contact-form-card{border-radius:14px;background:rgba(255,255,255,0.95);padding:28px;border:1px solid rgba(0,0,0,0.04)}
        .map-frame{border-radius:12px;border:1px solid rgba(0,0,0,0.06);overflow:hidden}

        .info-list .item{display:flex;gap:10px;align-items:flex-start}
        .info-list .icon{width:44px;height:44px;background:var(--brand-orange);color:#fff;border-radius:8px;display:inline-flex;align-items:center;justify-content:center}

        .subscribe-banner{background-image:url('/assets/baking-banner.jpg');background-size:cover;background-position:center;padding:44px;border-radius:12px;color:#fff}

        @media(max-width:991px){
          .contact-hero{padding:48px 10px}
        }
      `}</style>

      {/* HERO */}
      <section className="contact-hero text-center">
        <div className="container">
          <h2 className="fw-bold" style={{fontSize:28}}>Hubungi Kami</h2>
          <p className="lead" style={{maxWidth:880,margin:'8px auto'}}>Kami siap membantu pertanyaan Anda. Isi formulir di bawah atau langsung chat/telepon kami.</p>
        </div>
      </section>

      {/* FORM + MAP */}
      <main className="container mt-5">
        <div className="row g-4">
          <div className="col-lg-7">
            <div className="contact-form-card">
              <form onSubmit={handleSubmit}>
                <div className="row g-3">
                  <div className="col-md-6">
                    <label className="form-label small">Your Name</label>
                    <input className="form-control" placeholder="Your Name" value={name} onChange={e=>setName(e.target.value)} />
                  </div>
                  <div className="col-md-6">
                    <label className="form-label small">Your Email</label>
                    <input type="email" className="form-control" placeholder="Your Email" value={email} onChange={e=>setEmail(e.target.value)} />
                  </div>

                  <div className="col-12">
                    <label className="form-label small">Questions</label>
                    <textarea rows={8} className="form-control" placeholder="Tulis pesan atau pertanyaanmu di sini..." value={message} onChange={e=>setMessage(e.target.value)} />
                  </div>

                  <div className="col-12 text-start">
                    <button className="btn" style={{background:'var(--brand-orange)',color:'#fff',borderRadius:24,padding:'8px 20px'}}>Send A Message</button>
                  </div>
                </div>
              </form>

              <div className="row mt-4 info-list">
                <div className="col-md-4 item">
                  <div className="icon">📍</div>
                  <div>
                    <div className="small text-muted">Meet Us In Office</div>
                    <div>Jl. Sapati, Bonggoaagu, Kec. Wua-wua, Kota Kendari, Sulawesi Tenggara</div>
                  </div>
                </div>

                <div className="col-md-4 item">
                  <div className="icon">✉️</div>
                  <div>
                    <div className="small text-muted">Our Email Address</div>
                    <div>lolacake@gmail.com</div>
                  </div>
                </div>

                <div className="col-md-4 item">
                  <div className="icon">📞</div>
                  <div>
                    <div className="small text-muted">Meet Us Number</div>
                    <div>0852-4193-1688 / 0811-4090-88</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* MAP */}
          <div className="col-lg-5">
            <div className="map-frame">
            {/* Replace the src with your Google Maps Embed link or other map provider */}
              <iframe
                width="100%"
                height="420"
                style={{ border: 0, borderRadius: "16px" }}
                loading="lazy"
                allowFullScreen
                src={`https://www.google.com/maps?q=${storeLocation.lat},${storeLocation.lng}&z=17&output=embed`}
              />
            </div>
          </div>
        </div>

        {/* Subscribe banner */}
        <div className="mt-5 subscribe-banner p-4 rounded-3 text-center text-white">
          <h3 className="fw-bold">Banyak Pelanggan Bahagia Telah Menikmati Lola Cake</h3>
          <p>Masukkan email kamu untuk mendapatkan promo dan update menu terbaru.</p>
          <div className="d-flex justify-content-center mt-3">
            <input className="form-control w-50 rounded-pill me-2" placeholder="Enter Your Email Address" />
            <button className="btn btn-light rounded-pill">Subscribe</button>
          </div>
        </div>
      </main>
    </div>
  );
}
