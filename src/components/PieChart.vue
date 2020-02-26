<template>
    <div class="pieChart" :style="dynamicChart">
    {{dynamicChart}}
    </div>

</template>

<script>
    export default {
        name: "PieChart", 
        props: ['chartData'], 
        computed: {
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
