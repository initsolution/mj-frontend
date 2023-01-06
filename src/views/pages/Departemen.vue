<template>
  <v-container class="pa-8" fluid>
    <UpdateDepartemen 
    :dialogUpdateDepartemen.sync="dialogUpdateDepartemen" 
    :getDataDepartemen="getDataDepartemen"
    />

    <v-row>
      <v-col>
        <div flat>
          <v-row align="center" justify="space-between">
            <v-col class="py-0">
              <div class="title d-flex flex-row">
                <v-icon color="grey" class="mr-2">mdi-calendar-check</v-icon>
                <div>Data Departemen</div>
              </div>
            </v-col>
            <div class="flex-grow-1"></div>
            <v-col class="text-right py-0"> </v-col>
          </v-row>
        </div>
        <v-divider class="my-3"></v-divider>
        <v-card class="mx-auto" tile>
          <v-card-text>
            <v-data-table
              :headers="this.headers"
              :items="getDataAllDepartement"
              class="elevation-1"
            >
              <template v-slot:[`item.umr`]="{ item }">
                Rp. {{ formatPrice(item.umr) }}
              </template>
              <template v-slot:[`item.action`]="{ item }">
                <v-btn
                  color="blue"
                  class="elevation-0"
                  dark
                  small
                  @click="openDetail(item)"
                  >Edit</v-btn
                >
              </template>
            </v-data-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { formatPrice } from "@/utils/utils";
import UpdateDepartemen from "@/views/components/UpdateDepartemen.vue";
export default {
  name: "Departemen",
  components: {
    UpdateDepartemen,
  },
  data() {
    return {
      dialogUpdateDepartemen: false,
      getDataDepartemen :{},
      headers: [
        { text: "Nama Departemen", value: "name", width: "40%" },
        { text: "UMR", value: "umr", width: "40%" },
        { text: "Pilihan", value: "action", width: "20%" },
      ],
    };
  },

  created() {
    this.actionGetAllDepartment();
  },

  methods: {
    ...mapActions(["actionGetAllDepartment"]),
    formatPrice(value) {
      return formatPrice(value);
    },

    addDepartemen() {},

    openDetail(item) {
      console.log(item.id);
      this.getDataDepartemen = item
      this.dialogUpdateDepartemen = true;
    },
  },

  computed: {
    ...mapGetters(["getDataAllDepartement"]),
  },

  watch: {
    //untuk refresh data pada tabel jika di close 
    dialogUpdateDepartemen: {
      handler() {
        if(!this.dialogUpdateDepartemen) {
          this.actionGetAllDepartment();
        }
      }
    }
  }
};
</script>
