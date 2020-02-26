<template>
    <div class="container">
        <h1>{{ foodItem.description }}</h1>
        <p>{{ foodCategory }}</p>
        <div class="nutrientsCon">
            <div class="nutrientCon pieChart">
                <pie-chart :data="[['Fat', macrosAndMicros.macros.fat.value], 
                    ['Protein', macrosAndMicros.macros.protein.value], 
                    ['Carb', macrosAndMicros.macros.carb.value]]"
                    :colors="['#e14f4c', '#ae201d','#d19a17' ]"></pie-chart>
            </div>
            <div class="nutrientCon vitamins">
                <table>
                    <tbody>
                        <tr>
                            <th class="nutrients">Vitamins</th>
                            <td></td>
                        </tr>
                        <tr v-for="nutrient in macrosAndMicros.micros.vitamins" :key="nutrient.name">
                            <th>{{ nutrient.name }}</th>
                            <td>{{ nutrient.value }} {{ nutrient.unit }} </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import db_config from '@/db_config.js';
    
    export default {
        name: "FoodItem",
        data() {
            return {
                foodItem: {}
            }
        },
        created: function () {
            this.findItem();
        }, 
        computed: {
            macrosAndMicros: function () {
               let macrosAndMicros = {
                    macros: {
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
                    }, 
                    micros: {
                        vitamins: []
                    }
                };
                this.foodItem.foodNutrients.forEach((nutrient) => {
                    if((nutrient.nutrient.name).includes('Vitamin') 
                        && nutrient.nutrient.name !== "Vitamins and Other Components") {
                        macrosAndMicros.micros.vitamins.push({
                            name: nutrient.nutrient.name, 
                            value: nutrient.amount, 
                            unit: nutrient.nutrient.unitName
                        });
                    } else {
                        switch(nutrient.nutrient.name) { 
                            case "Total lipid (fat)":
                                macrosAndMicros.macros.fat.value = nutrient.amount;   
                                macrosAndMicros.macros.fat.unit = nutrient.nutrient.unitName;   
                                break;
                            case "Protein": 
                                macrosAndMicros.macros.protein.value = nutrient.amount;   
                                macrosAndMicros.macros.protein.unit = nutrient.nutrient.unitName;
                                break;
                            case "Carbohydrate, by difference":
                                macrosAndMicros.macros.carb.value = nutrient.amount;        
                                macrosAndMicros.macros.carb.unit = nutrient.nutrient.unitName;
                                break;
                            }
                        }
                    });
                return macrosAndMicros;  
            },
            /**
             * Category property title varies per food type. 
             * This method finds properties with substring "category" and sets foodCategory accordingly. 
             * Test cases (description -> category, category type):
             *  357068 (Cheese -> Cheese, brandedFoodCategory)
             *  342643 (Celery Juice -> Vegetable juice, wweiaFoodCategoryCategory)    
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
    $baseMargin:  10px; 
    $black: #271D1D;

    .container {
        margin: 20px auto;
        width: 75vw;
        padding: 2vw;
        max-width: 100vw;
    }
    h1 {
        font-size: 3.25vh;
        margin-bottom: $baseMargin;
        font-weight: bold;
    }
    .micros {
        font-size: 3vh;
        text-align: right;
    }
    td {
        padding-top: $baseMargin / 2;
        padding-left: $baseMargin / 2;
        text-align: left;
    }
    thead {
        th {
            border-right: none;
            border-bottom: 2px solid $black; 
            text-align: left;
            padding-bottom: $baseMargin / 2;
        }
    }
    th {
        font-weight: bold;
        text-align: right;
        padding-right: $baseMargin / 2;
        border-right: 2px solid $black;
    }
    .nutrientsCon {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        
        justify-content: center;
        align-items: center;

        .nutrientCon.vitamins {
            margin-top: 30px;    
        }
    }
    @media screen and (min-width: $desktopWidth) {
        h1 {
            font-size: 6vh;
        } 
        .micros {
            font-size: 4vh;
        }
    }
</style>
