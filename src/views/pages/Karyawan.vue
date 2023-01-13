<template>
  <v-container class="pa-8" fluid>
    <v-row>
      <v-col>
        <div flat>
          <v-row align="center" justify="space-between">
            <v-col class="py-0">
              <div class="title d-flex flex-row">
                <v-icon color="grey" class="mr-2">mdi-account-box</v-icon>
                <div>Data Karyawan</div>
              </div>
            </v-col>
            <div class="flex-grow-1"></div>
            <v-col class="text-right py-0"> </v-col>
          </v-row>
          <v-divider class="my-3"></v-divider>
          <v-row>
            <v-col md="8">
              <v-file-input
                accept=".xlsx"
                label="File input"
                outlined
                v-model="selectXlsx"
                show-size
              ></v-file-input>
            </v-col>

            <v-col md="4">
              <v-btn
                color="primary elevation-0"
                @click="onUpload"
                class="mt-3 mr-2 icon-box"
              >
                Upload
              </v-btn>

              <v-btn color="primary elevation-0" class="mt-3 icon-box">
                Download
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col md="12">
              <v-data-table
                :headers="this.headers"
                :items="getDataEmployees"
                class="elevation-1"
              >
                <template v-slot:[`item.date_of_birth`]="{ item }">
                  {{ convertDate(item.date_of_birth) }}
                </template>
                <template v-slot:[`item.active_date`]="{ item }">
                  {{ convertYear(item.active_date) }}
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import XLSX from "xlsx";
import { formatDate } from "@/utils/utils";
import { mapActions, mapGetters } from "vuex";
export default {
  name: "Karyawan",
  data() {
    return {
      selectXlsx: null,
      headers: [
        {
          text: "NIK",
          align: "right",
          sortable: false,
          value: "id",
        },
        { text: "Nama", value: "name" },
        { text: "Tgl Lahir", value: "date_of_birth" },
        { text: "Thn Bergabung", value: "active_date" },
        { text: "Departemen", value: "department.name" },
        // { text: "Shift", value: "shift.name" },
        // { text: "Bagian", value: "area.name" },
        // { text: "Jabatan", value: "position.name" },
        { text: "BPJS", value: "bpjs_id" },
        { text: "NPWP", value: "npwp_id" },
        { text: "Aktif", value: "active" },
      ],
      datalist: [],
    };
  },
  components: {},
  created() {
    const params = new URLSearchParams();
    params.append("join", "department");
    this.actionGetAllEmployee(params);
  },
  methods: {
    ...mapActions(["actionGetAllEmployee", "saveBulkEmployee"]),
    convertDate(date) {
      return formatDate(date, "year");
    },

    convertYear(date) {
      return formatDate(date, "year");
    },

    convertTime(time) {
      if (time == null) {
        return;
      }
      return time.substring(0, 5);
    },
    onUpload(event) {
      console.log("Upload");
      if (!this.selectXlsx) {
        console.log("Please upload a xlsx file");
        return;
      }

      if (this.selectXlsx) {
        const reader = new FileReader();

        reader.onload = (e) => {
          /* Parse data */
          const bstr = e.target.result;
          const wb = XLSX.read(bstr, { type: "binary" });
          /* Get first worksheet */
          var datarow = [];

          const wsname = wb.SheetNames[0];
          const sheet = wb.Sheets[wsname];

          for (let row = 2; ; row++) {
            datarow = [];

            if (sheet["A" + row] == null) {
              break;
            }

            for (var col = 65; col <= 81; col++) {
              var c = String.fromCharCode(col); // get 'A', 'B', 'C' ... 'Q'
              var key = "" + c + row;
              if (sheet[key] == null) {
                datarow.push(null); //jika row .. column .. = null
                continue;
              }
              // console.log(sheet[key]["w"]);
              datarow.push(sheet[key]["w"]);
            }

            // reformat active_date
            var date = datarow[2].split("/");
            var year = date[2];
            var month = Number.parseInt(date[1]);
            var days = Number.parseInt(date[0]);

            datarow[2] = year + "-" + month + "-" + days;

            // reformat date_of_birth
            date = datarow[4].split("/");
            year = date[2];
            month = Number.parseInt(date[1]);
            days = Number.parseInt(date[0]);
            datarow[4] = year + "-" + month + "-" + days;

            this.datalist.push({
              id: datarow[0],
              name: datarow[1],
              active_date: datarow[2],
              type: datarow[3],
              date_of_birth: datarow[4],
              address: datarow[5],
              phone_no: datarow[6],
              npwp_id: datarow[7],
              bpjs_id: datarow[8],
              gaji_pokok: datarow[9],
              insentif_extra: datarow[10],
              extra_tambahan_kerja: datarow[11],
              tunjangan_kehadiran: datarow[12],
              extra_full: datarow[13],
              iuran_bpjs_tk: datarow[14],
              iuran_bpjs_ks: datarow[15],
              iuran_spsi: datarow[16],
            });
          }
        };

        reader.readAsBinaryString(this.selectXlsx);

        reader.onloadend = (e) => {
          console.log("datalist len = " + this.datalist.length);
          console.log(this.datalist);
          this.saveBulkEmployee({ bulk: this.datalist });
        };
      }
    },
  },
  computed: {
    ...mapGetters(["getDataEmployees"]),
  },
};
</script>
