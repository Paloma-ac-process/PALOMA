<template>
    <header class="page-header section-height-60 bg-gradient-primary">
      <div class="container py-7 text-center">
        <h2 class="text-white mb-0">Contact</h2>
      </div>
    </header>
  
    <section class="py-8">
      <div class="container">
        <div class="row">
          <!-- infos -->
          <div class="col-md-5 mb-5">
            <h5 class="mb-3">A&C Process</h5>
            <p class="mb-1"><i class="ni ni-email-83 me-2"></i>contact@ac-process.com</p>
            <p class="mb-1"><i class="ni ni-mobile-button me-2"></i>+33 6 24 48 95 89</p>
            <p class="mb-1"><i class="ni ni-watch-time me-2"></i>Lun-Ven : 8 h – 20 h</p>
          </div>
  
          <!-- formulaire -->
          <div class="col-md-7">
            <form class="row g-3">
              <div class="col-md-6">
                <MaterialInput id="name" type="text" label="Nom" />
              </div>
              <div class="col-md-6">
                <MaterialInput id="email" type="email" label="Email" />
              </div>
              <div class="col-12">
                <MaterialTextArea id="message" label="Message" rows=4 />
              </div>
              <div class="col-12 text-end">
                <MaterialButton color="primary" type="submit">Envoyer</MaterialButton>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import MaterialInput from '@/components/MaterialInput.vue'
  import MaterialTextArea from '@/components/MaterialTextArea.vue'
  import MaterialButton from '@/components/MaterialButton.vue'
  </script>
  