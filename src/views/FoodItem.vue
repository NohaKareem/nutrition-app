<template>
    <div class="container">
        <searchMenu /> 
        <h1>{{ foodItem.description }}</h1>
        <p>fat: {{ macros.fat.value }} {{ macros.fat.unit }}</p>
        <p>protein: {{ macros.protein.value }} {{ macros.protein.unit }}</p>
        <p>carb: {{ macros.carb.value }} {{ macros.carb.unit }}</p>
        <p>category: {{ foodCategory }}</p>
    </div>
</template>

<script>
    // import Tag from "@/components/Tag.vue";
    import axios from 'axios';
    import db_config from '@/db_config.js';
    import SearchMenu from "@/components/SearchMenu.vue";
    
    export default {
        name: "FoodItem",
        components: { 'searchMenu': SearchMenu },
        data() {
            return {
                foodItem: {},
            }
        },
        created: function () {
            this.findItem();
        }, 
        computed: { //~method
        //    micros: function() {
        //        console.log('in micros')
        //         let keys = Object.keys(this.foodItem);
        //         let micros = "";
        //         keys.forEach((key) => {
        //             if(key.includes("nutrient") || key.includes("Nutrient")) {
        //                 // let keyStr = key.toString();
        //                 console.log(this.foodItem.foodNutrients)
        //                 micros = ""; //~
        //             }
        //         });
        //         return micros;
        //    }, 
           macros: function() {
            let macros = {
                fat: {
                    value: 0, 
                    unit: ""
                }, 
                protein: {
                    value: 0, 
                    unit: ""
                }, 
                carb: {
                    value: 0, 
                    unit: ""
                }
            };
            this.foodItem.foodNutrients.forEach((nutrient) => {
                switch(nutrient.nutrient.name) { 
                    case "Total lipid (fat)":
                        macros.fat.value = nutrient.amount;   
                        macros.fat.unit = nutrient.nutrient.unitName;   
                        break;
                    case "Protein": 
                        macros.protein.value = nutrient.amount;   
                        macros.protein.unit = nutrient.nutrient.unitName;
                        break;
                    case "Carbohydrate, by difference":
                        macros.carb.value = nutrient.amount;        
                        macros.carb.unit = nutrient.nutrient.unitName;
                        break;
                    }
                });
            return macros;
           }, 
            /**
             * Category property title varies per food type. 
             * This method finds properties with substring "category" and sets foodCategory accordingly. 
             * Test cases (description -> category, category type):
             *  357068 (Cheese -> Cheese, brandedFoodCategory)
             *  342643 (Celery Juice -> Vegetable juice, wweiaFoodCategoryCategory)    
             *  ~169741 (oat flour, partially debranded -> Cereal Grains and Pasta, foodCategory.description)
             */
           foodCategory: function () {
                let keys = Object.keys(this.foodItem);
                let foodCategory = "";
                keys.forEach((key) => {
                    if(key.includes("Category")) {
                        let keyStr = key.toString();
                        
                        // foods with wweiaFoodCategoryCategory have a nested property (wweiaFoodCategoryCategoryDescription) where it includes the category name   
                        foodCategory = 
                               this.foodItem.foodCategory != undefined 
                                ? this.foodItem.foodCategory
                                : (this.foodItem.brandedFoodCategory != undefined 
                                    ? this.foodItem.brandedFoodCategory 
                                    : (this.foodItem[keyStr]["description"] != undefined
                                        ? this.foodItem[keyStr]["description"]
                                        : this.foodItem[keyStr][keyStr + "Description"])); //~
                    }
                });
                return foodCategory;
           }
        },
        methods: {
            findItem: function() {
                var self = this;
                let fdcId = this.$route.params.id;
                axios.get(`https://api.nal.usda.gov/fdc/v1/${fdcId}?${db_config.API_KEY}`)
                    .then((response) => {
                        self.foodItem = response.data;
                        
                        // food category attribute title varies 
                        self.foodCategory = self.foodItem.foodCategory === undefined ? self.foodItem.brandedFoodCategory : self.foodItem.foodCategory;
                        // console.log(self.getCategoryKey());
                        // self.parseMacros(self);
                    })
                    .catch((err) => {
                        console.error(err);
                });
            }
        }
    };
</script>

<style scoped lang="scss">
    li {
        list-style-type: square;
    }
</style>
