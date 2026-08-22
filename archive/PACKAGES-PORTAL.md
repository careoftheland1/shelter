# Packages portal archive

The project portal section was removed from the live packages page on 2026-08-21.

Its complete React markup and copy are preserved in `PackagesPortalSection.jsx`. The existing `.portal`, `.portal-window`, `.portal-top`, `.portal-body`, `.portal-content`, `.progress`, and `.portal-points` rules remain dormant in `src/index.css`, including their mobile variants.

To restore it:

1. Move `PackagesPortalSection.jsx` into `src/`.
2. Import it in `PackagesPage.jsx`.
3. Render `<PackagesPortalSection />` between the package list and package guide.

