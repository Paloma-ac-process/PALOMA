<template>
    <header class="page-header section-height-60 bg-gradient-secondary">
      <div class="container py-7 text-center">
        <h2 class="text-white mb-0">Domaines de compétence</h2>
      </div>
    </header>
  
    <section class="py-8">
      <div class="container">
        <!-- onglets Bootstrap -->
        <ul class="nav nav-pills nav-fill mb-4" id="pills-tab" role="tablist">
          <li class="nav-item" v-for="(tab,i) in tabs" :key="i" role="presentation">
            <button class="nav-link" :class="{active:i===0}" data-bs-toggle="pill"
                    :data-bs-target="'#tab'+i" type="button">{{ tab.title }}</button>
          </li>
        </ul>
  
        <div class="tab-content">
          <div v-for="(tab,i) in tabs" :key="i" class="tab-pane fade"
               :class="{'show active':i===0}" :id="'tab'+i">
            <p class="lead">{{ tab.content }}</p>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  const tabs = [
    {
      title: 'Énergie & Environnement',
      content:
        "Optimisation des chaudières vapeur / électricité, incinération, pyrolyse, gazéification, énergies renouvelables." },
    {
      title: 'Fabrication de matériaux',
      content:
        "Procédés haute température pour la fonte, l’aluminium, les céramiques et verres : performance des réfractaires." },
    {
      title: 'Industrie chimique',
      content:
        "Résistance corrosive, tenue thermique et maintien des rendements pour équipements de l’industrie chimique." },
  ]
  </script>
  