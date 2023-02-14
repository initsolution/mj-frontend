<template>
  <div>
    <v-row align="center">
      <v-col>
        <div class="d-flex flex-row align-center mb-1">
          <div class="font-md">Filter Departemen</div>
          <div class="flex-grow-1"></div>
          <!-- <v-btn
            @click="clearFilter('department')"
            text
            color="indigo"
            class="py-0"
            small
            style="text-transform: capitalize"
            >Clear</v-btn
          > -->
        </div>
        <v-select
          single-line
          class="white elevation-0"
          hide-details
          dense
          outlined
          v-model="filterDepartment"
          :items="listDepartmentFilter"
          v-on:change="getAllAreaByDepartmentId"
          item-text="name"
          item-value="id"
          label="Departemen"
        ></v-select>
      </v-col>
      <v-col>
        <div class="d-flex flex-row align-center mb-2">
          <div class="font-md">Filter Shift</div>
          <div class="flex-grow-1"></div>
        </div>
        <v-select
          single-line
          class="white elevation-0"
          hide-details
          dense
          outlined
          v-model="filterShift"
          :items="listShiftFilter"
          item-text="name"
          item-value="id"
          label="Golongan"
        ></v-select>
      </v-col>
      <v-col>
        <div class="d-flex flex-row align-center mb-2">
          <div class="font-md">Filter Area</div>
          <div class="flex-grow-1"></div>
        </div>
        <v-select
          single-line
          class="white elevation-0"
          hide-details
          dense
          outlined
          v-model="filterArea"
          :items="listAreaFilter"
          v-on:change="getAllPositionByAreaId"
          item-text="name"
          item-value="id"
          label="Area"
        ></v-select>
      </v-col>
      <v-col>
        <div class="d-flex flex-row align-center mb-2">
          <div class="font-md">Filter Posisi</div>
          <div class="flex-grow-1"></div>
        </div>
        <v-select
          single-line
          class="white elevation-0"
          hide-details
          dense
          outlined
          v-model="filterPosition"
          :items="listPositionFilter"
          item-text="name"
          item-value="id"
          label="Posisi"
        ></v-select>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  name: 'FilterPanel',
  data() {
    return {
      filterDepartment: null,
      filterArea: null,
      filterPosition: null,
      filterShift: null,
      listDepartmentFilter: [],
      listShiftFilter: [],
      listAreaFilter: [],
      listPositionFilter: [],
    };
  },
  methods: {
    ...mapActions([
      'actionGetAllDepartment',
      'actionGetAllAreaByDepartmentId',
      'actionGetAllPositionByAreaId',
      'actionGetAllShift',
    ]),

    getAllAreaByDepartmentId() {
      if (this.filterDepartment != null) {
        const param = new URLSearchParams();
        param.append('join', 'department');
        param.append('filter', 'department.id||$eq||' + this.filterDepartment);
        this.actionGetAllAreaByDepartmentId(param);
      }
    },

    getAllPositionByAreaId() {
      if (this.filterArea != null) {
        const param = new URLSearchParams();
        param.append('join', 'area');
        param.append('filter', 'area.id||$eq||' + this.filterArea);
        this.actionGetAllPositionByAreaId(param);
      }
    },
  },

  watch: {
    getDataAllDepartement: {
      handler() {
        for (var i = 0; i < this.getDataAllDepartement.length; i++) {
          this.listDepartmentFilter.push({
            name: this.getDataAllDepartement[i].name,
            id: this.getDataAllDepartement[i].id,
          });
        }
      },
    },
    getDataAllShift: {
      handler() {
        for (var i = 0; i < this.getAllDataShift.length; i++) {
          this.listShiftFilter.push({
            name: this.getAllDataShift[i].name,
            id: this.getAllDataShift[i].id,
          });
        }
      },
    },

    getDataAllArea: {
      handler() {
        this.listAreaFilter = [];
        if (this.getDataAllArea.length > 0) {
          for (var i = 0; i < this.getDataAllArea.length; i++) {
            this.listAreaFilter.push({
              name: this.getDataAllArea[i].name,
              id: this.getDataAllArea[i].id,
            });
          }
          this.getAllPositionByAreaId();
        }
      },
    },

    getDataAllPosition: {
      handler() {
        this.listPositionFilter = [];
        if (this.getDataAllPosition.length > 0) {
          for (var i = 0; i < this.getDataAllPosition.length; i++) {
            this.listPositionFilter.push({
              name: this.getDataAllPosition[i].name,
              id: this.getDataAllPosition[i].id,
            });
          }
        }
      },
    },
  },
  computed: {
    ...mapGetters([
      'getDataAllDepartement',
      'getDataAllArea',
      'getDataAllPosition',
      'getAllDataShift',
    ]),
  },
};
</script>
