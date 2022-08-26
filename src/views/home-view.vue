<template>
  <v-container>
    <v-card-title>Schedule Timings</v-card-title>
    <SettingTimeBar
    @timeBarChanging="timeBarChanging"
    >
    </SettingTimeBar>

    <v-card
      class="mx-auto pa-5"
      outlined
    >
      <!--days of week begin-->
      <v-tabs
        v-model="currentDay"
        color="#ff4877"
        grow
      >
        <v-tab
          v-for="(value,name,index) in daysOfWeekTab"
          class="rounded"
          :key="index"
          @change="timeBarChanging('day',name)"
        >
          {{ name }}
        </v-tab>
      </v-tabs>
      <!--days of week end-->

      <!--selected times in each day of week begin-->
      <v-tabs-items v-model="currentDay">
        <v-tab-item
          v-for="(value,name,index) in daysOfWeekTab"
          :key="index"
        >
          <v-card
            flat
          >
              <TimeSlots
              :hourlyDuration="hourlyDuration"
              :monthlyDuration="monthlyDuration"
              :startingTime="startingDate"
              :dayOfWeek="name"
              :timesList="timesListAsProp"
              @saving="saving"
              @cancelSaving="cancelSaving"
              @deleteItem="deleteItemOnChip"
              ></TimeSlots>
          </v-card>
        </v-tab-item>
      </v-tabs-items>
      <!--selected times in each day of week end-->

      <!--periodic time table begin-->
      <PeriodicTimeTable
      :periodicTimes="dataOfTable"
      @deleteItem="deleteItemOnTable">
      </PeriodicTimeTable>
      <!--periodic time table end-->
    </v-card>
  </v-container>
</template>

