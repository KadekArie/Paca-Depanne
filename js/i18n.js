// js/i18n.js

const DEFAULT_LANGUAGE = 'fr';
let currentLanguage = DEFAULT_LANGUAGE;
let translations = {};

// Fungsi untuk mendapatkan path file terjemahan yang benar
function getLangPath(lang) {
    // Diasumsikan file JSON berada di ./js/lang/ dari folder utama
    // Kita harus menentukan path relatif yang benar (misalnya, "../js/lang/" atau "./js/lang/")
    const pathPrefix = window.location.pathname.includes('/climatisation/') || 
                       window.location.pathname.includes('/ventilation/') || 
                       window.location.pathname.includes('/plomberie/') ? '../js/lang/' : './js/lang/';
    return `${pathPrefix}${lang}.json`;
}

// 1. Memuat semua terjemahan
async function loadTranslations(lang = DEFAULT_LANGUAGE) {
    try {
        const response = await fetch(getLangPath(lang));
        if (!response.ok) {
            console.error(`Failed to load ${lang}.json. Falling back to default.`);
            return;
        }
        translations[lang] = await response.json();
        currentLanguage = lang;
    } catch (error) {
        console.error('Error loading translations:', error);
    }
}

// 2. Fungsi terjemahan utama: Mengambil teks berdasarkan kunci
function t(key) {
    // Ambil dari bahasa aktif, fallback ke default (fr) jika kunci tidak ditemukan
    return (translations[currentLanguage] && translations[currentLanguage][key]) || 
           (translations[DEFAULT_LANGUAGE] && translations[DEFAULT_LANGUAGE][key]) || 
           `[${key}]`; // Tampilkan kunci jika tidak ada terjemahan
}

// 3. Menerapkan terjemahan pada semua elemen yang memiliki atribut data-i18n
function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        const translatedText = t(key);

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            // Untuk input/textarea (placeholder)
            element.placeholder = translatedText;
        } else {
            // Untuk elemen biasa (div, span, h1, p)
            element.textContent = translatedText;
        }
    });

    // Panggil ulang inisialisasi form jika diperlukan, 
    // karena opsi select/placeholder form mungkin perlu diperbarui
    if (window.initializeContactForm) {
         window.initializeContactForm(currentLanguage === 'en' ? 'Heating & AC' : 'Climatisation');
    }
}

// Memuat bahasa default saat skrip dimulai
loadTranslations(DEFAULT_LANGUAGE).then(applyTranslations);

// Ekspos fungsi terjemahan secara global
window.t = t;
window.loadTranslations = loadTranslations;
window.applyTranslations = applyTranslations;