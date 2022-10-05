<template>
  <HeaderSection></HeaderSection>
  <InputField></InputField>
  <ToastMessage/>
</template>

<script>
import HeaderSection from './components/HeaderSection.vue';
import InputField from './components/InputField.vue';
export default {
  name: 'App',
  components: {
    HeaderSection,
    InputField
}
}
</script>

<style>
#app {
  font-family:"Silkscreen";
  
  font-style: normal;
  text-align: center;
  color: #2c3e50;
}
@font-face {
  font-family: "Silkscreen";
  src: url("Silkscreen-Regular.ttf");
}
</style>
