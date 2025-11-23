import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="bg-brand text-white">
        <div className="max-w-6xl mx-auto px-4 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-3xl font-extrabold mb-2">Lola Cake</div>
              <p className="max-w-xs opacity-90">
                Lola Cake adalah usaha rumahan yang memproduksi berbagai jenis
                kue dan makanan tradisional dengan rasa autentik dan bahan
                berkualitas.
              </p>
              <div className="mt-3 mb-2">
                <img src="/assets/halal.png" alt="Halal" className="h-12" />
              </div>
              <div className="flex items-center gap-3 mt-3">
                <a href="https://wa.me/6285241931688" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-brand" aria-label="WhatsApp">💬</a>
                <a href="https://facebook.com" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-brand" aria-label="Facebook">f</a>
                <a href="https://instagram.com" className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white text-brand" aria-label="Instagram">◎</a>
              </div>
            </div>

            <div>
              <div className="font-bold text-lg mb-4">Menu</div>
              <ul className="space-y-2">
                <li><a href="/" className="hover:underline">Menu</a></li>
                <li><a href="/product" className="hover:underline">Product</a></li>
                <li><a href="/about-us" className="hover:underline">About Us</a></li>
                <li><a href="/contact-us" className="hover:underline">Contact</a></li>
                <li><a href="/account/profile" className="hover:underline">Profile</a></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-lg mb-4">Help Center</div>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">FAQ</a></li>
                <li><a href="#" className="hover:underline">Terms &amp; Conditions</a></li>
                <li><a href="#" className="hover:underline">Privacy Policy</a></li>
              </ul>
            </div>

            <div>
              <div className="font-bold text-lg mb-4">Contact</div>
              <ul className="space-y-2 mb-3">
                <li>📞 0852-4193-1688</li>
                <li>✉️ lolacake@gmail.com</li>
                <li>
                  📍 Jl. Sapati No.19, Kendari,
                  <br /> Sulawesi Tenggara
                </li>
              </ul>
              <div className="flex items-center overflow-hidden rounded-md bg-white">
                <input type="email" placeholder="Your Email Address" aria-label="Your Email Address" className="flex-1 px-3 py-2 text-sm text-slate-800 focus:outline-none" />
                <button type="button" className="px-4 py-2 bg-coffee text-white">Send</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-coffee text-white text-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 text-center">
          Copyright © 2024 <a href="/" className="underline">Lola Cake</a>, All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}