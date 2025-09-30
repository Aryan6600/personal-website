document.addEventListener('DOMContentLoaded', () => {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.getElementById('toggle-sidebar-btn');
    const closeBtn = document.getElementById('close-sidebar-btn');

    // Function to open the sidebar
    const openSidebar = () => {
        sidebar.classList.add('open');
    };

    // Function to close the sidebar
    const closeSidebar = () => {
        sidebar.classList.remove('open');
    };

    // 1. Mobile Hamburger Button (in Navbar)
    if (toggleBtn) {
        toggleBtn.addEventListener('click', openSidebar);
    }

    // 2. Close Button (inside Sidebar)
    if (closeBtn) {
        closeBtn.addEventListener('click', closeSidebar);
    }

    // 3. Optional: Auto-close sidebar on item click (useful for navigation)
    const sidebarLinks = sidebar.querySelectorAll('a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Only attempt to close if the sidebar is fixed/mobile-style
            if (window.innerWidth <= 768) {
                closeSidebar();
            }
        });
    });
});