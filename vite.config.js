// vite.config.js
import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  // Preserve the public folder structure
  publicDir: 'public',

  // Configure build output to match existing structure
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        pricing: resolve(__dirname, 'pricing.html'),
        faq: resolve(__dirname, 'faq.html'),
        contact: resolve(__dirname, 'contact.html'),
        howItWorks: resolve(__dirname, 'how-it-works.html'),
        thankYou: resolve(__dirname, 'thank-you.html'),
        termsDaycare: resolve(__dirname, 'terms-daycare.html'),
        termsParents: resolve(__dirname, 'terms-parents.html'),
        about: resolve(__dirname, 'about.html'),
        notFound: resolve(__dirname, '404.html'),
        daycareListView: resolve(__dirname, 'daycare-list-view.html'),
        daycareMapView: resolve(__dirname, 'daycare-map-view.html'),
        daycareMapViewSidebarHide: resolve(__dirname, 'daycare-map-view-sidebar-hide.html')
      },
    },
    // Ensure CSS is processed and extracted
    cssCodeSplit: false,
  },

  // Configure serving of static files during development
  server: {
    open: true,
    watch: {
      include: ['src/**/*.css', '*.html'],
    },
  },

  // Configure asset handling
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
