function getNavLink(basePath, href, text, pageName, activePage) {
    
    const cleanPageName = pageName.toLowerCase().trim();
    const cleanActivePage = activePage.toLowerCase().trim();

    const activeClass = (cleanPageName === cleanActivePage) 
        ? 'bg-primary text-primary-foreground'
        : 'text-foreground hover:bg-muted';
    
    return `
        <a href="${basePath}${href}" class="px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeClass}" data-source-file="src/components/common/Header.tsx" data-source-line-start="63" data-source-line-end="75">${text}</a>
    `;
}

function loadHeader(currentPagePath, activePage) {
    
    let basePath = currentPagePath;
    if (basePath === './') {
        basePath = '';
    } else if (basePath.slice(-1) !== '/') {
        basePath += '/';
    }

    const headerHTML = `
        <header class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background backdrop-blur-sm border-b border-border shadow-sm" data-source-file="src/components/common/Header.tsx" data-source-line-start="39" data-source-line-end="122">
            <div class="container-custom" data-source-file="src/components/common/Header.tsx" data-source-line-start="46" data-source-line-end="121">
                <div class="flex items-center justify-between h-16 md:h-20" data-source-file="src/components/common/Header.tsx" data-source-line-start="47" data-source-line-end="120">
                    
                    <a href="${basePath}index.html" class="flex items-center space-x-2 group">
                        <span class="text-xl font-bold" data-source-file="src/components/common/Footer.tsx" data-source-line-start="80" data-source-line-end="80">Paca Dépanne</span>
                    </a>
                    
                    <nav class="hidden md:flex items-center space-x-1">
                        
                        ${getNavLink(basePath, 'index.html', 'Accueil', 'accueil', activePage)}
                        ${getNavLink(basePath, 'climatisation/', 'Climatisation', 'climatisation', activePage)}
                        ${getNavLink(basePath, 'ventilation/', 'Ventilation', 'ventilation', activePage)}
                        ${getNavLink(basePath, 'plomberie/', 'Plomberie', 'plomberie', activePage)}

                    </nav>
                    <div class="hidden md:block"></div>
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