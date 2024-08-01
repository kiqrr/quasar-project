<template>
  <q-page class="">
    <header>
      <nav
        class="full-width q-px-xl bg-yellow"
        style="height: 100px; padding-left: 10%"
      >
        <div class="row">
          <div class="q-mr-xl">
            <q-img
              src="src/assets/LOGOML.png"
              spinner-color="white"
              style="height: 34px; width: 134px"
            />
            <div>Informe seu CEP</div>
          </div>
          <div class="q-mr-xl">
            <div>SEARCH INPUT</div>
            <div>
              Categorias Ofertas Histórico Supermercado Moda Mercado PlayGRÁTIS
              Vender Contato
            </div>
          </div>
          <div class="">
            <div>Assinatura</div>
            <div>Crie a sua conta / Entre / Compras</div>
          </div>
        </div>
      </nav>
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
