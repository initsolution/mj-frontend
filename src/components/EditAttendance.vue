<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialogEditAttendance" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Update</span>
          {{ (dataAttendance_ = dataAttendance) }}
        </v-card-title>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <!-- <v-text-field label="Total Leave" v-model.trim="dataAttendance_" required /> -->
                <v-combobox
                  v-model="select"
                  :items="label_overtime"
                  label="Combobox"
                  outlined
                  dense
                ></v-combobox>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-btn color="red darken-1" @click.native="close">Close</v-btn>
          <v-btn color="blue darken-1" @click="update">Update</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
  
  <script>
export default {
  name: "EditAttendance",
  props: {
    dialogEditAttendance: {
      default: false,
    },
    dataAttendance: null,
  },
  data() {
    return {
      total_leave: 0,
      label_overtime: [
        "30 Menit",
        "1 Jam",
        "1 Jam 30 Menit",
        "2 Jam",
        "2 Jam 30 Menit",
        "3 Jam",
        "3 Jam 30 Menit",
        "4 Jam",
        "4 Jam 30 Menit",
        "5 Jam",
        "5 Jam 30 Menit",
        "6 Jam",
        "6 Jam 30 Menit",
        "7 Jam",
        "7 Jam 30 Menit",
        "8 Jam",
        "8 Jam 30 Menit",
        "9 Jam",
        "9 Jam 30 Menit",
        "10 Jam",
      ],
      hasil: this.convertTime(this.dataAttendance),
    };
  },
  methods: {
    update() {
      console.log(this.hasil);
      var data = 1999;
      // this.$emit("update:total_leave", total_leave);
      this.$emit("update:dialogEditAttendance", false);
      this.$emit("userInfo", data);
    },
    close() {
      this.total_leave = "";
      this.$emit("update:dialogEditAttendance", false);
    },

    convertTime(dataAttendance) {
      console.log("dataAttendance : "+dataAttendance);
      var jam = parseInt(dataAttendance / 60);
      var menit = parseInt(dataAttendance % 60);
      // console.log("menit = "+menit);
      var isPass = false;
      if (jam > 0) {
        isPass = true;
        this.hasil = jam + " Jam";
      }
      if (menit > 0) {
        if (isPass) {
          this.hasil = this.hasil + " ";
        }
        this.hasil = this.hasil + (menit + " Menit");
      }
    },
  },

  computed: {
    select: {
      set(value) {
        this.convertTime(value);
      },
      get() {
        console.log("hasil get : "+this.dataAttendance);
        return this.hasil;
      },
    },
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