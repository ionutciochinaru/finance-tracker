export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/supabase',
    '@nuxthq/ui'
  ],
  supabase: {
    redirect: false
  }
})
