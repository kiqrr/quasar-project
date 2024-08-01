<template>
  <q-page class="" style="background-color: #ebebeb">
    <header>
      <div class="full-width" style="height: 100px; background-color: #ffe600">
        <div class="row flex-center">
          <div class="q-mr-sm">
            <q-img
              src="src/assets/LOGOML.png"
              spinner-color="white"
              style="height: 34px; width: 134px"
            />
            <q-btn
              label="Informe seu CEP"
              no-caps
              flat
              style="color: #000"
              @click="prompt = true"
            />
            <q-dialog v-model="prompt" persistent>
              <q-card style="min-width: 650px">
                <q-space />
                <q-btn icon="close" flat round dense v-close-popup />
                <q-card-section>
                  <div class="text-h6">
                    Selecione onde quer receber suas compras
                  </div>
                  <div class="text-h7">
                    Você poderá ver custos e prazos de entrega precisos em tudo
                    que procurar.
                  </div>
                </q-card-section>

                <q-card-section class="q-pt-none">
                  <q-input
                    dense
                    v-model="address"
                    autofocus
                    @keyup.enter="prompt = false"
                  />
                </q-card-section>

                <q-card-actions align="right" class="text-primary">
                  <q-btn flat label="Cancel" v-close-popup />
                  <q-btn flat label="Add address" v-close-popup />
                </q-card-actions>
              </q-card>
            </q-dialog>
          </div>
          <div class="q-mx-xl">
            <q-input
              outlined
              dense
              bg-color="white"
              placeholder="Buscar produtos, marcas e muito mais..."
              color="grey"
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
          <div
            class="q-mt-md"
            style="font-family: Arial, Helvetica, sans-serif"
          >
            <q-img
              src="src/assets/D_NQ_904735-MLA77640197882_072024-OO.webp"
              spinner-color="white"
              style="width: 120%"
            />
            <q-btn no-caps flat style="color: #000" label="Crie a sua conta" />
            <q-btn no-caps flat style="color: #000" label="Entre" />
            <q-btn no-caps flat style="color: #000" label="Compras" />
            <q-btn flat round color="black" icon="local_grocery_store" />
          </div>
        </div>
      </div>
      <div class="" style="">
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
          class="carousel-gradient"
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

<style scoped>
.carousel-gradient::after {
  content: "";
  position: absolute;
  top: 70%;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(180deg, transparent, #ebebeb);
  pointer-events: none;
  z-index: 1;
}
</style>

<script>
import { ref } from "vue";

export default {
  setup() {
    return {
      slide: ref(1),
      autoplay: ref(true),
      alert: ref(false),
      confirm: ref(false),
      prompt: ref(false),

      address: ref(""),
    };
  },
};
</script>
