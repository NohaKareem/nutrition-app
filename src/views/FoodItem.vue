<template>
    <div class="container">
        <!-- <searchMenu />  -->
        <h1>{{ foodItem.description }}</h1>
        <table>
            <!-- thead~ -->
            <thead>
                <tr>
                    <td></td>
                    <th>(g)</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th>fat</th>
                    <td> {{ macros.fat.value }} {{ macros.fat.unit }}</td>
                </tr>
                <tr>
                    <th>protein</th>
                    <td> {{ macros.protein.value }} {{ macros.protein.unit }} </td>
                </tr>
                <tr>
                    <th>carb</th>
                    <td> {{ macros.carb.value }} {{ macros.carb.unit }}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
    // import Tag from "@/components/Tag.vue";
    import axios from 'axios';
    import db_config from '@/db_config.js';
    // import SearchMenu from "@/components/SearchMenu.vue";
    
    export default {
        name: "FoodItem",
        // components: { 'searchMenu': SearchMenu },
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
    $desktopWidth: 768px;   
    $leftMargin: 15vw;    
    $baseMargin:  10px; 
    $black: #271D1D;

    .container {
        margin: 20px auto;
        margin-left: $leftMargin;
        max-width: 75vw;
    }
    h1 {
        font-size: 3.25vh;
        margin-bottom: $baseMargin;
    }
    td {
        padding-top: $baseMargin / 2;
        padding-left: $baseMargin / 2;
        text-align: left;
    }
    thead {
        th {
            border-right: none;
            border-bottom: 2px solid $black; // ~mixin
            text-align: left;
            padding-bottom: $baseMargin / 2;
            padding-right: $baseMargin;
        }
    }
    th {
            font-weight: bold;
            text-align: right;
            padding-right: $baseMargin / 2;
            border-right: 2px solid $black;
    }
    li {
        list-style-type: square;
    }

    @media screen and (min-width: $desktopWidth) {
        h1 {
            font-size: 6vh;
        } 
    }
</style>
