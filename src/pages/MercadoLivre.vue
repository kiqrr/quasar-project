<template>
  <q-page class="">
    <header>
      <div class="full-width" style="height: 100px; background-color: #ffe600">
        <div class="row flex-center">
          <div class="q-mr-sm">
            <q-img
              src="src/assets/LOGOML.png"
              spinner-color="white"
              style="height: 34px; width: 134px"
            />
            <div class="">Informe seu CEP</div>
          </div>
          <div class="q-mx-xl">
            <q-input
              filled
              dense
              bg-color="white"
              placeholder="Buscar produtos, marcas e muito mais..."
              color=""
              v-model="text"
              :readonly="readonly"
              :disable="disable"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
            <div class="" style="font-family: Arial, Helvetica, sans-serif">
              <q-btn no-caps flat style="color: #000" label="Categorias" />
              <q-btn no-caps flat style="color: #000" label="Ofertas" />
              <q-btn no-caps flat style="color: #000" label="Histórico" />
              <q-btn no-caps flat style="color: #000" label="Supermercado" />
              <q-btn no-caps flat style="color: #000" label="Moda" />
              <q-btn no-caps flat style="color: #000" label="Mercado Play" />
              <q-btn no-caps flat style="color: #000" label="Vender" />
              <q-btn no-caps flat style="color: #000" label="Contato" />
            </div>
          </div>
          <div class="q-mt-md">
            <q-img
              src="src/assets/D_NQ_904735-MLA77640197882_072024-OO.webp"
              spinner-color="white"
              style="width: 120%"
            />
            <q-btn no-caps flat style="color: #000" label="Crie a sua conta" />
            <q-btn no-caps flat style="color: #000" label="Entre" />
            <q-btn no-caps flat style="color: #000" label="Compras" />
          </div>
        </div>
      </div>
      <div class="">
        <q-carousel
          animated
          v-model="slide"
          navigation
          infinite
          :autoplay="autoplay"
          arrows
          transition-prev="slide-right"
          transition-next="slide-left"
          @mouseenter="autoplay = false"
          @mouseleave="autoplay = true"
        >
          <q-carousel-slide
            :name="1"
            img-src="src/assets/D_NQ_622798-MLA77604593766_072024-OO.webp"
          />
          <q-carousel-slide
            :name="2"
            img-src="src/assets/D_NQ_645230-MLA78093899919_072024-OO.webp"
          />
          <q-carousel-slide
            :name="3"
            img-src="src/assets/D_NQ_702067-MLA77736931090_072024-OO.webp"
          />
        </q-carousel>
      </div>
    </header>
  </q-page>
</template>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      slide: ref(1),
      autoplay: ref(true),
    };
  },
};
</script>
