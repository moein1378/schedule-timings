<template>
<div>
    <v-simple-table
    fixed-header
    :dark="false"
    height="300px"
    >
    <template v-slot:default>
        <thead>
        <tr>
            <th
            v-for="(item, index) in tableHeaderItems" :key="index"
            class="text-left text-capitalize">
            {{item}}
            </th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(item, index) in periodicTimes" :key="index" class="text-capitalize">
            <td>{{item.dayKey}}</td>
            <td>{{item.monthlyDuarationKey | monthlyDurationStyle()}}</td>
            <td>{{item.hourlyDuarationKey | hourlyDurationStyle()}}</td>
            <td :class="(item.isLocked)?'error--text':'success--text'">{{(item.isLocked)?'locked':'active'}}</td>
            <td>{{item.startingDateKey}}</td>
            <td>{{ item.startingDateKey|calculateEndDate(item.monthlyDuarationKey) }}</td>
            <td>
                <v-btn
                dark
                color="error"
                @click="deleteItem(item)"
                :disabled="item.isLocked"
                >
                <v-icon dark>
                    mdi-trash-can-outline
                </v-icon>
                </v-btn>
            </td>
        </tr>
        </tbody>
    </template>
    </v-simple-table>

    <v-dialog
    v-model="deletingDialog"
    persistent
    max-width="60%"
    >
    <v-card>
        <v-card-title class="d-flex flex-column justify-center">
            <v-icon color="warning" x-large>mdi-alert-circle</v-icon>
            <h5>Are you sure you want to delete the item with the following specifications?</h5>
        </v-card-title>
        <v-card-text class="text-capitalize text-center">
            day:{{itemToDelete.dayKey}} - monthly duaration:{{itemToDelete.monthlyDuarationKey}} - 
            hourly duaration:{{itemToDelete.hourlyDuarationKey}} - starting date:{{itemToDelete.startingDateKey}}
        </v-card-text>
        <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
            color="red darken-2"
            class="text-capitalize"
            text
            @click="cancelDeleting()"
        >
            cancel
        </v-btn>
        <v-btn
            color="green darken-2"
            class="text-capitalize"
            text
            @click="sureToDeleteItem()"
        >
            yes i'm sure
        </v-btn>
        </v-card-actions>
    </v-card>
    </v-dialog>
</div>
</template>
<script>
export default {
    name:'periodic-time-table',
    emits:['deleteItem'],
    data() {
        return {
            deletingDialog:false,
            itemToDelete:{},
            tableHeaderItems:['day of week','monthly duration','hourly duration','status','start date','end date','actions'],
        }
    },
    props:{
        periodicTimes:{
            type: Array,
            required: true,
        }
    },
    methods:{
        cancelDeleting(){
            this.deletingDialog = !this.deletingDialog;
            this.itemToDelete = {};
        },
        deleteItem(item){
            this.deletingDialog = !this.deletingDialog;
            this.itemToDelete = item;
        },
        sureToDeleteItem(){
            this.deletingDialog = !this.deletingDialog;
            this.$emit('deleteItem',this.itemToDelete)
        }
    },
    filters:{
        monthlyDurationStyle(val){
            if(val == '1'){return `${val} month`}else{return `${val} months`}
        },
        hourlyDurationStyle(val){
            if(val == '1'){return `${val} hour`}else{return `${val} mins`}
        },
        calculateEndDate(val,howManyMonthLater){
            let dt = new Date(val);
            dt.setMonth( dt.getMonth() + Number(howManyMonthLater) );
            dt = dt.toISOString().substr(0, 10);
            return dt;
        }
    },
}
</script>
<style scoped>
>>> .theme--dark.v-btn.v-btn--disabled.v-btn--has-bg{
    background-color: #ff5252 !important;
    border-color: #ff5252 !important;
    filter: opacity(0.5);
}
</style>