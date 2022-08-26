<template>
    <div>
        <div class="d-flex justify-space-between align-center py-1">
            <v-card-title>Time Slots</v-card-title>
            <v-dialog
            v-model="updateTimesFormDialog"
            persistent
            max-width="fit-content"
            >
            <template v-slot:activator="{ on, attrs }">
                <span
                @click="setDefaultTimesListAndControllCancel('setDefaultTimesList')"
                v-bind="attrs"
                v-on="on"
                class="primary--text text-capitalize">
                    <v-icon color="primary" v-if="commitTimesList.length == 0">mdi-plus-circle</v-icon>
                    <v-icon color="primary" v-else>mdi-pencil</v-icon>
                    {{(commitTimesList.length == 0)?'add':'edit'}}
                </span>
            </template>
            <v-card>
                <v-card-title>
                    <span class="text-h5">{{(commitTimesList.length == 0)?'Add':'Edit'}} Time Slots</span>
                </v-card-title>
                <v-card-text>
                <v-container>
                    <v-row
                    v-for="(item, index) in commitTimesList" :key="index"
                    >
                        <v-col
                        cols="12"
                        sm="12"
                        md="4"
                        >
                            <span class="text-capitalize">start time:{{item.startTime}}</span>
                            <vue-timepicker
                            v-model="item.startTime"
                            :minute-interval="(Number(hourlyDuration) == 1)?60:Number(hourlyDuration)"
                            input-class="rounded"
                            hour-label="hour"
                            minute-label="minute"
                            close-on-complete></vue-timepicker>
                        </v-col>

                        <v-col
                        cols="12"
                        sm="12"
                        md="4"
                        >
                            <span class="text-capitalize">end time</span>
                            <vue-timepicker
                            v-model="item.endTime"
                            :minute-interval="(Number(hourlyDuration) == 1)?60:Number(hourlyDuration)"
                            input-class="rounded"
                            hour-label="hour"
                            minute-label="minute"
                            close-on-complete></vue-timepicker>
                        </v-col>

                        <v-col
                        v-if="index>0"
                        class="d-flex align-end"
                        cols="12"
                        sm="12"
                        md="4"
                        >
                            <v-btn
                            @click="localeDeleteItem(index)"
                            dark
                            color="error"
                            >
                            <v-icon dark>
                                mdi-trash-can-outline
                            </v-icon>
                            </v-btn>
                        </v-col>
                    </v-row>
                </v-container>
                <span @click="localeAddItem()" class="primary--text text-capitalize cursor-pointer">
                    <v-icon color="primary">mdi-plus-circle-outline</v-icon>
                    add more
                </span>
                </v-card-text>
                <v-card-actions>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="setDefaultTimesListAndControllCancel('controllCancel')"
                >
                    Cancel
                </v-btn>
                <v-spacer></v-spacer>
                <v-btn
                    color="blue darken-1"
                    text
                    @click="saveTimes()"
                >
                    Save
                </v-btn>
                </v-card-actions>
            </v-card>
            </v-dialog>
        </div>
        <v-card-text v-if="commitTimesList.length > 0">
            <v-chip
            v-for="(item, index) in commitTimesList" :key="index"
            class="ma-2"
            close
             @click:close="globalDeleteItem(index)"
            >
                {{`${item.startTime} - ${item.endTime}`}}
            </v-chip>
        </v-card-text>
        <v-card-text v-else>Not Available</v-card-text>
    </div>
</template>
<script>
export default {
    name:'time-slots',
    emits:['saving','cancelSaving','deleteItem'],
    data() {
        return {
            updateTimesFormDialog: false,
            startTime:'',
            endTime:'',
            freezedTimesList:[]
        }
    },
    props:{
        timesList:{
            type: Array,
            required: true,
        },
        startingTime:{
            type: String,
            required: true
        },
        hourlyDuration:{
            type: String,
            required: true
        },
        monthlyDuration:{
            type: String,
            required: true
        },
        dayOfWeek:{
            type: String,
            required: true
        }
    },
    computed:{
        commitTimesList(){
            return this.timesList
        }
    },
    methods: {
        setDefaultTimesListAndControllCancel(onWhich){
            if(onWhich == 'setDefaultTimesList'){
                this.freezedTimesList = [];
                this.commitTimesList.forEach(element => {
                    this.freezedTimesList.push(element) 
                });
            }else{
                this.$emit('cancelSaving',this.freezedTimesList)
                this.updateTimesFormDialog = !this.updateTimesFormDialog;
            }
        },
        emptyFieldChecking(){
            let startTimeEmptyFieldCount = 0,
                endTimeEmptyFieldCount = 0
            this.commitTimesList.forEach(time => {
                if(time.startTime === '' || time.startTime.includes('m') || time.startTime.includes('H'))
                    startTimeEmptyFieldCount++;
                if(time.endTime === '' || time.endTime.includes('m') || time.endTime.includes('H'))
                    endTimeEmptyFieldCount++;
            });
            return {startTimeEmptyFieldCount,endTimeEmptyFieldCount};
        },
        saveTimes(){
            let {startTimeEmptyFieldCount,endTimeEmptyFieldCount} = this.emptyFieldChecking();
            if(startTimeEmptyFieldCount>0 || endTimeEmptyFieldCount>0){
                alert(`${startTimeEmptyFieldCount} fields of start times and ${endTimeEmptyFieldCount} fields of end times have no value or the value of hours or minutes is not specified for them.`)
            }else{
                let propsDataOnLastChange = {
                    startingTime: this.startingTime,
                    hourlyDuration: this.hourlyDuration,
                    monthlyDuration: this.monthlyDuration,
                    dayOfWeek: this.dayOfWeek
                }
                this.$emit('saving',this.commitTimesList,propsDataOnLastChange)
                this.updateTimesFormDialog = !this.updateTimesFormDialog;
            }
        },
        globalDeleteItem(index){
            let propsDataOnLastChange = {
                startingTime: this.startingTime,
                hourlyDuration: this.hourlyDuration,
                monthlyDuration: this.monthlyDuration,
                dayOfWeek: this.dayOfWeek
            }
            this.$emit('deleteItem',index,propsDataOnLastChange)
        },
        localeAddItem(){
            let newTime = { startTime:'', endTime:'' }
            this.commitTimesList.push(newTime);
        },
        localeDeleteItem(itemIndex){
            this.commitTimesList.splice(itemIndex,(itemIndex == 0) ? 1 : itemIndex)
        }
    },
}
</script>