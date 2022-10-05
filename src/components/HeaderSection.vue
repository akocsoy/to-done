<template>
    <div class="header-main">
        <h1 id="title" @click="titleHandler"><p>T</p><p>O</p><p>-</p><p>D</p><p>O</p><p>N</p><p>E</p></h1>
    </div>
</template>

<script>
import animate from "../Services.js"
export default {
    data(){
        return{
            
        }
    },
    methods:{
        titleHandler(){
            if(this.$store.getters.getFlag){
                animate()
                this.$store.commit("changeFlag")
            }
            else{
                this.$store.commit("changeFlag")
            }

        }
    }
}
</script>

<style>
    #title{
        display: flex;
    }
    .header-main{
        display: flex;
        justify-content: center;
        align-items: center;
    }
</style>