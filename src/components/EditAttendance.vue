<!-- eslint-disable vue/no-mutating-props -->
<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogEditAttendance" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Edit</span>
          <!-- {{ (dataAttendance_ = dataAttendance) }} -->
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <!-- <v-text-field label="Total Leave" v-model.trim="dataAttendance_" required /> -->
                <v-combobox
                  v-model="select"
                  :items="label_overtime"
                  label="Durasi"
                  outlined
                  dense
                >
                </v-combobox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" @click.native="close">Tutup</v-btn>
          <v-btn color="blue darken-1" @click="update">Edit</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
  
  <script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "EditAttendance",
  props: {
    dialogEditAttendance: {
      default: false,
    },
    dataAttendance: null,
    type_overtime: null,
  },
  data() {
    return {
      total_leave: 0,
      label_overtime: [
        {
          text: "30 Menit",
          value: "30",
        },
        {
          text: "1 Jam",
          value: "60",
        },
        {
          text: "1 Jam 30 Menit",
          value: "90",
        },
        {
          text: "2 Jam",
          value: "120",
        },
        {
          text: "2 Jam 30 Menit",
          value: "150",
        },
        {
          text: "3 Jam",
          value: "180",
        },
        {
          text: "3 Jam 30 Menit",
          value: "210",
        },
        {
          text: "4 Jam",
          value: "240",
        },
        {
          text: "4 Jam 30 Menit",
          value: "270",
        },
        {
          text: "5 Jam",
          value: "300",
        },
        {
          text: "5 Jam 30 Menit",
          value: "330",
        },
        {
          text: "6 Jam",
          value: "360",
        },
        {
          text: "6 Jam 30 Menit",
          value: "390",
        },
        {
          text: "7 Jam",
          value: "420",
        },
        {
          text: "7 Jam 30 Menit",
          value: "450",
        },
        {
          text: "8 Jam",
          value: "480",
        },
        {
          text: "8 Jam 30 Menit",
          value: "510",
        },
        {
          text: "9 Jam",
          value: "540",
        },
        {
          text: "9 Jam 30 Menit",
          value: "570",
        },
        {
          text: "10 Jam",
          value: "600",
        },
      ],
      hasil: null,
    };
  },
  methods: {
    ...mapActions(["updateOvertime"]),
    update() {
      if (this.hasil == null) {
        this.hasil = this.dataAttendance.overtime;
      }
      // console.log("hasil : " + this.hasil);
      // console.log("type_overtime : " + this.type_overtime);
      var data = null;
      if (this.type_overtime == "early") {
        data = {
          id: this.dataAttendance.id,
          early_overtime: this.hasil,
        };
      } else if (this.type_overtime == "late") {
        data = {
          id: this.dataAttendance.id,
          overtime: this.hasil,
        };
      }

      this.updateOvertime(data);
      this.close();
      // this.$emit("update:total_leave", total_leave);
      // this.$emit("update:dialogEditAttendance", false);
      // this.$emit("userInfo", this.hasil);
    },

    convertToMinutes() {},
    close() {
      this.total_leave = "";
      this.$emit("update:dialogEditAttendance", false);
      // this.dataAttendance = null;
      // this.type_overtime = null;
    },
  },

  computed: {
    select: {
      get: function () {
        if (this.dataAttendance == null) {
          return "";
        }
        var result = "";
        for (var i = 0; i < this.label_overtime.length; i++) {
          if (this.dataAttendance.overtime == this.label_overtime[i].value ||
              this.dataAttendance.early_overtime == this.label_overtime[i].value) {
            result = this.label_overtime[i].text;
          }
        }
        return result;
        // console.log(this.dataAttendance.overtime);
        // var jam = parseInt(this.dataAttendance.overtime / 60);
        // var menit = parseInt(this.dataAttendance.overtime % 60);
        // // console.log("menit = "+menit);
        // var isPass = false;
        // var result = "";
        // if (jam > 0) {
        //   isPass = true;
        //   result = jam + " Jam";
        // }
        // if (menit > 0) {
        //   if (isPass) {
        //     result = result + " ";
        //   }
        //   result = result + (menit + " Menit");
        // }
        // return result;
      },
      // setter
      set: function (newValue) {
        // your setter here
        // console.log("new value : " + newValue.value);
        this.hasil = newValue.value;
      },
    },

    // select: {
    //   set(value) {
    //     this.convertTime(value);
    //   },
    //   get() {
    //     console.log("hasil get : "+this.dataAttendance);
    //     return this.hasil;
    //   },
    // },
    // select() {
    //   var jam = parseInt(this.dataAttendance / 60);
    //   var menit = parseInt(this.dataAttendance % 60);
    //   // console.log("menit = "+menit);
    //   var result = "";
    //   var isPass = false;
    //   if(jam > 0) {
    //     isPass = true;
    //     result = jam + " Jam";
    //   }
    //   if(menit > 0) {
    //     if(isPass) {
    //       result = result + " ";
    //     }
    //     result = result + (menit + " Menit");
    //   }
    //   return result;
    // },
  },
};
</script>
  
  <style>
</style>