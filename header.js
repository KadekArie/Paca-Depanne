function getNavLink(basePath, folderName, text, pageName, activePage, languageSuffix) {
    
    const cleanPageName = pageName.toLowerCase().trim();
    const cleanActivePage = activePage.toLowerCase().trim();

    const activeClass = (cleanPageName === cleanActivePage) 
        ? 'bg-primary text-primary-foreground'
        : 'text-foreground hover:bg-muted';
    
    let href;
    if (folderName === 'index') {
        href = `index${languageSuffix}.html`;
    } else {
        href = `${folderName}/index${languageSuffix}.html`;
    }

    return `
        <a href="${basePath}${href}" class="px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeClass}" data-source-file="src/components/common/Header.tsx" data-source-line-start="63" data-source-line-end="75">${text}</a>
    `;
}

function loadHeader(currentPagePath, activePage, languageSuffix = '') {
    
    let basePath = currentPagePath;
    if (basePath === './') {
        basePath = '';
    } else if (basePath.slice(-1) !== '/') {
        basePath += '/';
    }

    const currentLang = languageSuffix === '.en' ? 'EN' : 'FR';
    const oppositeSuffix = languageSuffix === '.en' ? '' : '.en';
    const oppositeLang = languageSuffix === '.en' ? 'FR' : 'EN';
    
    const oppositeUrl = `index${oppositeSuffix}.html`;

    const languageSwitcherHTML = `
        <div class="language-switcher-inner hidden md:block" style="font-size: 14px; font-weight: 500;">
            <span style="color: ${currentLang === 'FR' ? '#0a477e' : '#6c757d'}; font-weight: ${currentLang === 'FR' ? 'bold' : 'normal'};">${currentLang}</span> 
            <span style="color: #6c757d;">|</span> 
            <a href="${oppositeUrl}" style="color: ${oppositeLang === 'EN' ? '#0a477e' : '#6c757d'}; text-decoration: none; font-weight: ${oppositeLang === 'EN' ? 'bold' : 'normal'};">${oppositeLang}</a>
        </div>
    `;

    const headerHTML = `
        <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background backdrop-blur-sm border-b border-border shadow-sm" data-source-file="src/components/common/Header.tsx" data-source-line-start="39" data-source-line-end="122">
            <div class="container-custom" data-source-file="src/components/common/Header.tsx" data-source-line-start="46" data-source-line-end="121">
                <div class="flex items-center justify-between h-16 md:h-20" data-source-file="src/components/common/Header.tsx" data-source-line-start="47" data-source-line-end="120">
                    
                    <a href="${basePath}index${languageSuffix}.html" class="flex items-center space-x-2 group">
                        <img src="${basePath}assets/logo/paca_depanne-logo.svg" alt="Logo Paca Depanne" class="w-16 h-16" />
                    </a>
                    
                    <nav class="hidden md:flex items-center space-x-1">
                        ${getNavLink(basePath, 'index', 'Accueil', 'accueil', activePage, languageSuffix)}
                        ${getNavLink(basePath, 'climatisation', 'Climatisation', 'climatisation', activePage, languageSuffix)}
                        ${getNavLink(basePath, 'ventilation', 'Ventilation', 'ventilation', activePage, languageSuffix)}
                        ${getNavLink(basePath, 'plomberie', 'Plomberie', 'plomberie', activePage, languageSuffix)}
                    </nav>
                    
                    ${languageSwitcherHTML}

                    <button id="burger-button" class="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:size-4 [&amp;_svg]:shrink-0 border border-input bg-transparent shadow-sm active:bg-accent active:text-accent-foreground h-9 w-9 md:hidden" type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r0R4:" data-state="closed">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu w-6 h-6 text-foreground" aria-hidden="true"><path d="M4 5h16"></path><path d="M4 12h16"></path><path d="M4 19h16"></path></svg></button>
                </div>
            </div>
        </header>
    `;

    const headerPlaceholder = document.getElementById('header-placeholder');
    if (headerPlaceholder) {
        headerPlaceholder.innerHTML = headerHTML;
    } else {
        console.error("Element with ID 'header-placeholder' not found.");
    }
}