const TRANSLATIONS_PATH = './js/lang/'; 

const DEFAULT_LANG = 'fr';
let currentLang = DEFAULT_LANG; 

let iframeLoadedPromise = new Promise(resolve => {
    window.iframeReadyResolver = resolve; 
});

async function getIframeDocument() {
    await iframeLoadedPromise; 

    const dynamicIframe = document.getElementById('dynamicIframe'); 
    if (dynamicIframe && dynamicIframe.contentDocument) {
        return dynamicIframe.contentDocument;
    }
    
    console.error("Iframe document is still inaccessible after waiting.");
    return document; 
}


/**
 * @param {string} lang - Kode bahasa ('fr' atau 'en').
 */
async function loadTranslations(lang) {
    try {
        const response = await fetch(`${TRANSLATIONS_PATH}${lang}.json`);
        if (!response.ok) {
            console.error(`Failed to load ${lang}.json. Check TRANSLATIONS_PATH: ${TRANSLATIONS_PATH}`);
            throw new Error(`Failed to load ${lang}.json: ${response.statusText}`);
        }
        const translations = await response.json();
        const targetDocument = await getIframeDocument();
        targetDocument.querySelectorAll('[data-lang-key]').forEach(element => { 
            const key = element.getAttribute('data-lang-key');
            
            if (translations[key]) {
                
                if (element.tagName === 'IMG' && key.startsWith('gallery_alt')) {
                    element.setAttribute('alt', translations[key]);
                }
                else if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.setAttribute('placeholder', translations[key]);
                }
                else {
                    element.textContent = translations[key];
                }
            }
        });
        
        targetDocument.documentElement.setAttribute('lang', lang);
        
        if (window.parent === window) { 
            document.title = translations['page_title'] + " - Paca Dépanne";
            document.querySelector('meta[name="description"]').setAttribute('content', translations['meta_description']);
        } else {
            if (targetDocument.title) targetDocument.title = translations['page_title'] + " - Paca Dépanne";
            const metaDesc = targetDocument.querySelector('meta[name="description"]');
            if (metaDesc) metaDesc.setAttribute('content', translations['meta_description']);
        }
        
        const switcher = targetDocument.getElementById('lang-switch'); 
        if (switcher) {
            const nextLangDisplay = lang === 'fr' ? translations['language_switch'] : 'Français';
            switcher.textContent = nextLangDisplay;
            switcher.setAttribute('data-current-lang', lang); 
        }

        currentLang = lang;

    } catch (error) {
        console.error("Critical error during translation loading:", error);
    }
}

function initializeLanguage() {
    const storedLang = localStorage.getItem('lang');
    currentLang = storedLang || DEFAULT_LANG;
}

document.addEventListener('DOMContentLoaded', initializeLanguage);

function switchLanguage() {
    const newLang = currentLang === 'fr' ? 'en' : 'fr';
    localStorage.setItem('lang', newLang);
    loadTranslations(newLang);
}