<template>
    <v-card-text class="py-0">
        <v-row class="justify-space-between align-center">
            <!-- hourly duration begin-->
            <v-col
            cols="12"
            sm="12"
            md="4"
            >
                <v-select
                v-model="currentHourlyDuration"
                :items="hourlyDuration"
                item-text="text"
                item-value="value"
                @change="timeBarChanging('hour',currentHourlyDuration)"
                label="Hourly Slot Duration"
                dense
                outlined
                ></v-select>
            </v-col>
            <!-- hourly duration end-->

            <!-- monthly duration begin-->
            <v-col
            cols="12"
            sm="12"
            md="4"
            >
                <v-select
                v-model="currentMonthlyDuration"
                :items="monthlyDuration"
                item-text="text"
                item-value="value"
                @change="timeBarChanging('month',currentMonthlyDuration)"
                label="Monthly Slot Duration"
                dense
                outlined
                ></v-select>
            </v-col>
            <!-- monthly duration end-->

            <!--set starting date begin-->
            <v-col
            cols="12"
            sm="12"
            md="4"
            >
                <v-menu
                        ref="menu"
                        v-model="menu"
                        :close-on-content-click="false"
                        :return-value.sync="startingDate"
                        transition="scale-transition"
                        offset-y
                        min-width="auto"
                    >
                        <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            v-model="startingDate"
                            label="Starting Date"
                            readonly
                            dense
                            outlined
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                        </template>
                        <v-date-picker
                        v-model="startingDate"
                        no-title
                        scrollable
                        >
                            <v-spacer></v-spacer>
                            <v-btn
                                text
                                color="primary"
                                @click="menu = false"
                            >
                                Cancel
                            </v-btn>
                            <v-btn
                                text
                                color="primary"
                                @click="$refs.menu.save(startingDate);timeBarChanging('date',startingDate)"
                            >
                                OK
                            </v-btn>
                        </v-date-picker>
                </v-menu>
            </v-col>
            <!--set starting date end-->
        </v-row>
    </v-card-text>
</template>
<script>
export default {
    name:'setting-time-bar',
    emits:['timeBarChanging'],
    data() {
        return {
            currentHourlyDuration: {text:'15 mins', value: '15'},
            currentMonthlyDuration: {text: '1 month', value: '1'},
            hourlyDuration:[
                {text:'15 mins', value: '15'},
                {text:'30 mins', value: '30'},
                {text:'45 mins', value: '45'},
                {text:'1 hour', value: '1'},
            ],
            monthlyDuration:[
                {text: '1 month', value: '1'},
                {text: '2 months', value: '2'},
                {text: '3 month', value: '3'},
            ],
            menu: false,
            startingDate:(new Date(Date.now())).toISOString().substr(0, 10)
        }
    },
    methods:{
        timeBarChanging(whichItem,value){
            this.$emit('timeBarChanging',whichItem,value)
        },
    },
}
</script>