<script>
import SettingTimeBar from '@/components/setting-time-bar.vue'
import TimeSlots from '@/components/time-slots.vue'
import PeriodicTimeTable from '@/components/periodic-time-table.vue'
export default {
  name: 'home-view',
  components:{
    SettingTimeBar,
    TimeSlots,
    PeriodicTimeTable
  },
  data() {
    return {
        currentDay: 0,
        hourlyDuration: '15',
        monthlyDuration: '1',
        startingDate: (new Date(Date.now())).toISOString().substr(0, 10),
        timesListAsProp:[],
        dataOfTable:[],
        daysOfWeekTab: {
            'Sunday':{
                '1':{
                    '15':{
                      '2022-08-24':[
                        { startTime:'15:45', endTime:'16:00' },
                        { startTime:'10:30', endTime:'10:45' },
                        { startTime:'22:00', endTime:'22:15' },
                      ],
                      '2022-08-27':[
                        { startTime:'15:45', endTime:'16:00' },
                        { startTime:'10:30', endTime:'10:45' },
                        { startTime:'22:00', endTime:'22:15' },
                      ]
                    },
                    '30':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'15:30' },
                        { startTime:'10:30', endTime:'11:00' },
                        { startTime:'22:00', endTime:'22:30' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:15' },
                        { startTime:'09:30', endTime:'10:00' },
                        { startTime:'16:00', endTime:'16:30' },
                      ]
                    },
                    '45':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'15:45' },
                        { startTime:'10:30', endTime:'11:15' },
                        { startTime:'22:00', endTime:'22:45' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:30' },
                        { startTime:'09:30', endTime:'10:15' },
                        { startTime:'16:00', endTime:'16:45' },
                      ]
                    },
                    '1':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'16:00' },
                        { startTime:'10:30', endTime:'11:30' },
                        { startTime:'22:00', endTime:'23:00' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:45' },
                        { startTime:'09:30', endTime:'10:30' },
                        { startTime:'16:00', endTime:'17:00' },
                      ]
                    }
                },
                '2':{
                  '15':{
                    '2022-08-24':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ],
                    '2022-08-27':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ]
                  },
                  '30':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:30' },
                      { startTime:'10:30', endTime:'11:00' },
                      { startTime:'22:00', endTime:'22:30' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:15' },
                      { startTime:'09:30', endTime:'10:00' },
                      { startTime:'16:00', endTime:'16:30' },
                    ]
                  },
                  '45':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:45' },
                      { startTime:'10:30', endTime:'11:15' },
                      { startTime:'22:00', endTime:'22:45' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:30' },
                      { startTime:'09:30', endTime:'10:15' },
                      { startTime:'16:00', endTime:'16:45' },
                    ]
                  },
                  '1':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'16:00' },
                      { startTime:'10:30', endTime:'11:30' },
                      { startTime:'22:00', endTime:'23:00' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:45' },
                      { startTime:'09:30', endTime:'10:30' },
                      { startTime:'16:00', endTime:'17:00' },
                    ]
                  }
                },
                '3':{
                  '15':{
                    '2022-08-24':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ],
                    '2022-08-27':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ]
                  },
                  '30':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:30' },
                      { startTime:'10:30', endTime:'11:00' },
                      { startTime:'22:00', endTime:'22:30' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:15' },
                      { startTime:'09:30', endTime:'10:00' },
                      { startTime:'16:00', endTime:'16:30' },
                    ]
                  },
                  '45':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:45' },
                      { startTime:'10:30', endTime:'11:15' },
                      { startTime:'22:00', endTime:'22:45' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:30' },
                      { startTime:'09:30', endTime:'10:15' },
                      { startTime:'16:00', endTime:'16:45' },
                    ]
                  },
                  '1':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'16:00' },
                      { startTime:'10:30', endTime:'11:30' },
                      { startTime:'22:00', endTime:'23:00' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:45' },
                      { startTime:'09:30', endTime:'10:30' },
                      { startTime:'16:00', endTime:'17:00' },
                    ]
                  }
                },
            },
            'Monday':{
                '1':{
                    '15':{
                      '2022-08-24':[
                        { startTime:'15:45', endTime:'16:00' },
                        { startTime:'10:30', endTime:'10:45' },
                        { startTime:'22:00', endTime:'22:15' },
                      ],
                      '2022-08-27':[
                        { startTime:'15:45', endTime:'16:00' },
                        { startTime:'10:30', endTime:'10:45' },
                        { startTime:'22:00', endTime:'22:15' },
                      ]
                    },
                    '30':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'15:30' },
                        { startTime:'10:30', endTime:'11:00' },
                        { startTime:'22:00', endTime:'22:30' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:15' },
                        { startTime:'09:30', endTime:'10:00' },
                        { startTime:'16:00', endTime:'16:30' },
                      ]
                    },
                    '45':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'15:45' },
                        { startTime:'10:30', endTime:'11:15' },
                        { startTime:'22:00', endTime:'22:45' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:30' },
                        { startTime:'09:30', endTime:'10:15' },
                        { startTime:'16:00', endTime:'16:45' },
                      ]
                    },
                    '1':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'16:00' },
                        { startTime:'10:30', endTime:'11:30' },
                        { startTime:'22:00', endTime:'23:00' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:45' },
                        { startTime:'09:30', endTime:'10:30' },
                        { startTime:'16:00', endTime:'17:00' },
                      ]
                    }
                },
                '2':{
                  '15':{
                    '2022-08-24':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ],
                    '2022-08-27':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ]
                  },
                  '30':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:30' },
                      { startTime:'10:30', endTime:'11:00' },
                      { startTime:'22:00', endTime:'22:30' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:15' },
                      { startTime:'09:30', endTime:'10:00' },
                      { startTime:'16:00', endTime:'16:30' },
                    ]
                  },
                  '45':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:45' },
                      { startTime:'10:30', endTime:'11:15' },
                      { startTime:'22:00', endTime:'22:45' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:30' },
                      { startTime:'09:30', endTime:'10:15' },
                      { startTime:'16:00', endTime:'16:45' },
                    ]
                  },
                  '1':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'16:00' },
                      { startTime:'10:30', endTime:'11:30' },
                      { startTime:'22:00', endTime:'23:00' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:45' },
                      { startTime:'09:30', endTime:'10:30' },
                      { startTime:'16:00', endTime:'17:00' },
                    ]
                  }
                },
                '3':{
                  '15':{
                    '2022-08-24':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ],
                    '2022-08-27':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ]
                  },
                  '30':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:30' },
                      { startTime:'10:30', endTime:'11:00' },
                      { startTime:'22:00', endTime:'22:30' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:15' },
                      { startTime:'09:30', endTime:'10:00' },
                      { startTime:'16:00', endTime:'16:30' },
                    ]
                  },
                  '45':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:45' },
                      { startTime:'10:30', endTime:'11:15' },
                      { startTime:'22:00', endTime:'22:45' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:30' },
                      { startTime:'09:30', endTime:'10:15' },
                      { startTime:'16:00', endTime:'16:45' },
                    ]
                  },
                  '1':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'16:00' },
                      { startTime:'10:30', endTime:'11:30' },
                      { startTime:'22:00', endTime:'23:00' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:45' },
                      { startTime:'09:30', endTime:'10:30' },
                      { startTime:'16:00', endTime:'17:00' },
                    ]
                  }
                },
            },
            'Tuesday':{
                '1':{
                    '15':{
                      '2022-08-24':[
                        { startTime:'15:45', endTime:'16:00' },
                        { startTime:'10:30', endTime:'10:45' },
                        { startTime:'22:00', endTime:'22:15' },
                      ],
                      '2022-08-27':[
                        { startTime:'15:45', endTime:'16:00' },
                        { startTime:'10:30', endTime:'10:45' },
                        { startTime:'22:00', endTime:'22:15' },
                      ]
                    },
                    '30':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'15:30' },
                        { startTime:'10:30', endTime:'11:00' },
                        { startTime:'22:00', endTime:'22:30' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:15' },
                        { startTime:'09:30', endTime:'10:00' },
                        { startTime:'16:00', endTime:'16:30' },
                      ]
                    },
                    '45':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'15:45' },
                        { startTime:'10:30', endTime:'11:15' },
                        { startTime:'22:00', endTime:'22:45' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:30' },
                        { startTime:'09:30', endTime:'10:15' },
                        { startTime:'16:00', endTime:'16:45' },
                      ]
                    },
                    '1':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'16:00' },
                        { startTime:'10:30', endTime:'11:30' },
                        { startTime:'22:00', endTime:'23:00' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:45' },
                        { startTime:'09:30', endTime:'10:30' },
                        { startTime:'16:00', endTime:'17:00' },
                      ]
                    }
                },
                '2':{
                  '15':{
                    '2022-08-24':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ],
                    '2022-08-27':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ]
                  },
                  '30':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:30' },
                      { startTime:'10:30', endTime:'11:00' },
                      { startTime:'22:00', endTime:'22:30' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:15' },
                      { startTime:'09:30', endTime:'10:00' },
                      { startTime:'16:00', endTime:'16:30' },
                    ]
                  },
                  '45':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:45' },
                      { startTime:'10:30', endTime:'11:15' },
                      { startTime:'22:00', endTime:'22:45' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:30' },
                      { startTime:'09:30', endTime:'10:15' },
                      { startTime:'16:00', endTime:'16:45' },
                    ]
                  },
                  '1':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'16:00' },
                      { startTime:'10:30', endTime:'11:30' },
                      { startTime:'22:00', endTime:'23:00' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:45' },
                      { startTime:'09:30', endTime:'10:30' },
                      { startTime:'16:00', endTime:'17:00' },
                    ]
                  }
                },
                '3':{
                  '15':{
                    '2022-08-24':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ],
                    '2022-08-27':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ]
                  },
                  '30':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:30' },
                      { startTime:'10:30', endTime:'11:00' },
                      { startTime:'22:00', endTime:'22:30' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:15' },
                      { startTime:'09:30', endTime:'10:00' },
                      { startTime:'16:00', endTime:'16:30' },
                    ]
                  },
                  '45':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:45' },
                      { startTime:'10:30', endTime:'11:15' },
                      { startTime:'22:00', endTime:'22:45' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:30' },
                      { startTime:'09:30', endTime:'10:15' },
                      { startTime:'16:00', endTime:'16:45' },
                    ]
                  },
                  '1':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'16:00' },
                      { startTime:'10:30', endTime:'11:30' },
                      { startTime:'22:00', endTime:'23:00' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:45' },
                      { startTime:'09:30', endTime:'10:30' },
                      { startTime:'16:00', endTime:'17:00' },
                    ]
                  }
                },
            },
            'Wednesday':{
                '1':{
                    '15':{
                      '2022-08-24':[
                        { startTime:'15:45', endTime:'16:00' },
                        { startTime:'10:30', endTime:'10:45' },
                        { startTime:'22:00', endTime:'22:15' },
                      ],
                      '2022-08-27':[
                        { startTime:'15:45', endTime:'16:00' },
                        { startTime:'10:30', endTime:'10:45' },
                        { startTime:'22:00', endTime:'22:15' },
                      ]
                    },
                    '30':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'15:30' },
                        { startTime:'10:30', endTime:'11:00' },
                        { startTime:'22:00', endTime:'22:30' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:15' },
                        { startTime:'09:30', endTime:'10:00' },
                        { startTime:'16:00', endTime:'16:30' },
                      ]
                    },
                    '45':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'15:45' },
                        { startTime:'10:30', endTime:'11:15' },
                        { startTime:'22:00', endTime:'22:45' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:30' },
                        { startTime:'09:30', endTime:'10:15' },
                        { startTime:'16:00', endTime:'16:45' },
                      ]
                    },
                    '1':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'16:00' },
                        { startTime:'10:30', endTime:'11:30' },
                        { startTime:'22:00', endTime:'23:00' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:45' },
                        { startTime:'09:30', endTime:'10:30' },
                        { startTime:'16:00', endTime:'17:00' },
                      ]
                    }
                },
                '2':{
                  '15':{
                    '2022-08-24':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ],
                    '2022-08-27':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ]
                  },
                  '30':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:30' },
                      { startTime:'10:30', endTime:'11:00' },
                      { startTime:'22:00', endTime:'22:30' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:15' },
                      { startTime:'09:30', endTime:'10:00' },
                      { startTime:'16:00', endTime:'16:30' },
                    ]
                  },
                  '45':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:45' },
                      { startTime:'10:30', endTime:'11:15' },
                      { startTime:'22:00', endTime:'22:45' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:30' },
                      { startTime:'09:30', endTime:'10:15' },
                      { startTime:'16:00', endTime:'16:45' },
                    ]
                  },
                  '1':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'16:00' },
                      { startTime:'10:30', endTime:'11:30' },
                      { startTime:'22:00', endTime:'23:00' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:45' },
                      { startTime:'09:30', endTime:'10:30' },
                      { startTime:'16:00', endTime:'17:00' },
                    ]
                  }
                },
                '3':{
                  '15':{
                    '2022-08-24':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ],
                    '2022-08-27':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ]
                  },
                  '30':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:30' },
                      { startTime:'10:30', endTime:'11:00' },
                      { startTime:'22:00', endTime:'22:30' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:15' },
                      { startTime:'09:30', endTime:'10:00' },
                      { startTime:'16:00', endTime:'16:30' },
                    ]
                  },
                  '45':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:45' },
                      { startTime:'10:30', endTime:'11:15' },
                      { startTime:'22:00', endTime:'22:45' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:30' },
                      { startTime:'09:30', endTime:'10:15' },
                      { startTime:'16:00', endTime:'16:45' },
                    ]
                  },
                  '1':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'16:00' },
                      { startTime:'10:30', endTime:'11:30' },
                      { startTime:'22:00', endTime:'23:00' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:45' },
                      { startTime:'09:30', endTime:'10:30' },
                      { startTime:'16:00', endTime:'17:00' },
                    ]
                  }
                },
            },
            'Thursday':{
                '1':{
                    '15':{
                      '2022-08-24':[
                        { startTime:'15:45', endTime:'16:00' },
                        { startTime:'10:30', endTime:'10:45' },
                        { startTime:'22:00', endTime:'22:15' },
                      ],
                      '2022-08-27':[
                        { startTime:'15:45', endTime:'16:00' },
                        { startTime:'10:30', endTime:'10:45' },
                        { startTime:'22:00', endTime:'22:15' },
                      ]
                    },
                    '30':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'15:30' },
                        { startTime:'10:30', endTime:'11:00' },
                        { startTime:'22:00', endTime:'22:30' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:15' },
                        { startTime:'09:30', endTime:'10:00' },
                        { startTime:'16:00', endTime:'16:30' },
                      ]
                    },
                    '45':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'15:45' },
                        { startTime:'10:30', endTime:'11:15' },
                        { startTime:'22:00', endTime:'22:45' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:30' },
                        { startTime:'09:30', endTime:'10:15' },
                        { startTime:'16:00', endTime:'16:45' },
                      ]
                    },
                    '1':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'16:00' },
                        { startTime:'10:30', endTime:'11:30' },
                        { startTime:'22:00', endTime:'23:00' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:45' },
                        { startTime:'09:30', endTime:'10:30' },
                        { startTime:'16:00', endTime:'17:00' },
                      ]
                    }
                },
                '2':{
                  '15':{
                    '2022-08-24':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ],
                    '2022-08-27':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ]
                  },
                  '30':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:30' },
                      { startTime:'10:30', endTime:'11:00' },
                      { startTime:'22:00', endTime:'22:30' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:15' },
                      { startTime:'09:30', endTime:'10:00' },
                      { startTime:'16:00', endTime:'16:30' },
                    ]
                  },
                  '45':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:45' },
                      { startTime:'10:30', endTime:'11:15' },
                      { startTime:'22:00', endTime:'22:45' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:30' },
                      { startTime:'09:30', endTime:'10:15' },
                      { startTime:'16:00', endTime:'16:45' },
                    ]
                  },
                  '1':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'16:00' },
                      { startTime:'10:30', endTime:'11:30' },
                      { startTime:'22:00', endTime:'23:00' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:45' },
                      { startTime:'09:30', endTime:'10:30' },
                      { startTime:'16:00', endTime:'17:00' },
                    ]
                  }
                },
                '3':{
                  '15':{
                    '2022-08-24':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ],
                    '2022-08-27':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ]
                  },
                  '30':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:30' },
                      { startTime:'10:30', endTime:'11:00' },
                      { startTime:'22:00', endTime:'22:30' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:15' },
                      { startTime:'09:30', endTime:'10:00' },
                      { startTime:'16:00', endTime:'16:30' },
                    ]
                  },
                  '45':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:45' },
                      { startTime:'10:30', endTime:'11:15' },
                      { startTime:'22:00', endTime:'22:45' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:30' },
                      { startTime:'09:30', endTime:'10:15' },
                      { startTime:'16:00', endTime:'16:45' },
                    ]
                  },
                  '1':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'16:00' },
                      { startTime:'10:30', endTime:'11:30' },
                      { startTime:'22:00', endTime:'23:00' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:45' },
                      { startTime:'09:30', endTime:'10:30' },
                      { startTime:'16:00', endTime:'17:00' },
                    ]
                  }
                },
            },
            'Friday':{
                '1':{
                    '15':{
                      '2022-08-24':[
                        { startTime:'15:45', endTime:'16:00' },
                        { startTime:'10:30', endTime:'10:45' },
                        { startTime:'22:00', endTime:'22:15' },
                      ],
                      '2022-08-27':[
                        { startTime:'15:45', endTime:'16:00' },
                        { startTime:'10:30', endTime:'10:45' },
                        { startTime:'22:00', endTime:'22:15' },
                      ]
                    },
                    '30':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'15:30' },
                        { startTime:'10:30', endTime:'11:00' },
                        { startTime:'22:00', endTime:'22:30' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:15' },
                        { startTime:'09:30', endTime:'10:00' },
                        { startTime:'16:00', endTime:'16:30' },
                      ]
                    },
                    '45':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'15:45' },
                        { startTime:'10:30', endTime:'11:15' },
                        { startTime:'22:00', endTime:'22:45' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:30' },
                        { startTime:'09:30', endTime:'10:15' },
                        { startTime:'16:00', endTime:'16:45' },
                      ]
                    },
                    '1':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'16:00' },
                        { startTime:'10:30', endTime:'11:30' },
                        { startTime:'22:00', endTime:'23:00' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:45' },
                        { startTime:'09:30', endTime:'10:30' },
                        { startTime:'16:00', endTime:'17:00' },
                      ]
                    }
                },
                '2':{
                  '15':{
                    '2022-08-24':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ],
                    '2022-08-27':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ]
                  },
                  '30':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:30' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:15' },
                      { startTime:'09:30', endTime:'10:00' },
                    ]
                  },
                  '45':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:45' },
                    ],
                    '2022-08-27':[]
                  },
                  '1':{
                    '2022-08-24':[],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:45' },
                      { startTime:'09:30', endTime:'10:30' },
                      { startTime:'16:00', endTime:'17:00' },
                    ]
                  }
                },
                '3':{
                  '15':{
                    '2022-08-24':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ],
                    '2022-08-27':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ]
                  },
                  '30':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:30' },
                      { startTime:'10:30', endTime:'11:00' },
                      { startTime:'22:00', endTime:'22:30' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:15' },
                      { startTime:'09:30', endTime:'10:00' },
                      { startTime:'16:00', endTime:'16:30' },
                    ]
                  },
                  '45':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:45' },
                      { startTime:'10:30', endTime:'11:15' },
                      { startTime:'22:00', endTime:'22:45' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:30' },
                      { startTime:'09:30', endTime:'10:15' },
                      { startTime:'16:00', endTime:'16:45' },
                    ]
                  },
                  '1':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'16:00' },
                      { startTime:'10:30', endTime:'11:30' },
                      { startTime:'22:00', endTime:'23:00' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:45' },
                      { startTime:'09:30', endTime:'10:30' },
                      { startTime:'16:00', endTime:'17:00' },
                    ]
                  }
                },
            },
            'Saturday':{
                '1':{
                    '15':{
                      '2022-08-24':[
                        { startTime:'15:45', endTime:'16:00' },
                        { startTime:'10:30', endTime:'10:45' },
                        { startTime:'22:00', endTime:'22:15' },
                      ],
                      '2022-08-27':[
                        { startTime:'15:45', endTime:'16:00' },
                        { startTime:'10:30', endTime:'10:45' },
                        { startTime:'22:00', endTime:'22:15' },
                      ]
                    },
                    '30':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'15:30' },
                        { startTime:'10:30', endTime:'11:00' },
                        { startTime:'22:00', endTime:'22:30' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:15' },
                        { startTime:'09:30', endTime:'10:00' },
                        { startTime:'16:00', endTime:'16:30' },
                      ]
                    },
                    '45':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'15:45' },
                        { startTime:'10:30', endTime:'11:15' },
                        { startTime:'22:00', endTime:'22:45' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:30' },
                        { startTime:'09:30', endTime:'10:15' },
                        { startTime:'16:00', endTime:'16:45' },
                      ]
                    },
                    '1':{
                      '2022-08-24':[
                        { startTime:'15:00', endTime:'16:00' },
                        { startTime:'10:30', endTime:'11:30' },
                        { startTime:'22:00', endTime:'23:00' },
                      ],
                      '2022-08-27':[
                        { startTime:'18:45', endTime:'19:45' },
                        { startTime:'09:30', endTime:'10:30' },
                        { startTime:'16:00', endTime:'17:00' },
                      ]
                    }
                },
                '2':{
                  '15':{
                    '2022-08-30':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ],
                    '2022-08-27':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ]
                  },
                  '30':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:30' },
                      { startTime:'10:30', endTime:'11:00' },
                      { startTime:'22:00', endTime:'22:30' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:15' },
                      { startTime:'09:30', endTime:'10:00' },
                      { startTime:'16:00', endTime:'16:30' },
                    ]
                  },
                  '45':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:45' },
                      { startTime:'10:30', endTime:'11:15' },
                      { startTime:'22:00', endTime:'22:45' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:30' },
                      { startTime:'09:30', endTime:'10:15' },
                      { startTime:'16:00', endTime:'16:45' },
                    ]
                  },
                  '1':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'16:00' },
                      { startTime:'10:30', endTime:'11:30' },
                      { startTime:'22:00', endTime:'23:00' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:45' },
                      { startTime:'09:30', endTime:'10:30' },
                      { startTime:'16:00', endTime:'17:00' },
                    ]
                  }
                },
                '3':{
                  '15':{
                    '2022-08-24':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ],
                    '2022-08-27':[
                      { startTime:'15:45', endTime:'16:00' },
                      { startTime:'10:30', endTime:'10:45' },
                      { startTime:'22:00', endTime:'22:15' },
                    ]
                  },
                  '30':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:30' },
                      { startTime:'10:30', endTime:'11:00' },
                      { startTime:'22:00', endTime:'22:30' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:15' },
                      { startTime:'09:30', endTime:'10:00' },
                      { startTime:'16:00', endTime:'16:30' },
                    ]
                  },
                  '45':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'15:45' },
                      { startTime:'10:30', endTime:'11:15' },
                      { startTime:'22:00', endTime:'22:45' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:30' },
                      { startTime:'09:30', endTime:'10:15' },
                      { startTime:'16:00', endTime:'16:45' },
                    ]
                  },
                  '1':{
                    '2022-08-24':[
                      { startTime:'15:00', endTime:'16:00' },
                      { startTime:'10:30', endTime:'11:30' },
                      { startTime:'22:00', endTime:'23:00' },
                    ],
                    '2022-08-27':[
                      { startTime:'18:45', endTime:'19:45' },
                      { startTime:'09:30', endTime:'10:30' },
                      { startTime:'16:00', endTime:'17:00' },
                    ]
                  }
                },
            }
        },
    }
  },
  methods:{
    cancelSaving(freezedTimesList){
      this.timesListAsProp = freezedTimesList;
    },
    saving(commitTimesList,propsDataOnLastChange){
      let {dayOfWeek,hourlyDuration,monthlyDuration,startingTime} = propsDataOnLastChange;
      this.daysOfWeekTab[dayOfWeek][monthlyDuration][hourlyDuration][startingTime] = commitTimesList;
      //this.getDataOfTable();
    },
    deleteItemOnChip(itemIndex,propsDataOnLastChange){
      let {dayOfWeek,hourlyDuration,monthlyDuration,startingTime} = propsDataOnLastChange;
      this.daysOfWeekTab[dayOfWeek][monthlyDuration][hourlyDuration][startingTime].splice(itemIndex,(itemIndex == 0) ? 1 : itemIndex);
      //this.getDataOfTable();
    },
    deleteItemOnTable(itemToDeleting){
      let {dayKey,hourlyDuarationKey,monthlyDuarationKey,startingDateKey} = itemToDeleting
      delete this.daysOfWeekTab[dayKey][monthlyDuarationKey][hourlyDuarationKey][startingDateKey]
      this.timeBarChanging('day',dayKey)
      this.getDataOfTable();
    },
    getDataOfTable(){
      var tableData = [];
      for (const dayKey in this.daysOfWeekTab) {

          for (const monthlyDurationKey in this.daysOfWeekTab[dayKey]) {

              for (const hourlyDurationKey in this.daysOfWeekTab[dayKey][monthlyDurationKey]) {

                  for (const startingDateKey in this.daysOfWeekTab[dayKey][monthlyDurationKey][hourlyDurationKey]) {
                      let rowOfTable = {
                          dayKey: dayKey,
                          monthlyDuarationKey: monthlyDurationKey,
                          hourlyDuarationKey: hourlyDurationKey,
                          isLocked:(hourlyDurationKey == '1')?true:false,
                          startingDateKey: startingDateKey
                      }
                      tableData.push(rowOfTable);
                  }
              }
          }
      }
      this.dataOfTable = tableData
    },
    timeBarChanging(whichItem,value){
      let changedArr,
          currentDay = Object.keys(this.daysOfWeekTab)[this.currentDay];
      switch (whichItem) {
        case 'day':
          currentDay = value;
          changedArr = this.daysOfWeekTab[value][this.monthlyDuration][this.hourlyDuration][this.startingDate]
        break;
        case 'month':
          this.monthlyDuration = value;
          changedArr = this.daysOfWeekTab[currentDay][value][this.hourlyDuration][this.startingDate]
          break;
        case 'hour':
          this.hourlyDuration = value;
          changedArr = this.daysOfWeekTab[currentDay][this.monthlyDuration][value][this.startingDate]
          break;
        case 'date':
          this.startingDate = value;
          changedArr = this.daysOfWeekTab[currentDay][this.monthlyDuration][this.hourlyDuration][value]
          break;
        default:
          break;
      }
      this.timesListAsProp = (changedArr != undefined) ? changedArr : [];
    },
  },
  mounted() {
    this.getDataOfTable();
    this.timeBarChanging('day','Sunday');
  },
}
</script>
<style scoped>
>>> .v-tab--active{
    background: #ff4877;
    color: white;
        transition: all 0.3s;
}
>>> .v-tabs-slider-wrapper{
  display: none;
}
>>> .v-tab:not(.v-tab--active){
    color: #dee2e6;
    border: 1px solid #dee2e6;
}
>>> .v-tabs-bar__content{
  gap:10px;
}
</style>