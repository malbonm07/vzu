<template>
  <div>
    <drop v-if="test.isAvailable" class="ones" @drop="onTestDrop">
        <span v-if="oneDropped">drop</span>
    </drop>
    <drag v-else @dragstart="prueba(test)" @cut="remove(n)" class="drag">
        <img :src="test.image" :alt="test.alt">
    </drag>
  </div>
</template>

<script>
export default {
    name: 'AppCustomDraggable',
    props: [
    ],
    data() {
        return {
            isAvailable: true,
            pairMatch: 2,
            currentData: {
                image: '',
                id: null,
                alt: ''
            }
        }
    },
    methods: {
        
    }
}
</script>

<style>

</style>