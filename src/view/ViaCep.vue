<template>
  <div>
    <h1>Consultar CEP</h1>
    <hr>
    <form action="#" @submit.prevent="getCep">
      <label for="cep">Digite o CEP:</label>
      <input type="text" id="cep" v-model="cep">
      
      <label for="format">Escolha o formato:</label>
      <select v-model="selectedFormat" id="format">
        <option value="json">JSON</option>
        <option value="xml">XML</option>
      </select>

      <input type="submit" value="Consultar">
      
      <div>
        <p>Rua: {{ place.street }} </p>
        <p>Bairro: {{ place.neighborhood }}</p>
        <p>Cidade: {{ place.city }} / {{ place.state }}</p>
      </div>
    </form>
  </div>
</template>

<script setup>
import axios from 'axios'
import { ref } from 'vue'
import { reactive } from 'vue'

const baseUrl = 'https://viacep.com.br/ws/'
const cep = ref("");
const place = reactive({
  street: '',
  neighborhood: '',
  city: '',
  state: ''
});
const selectedFormat = ref("");

const getCep = () => {
  const format = `/${selectedFormat.value}`;
  axios.get(baseUrl + cep.value + format)
    .then((response) => {
        console.log(response);
      // Trata os diferentes formatos de resposta
      if (selectedFormat.value === 'json') {
        place.street = response.data.logradouro;
        place.neighborhood = response.data.bairro;
        place.city = response.data.localidade;
        place.state = response.data.uf;
      } else if (selectedFormat.value === 'xml') {
        // Lógica para processar XML, você pode usar bibliotecas como xml2js
        // Exemplo simplificado:
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(response.data, 'text/xml');
        place.street = xmlDoc.getElementsByTagName('logradouro')[0].textContent;
        place.neighborhood = xmlDoc.getElementsByTagName('bairro')[0].textContent;
        place.city = xmlDoc.getElementsByTagName('localidade')[0].textContent;
        place.state = xmlDoc.getElementsByTagName('uf')[0].textContent;
      }
    })
    .catch((error) => {
      console.error('Eita.. deu erro!', error)
    });
}
</script>

<style scoped>
/* Adicione estilos conforme necessário */
</style>
