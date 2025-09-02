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
        daycareMapViewSidebarHide: resolve(__dirname, 'daycare-map-view-sidebar-hide.html'),
        login: resolve(__dirname, 'login.html'),
        login_error: resolve(__dirname, 'login-register/login-error.html'),
        restore_password: resolve(__dirname, 'login-register/restore-password.html'),
        verification_code: resolve(__dirname, 'login-register/verification-code.html'),
        verification_code_error: resolve(__dirname, 'login-register/verification-code-error.html'),
        confirm_email: resolve(__dirname, 'login-register/confirm-email.html'),
        invitation_code: resolve(__dirname, 'login-register/invitation-code.html'),
        signup_daycare: resolve(__dirname, 'login-register/signup-daycare.html'),
        account_information: resolve(__dirname, 'login-register/account-information.html'),
        add_photo_daycare: resolve(__dirname, 'login-register/add-photo-daycare.html'),
        about_daycare: resolve(__dirname, 'login-register/about-daycare.html')
      },
    },
    // Ensure CSS is processed and extracted
    cssCodeSplit: false,
  },

  // Configure serving of static files during development
  server: {
    open: true,
    watch: {
      include: ['src/**/*.css', '*.html', 'login-register/**/*.html'],
    },
  },

  // Configure asset handling
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
});
