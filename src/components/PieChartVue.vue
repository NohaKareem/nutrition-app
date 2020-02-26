<template>
    <div>
        {{flatData}}
        <d3Pie 
        :data="flatData"
        :options="d3Options"
        width="100%"
        height="300px"
        ></d3Pie>
    </div>

</template>

<script>
    import { Pie } from 'vue-chartjs';
    // this.use(Vs);
    import { d3Pie } from 'd3-vs';

    export default {
        extends: Pie,
        name: "PieChartVue", 
        data() {
            return {
                d3Options: {
                    
                }
            }
        },
        components: { 'd3Pie':d3Pie },
        props: ['chartData'],

        mounted() {
            this.renderChart([this.chartData.fat.value, this.chartData.protein.value, this.chartData.carb.value ], null);        } ,
        computed: {
            flatData: function () {
              return [this.chartData.fat.value, this.chartData.protein.value, this.chartData.carb.value];  
            },
            dynamicChart: function() {
                let gradientSum = 0;
                return { 
                    'background': 'conic-gradient(' 
                        + `${ this.chartData.fat.color } 0 ${ gradientSum += this.chartData.fat.value }%, ` 
                        + `${ this.chartData.protein.color } 0 ${ gradientSum += this.chartData.protein.value }%, ` 
                        + `${ this.chartData.carb.color } 0 ${ gradientSum += this.chartData.carb.value }%`
                        + ')'
                    // 'background-color': 'red'
                };
                // pieCSS = this.chartData.map(

                    // pieSlice => `${ pieSlice.color }`
                // );
            }
        }
    };
</script>

<style scoped lang="scss">
   .pieChart {
       width: 200px;
       height: 200px;
       border-radius: 100%;
    }
</style>
