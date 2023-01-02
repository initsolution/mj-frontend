<template>
  <v-app>
    <v-row justify="center">
      <v-col cols="4">
        <!-- <table id="tbl1" border="2">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>01</td>
              <td>Johnson</td>
              <td>UK</td>
              <td>112</td>
            </tr>
            <tr>
              <td>02</td>
              <td>Jim</td>
              <td>US</td>
              <td>142</td>
            </tr>
            <tr>
              <td>03</td>
              <td>Johnson</td>
              <td>UK</td>
              <td>112</td>
            </tr>
            <tr>
              <td>04</td>
              <td>Jim</td>
              <td>US</td>
              <td>142</td>
            </tr>
          </tbody>
        </table> -->
        <table id="tbl1" border="2">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr class="bo-l bo-r">
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
            </tr>

            <tr class="bo-l bo-r bo-t">
              <td colspan="7" align="center">
                <strong>SLIP GAJI KARYAWAN</strong>
              </td>
            </tr>
            <tr class="bo-l bo-r bo-b">
              <td colspan="7" align="center">
                Periode 18 November 2022 - 24 November 2022
              </td>
            </tr>
            <!-- <tr class="bo-l bo-r">
              <td colspan="7" align="center">
                ————————————————————————————————————————————————————————————————
              </td>
            </tr> -->
            <tr class="bo-l bo-r">
              <td>Nama</td>
              <td colspan="2">
                <strong>YOSSI SETIAWAN</strong>
              </td>
              <td></td>
              <td>Departemen</td>
              <td colspan="2">SOFTWARE RD</td>
            </tr>
            <tr class="bo-l bo-r">
              <td>NIK</td>
              <td colspan="2">01006522</td>
              <td></td>
              <td>Area Skill/Jabatan</td>
              <td colspan="2">Software - Video</td>
            </tr>
            <tr class="bo-l bo-r">
              <td>Lama Kerja</td>
              <td colspan="2">7 tahun</td>
              <td colspan="4"></td>
            </tr>
            <tr class="bo-l bo-r">
              <td>Total Hari Kerja</td>
              <td colspan="2">6 hari</td>
              <td></td>
              <td>Total Hari Libur/Tanggal Merah</td>
              <td colspan="2">0 hari</td>
            </tr>
            <tr class="bo-l bo-r">
              <td>Total Hari Masuk</td>
              <td colspan="2">6 hari</td>
              <td></td>
              <td>Total Hari Tidak Masuk</td>
              <td colspan="2">0 hari</td>
            </tr>
            <tr class="bo-l bo-r">
              <td colspan="7" align="center">
                ————————————————————————————————————————————————————————————————
              </td>
            </tr>
            <tr class="bo-l bo-r">
              <td colspan="3" align="center" class="bo-t bo-b">
                <strong>PENDAPATAN</strong>
              </td>
              <td></td>
              <td colspan="3" align="center" class="bo-t bo-b bo-l">
                <strong>POTONGAN</strong>
              </td>
            </tr>
            <tr class="bo-l bo-r">
              <td colspan="7" align="center">
                ————————————————————————————————————————————————————————————————
              </td>
            </tr>
            <tr class="bo-l bo-r">
              <td>Gaji Pokok</td>
              <td>Rp</td>
              <td align="right">1000000</td>
              <td></td>
              <td>Pot.BPJS TK & Kesehatan</td>
              <td>Rp</td>
              <td align="right">1000</td>
            </tr>
            <tr class="bo-l bo-r">
              <td>Lama Kerja</td>
              <td>Rp</td>
              <td align="right">7 tahun</td>
              <td></td>
              <td>Potongan SPSI</td>
              <td>Rp</td>
              <td align="right">5000</td>
            </tr>
            <tr class="bo-l bo-r">
              <td>Tunjangan Jabatan</td>
              <td class="bi-b" style="border-bottom: 1px solid #000">Rp</td>
              <td
                class="bi-b"
                style="border-bottom: 1px solid #000"
                align="right"
              >
                10000
              </td>
              <td></td>
              <td>Potongan Jam Masuk</td>
              <td>Rp</td>
              <td align="right">2000</td>
            </tr>
            <tr class="bo-l bo-r">
              <td>
                <strong>Tunjangan Skill</strong>
              </td>
              <td>
                <strong>Rp</strong>
              </td>
              <td align="right">
                <strong>500001</strong>
              </td>
              <td></td>
              <td>Potongan Bon</td>
              <td>Rp</td>
              <td align="right">3000</td>
            </tr>
            <tr class="bo-l bo-r">
              <td>Insentif</td>
              <td>Rp</td>
              <td align="right">7000</td>
              <td></td>
              <td>Potongan Lain-lain</td>
              <td>Rp</td>
              <td align="right">800</td>
            </tr>
            <tr class="bo-l bo-r">
              <td>Upah 1 hari</td>
              <td>Rp</td>
              <td align="right">340000</td>
              <td colspan="4"></td>
            </tr>
            <tr class="bo-l bo-r">
              <td>Upah 1 hari x 6 hari</td>
              <td>Rp</td>
              <td align="right">76322</td>
              <td colspan="4"></td>
            </tr>
            <tr class="bo-l bo-r">
              <td>Extra Full</td>
              <td>Rp</td>
              <td align="right">50000</td>
              <td colspan="4"></td>
            </tr>
            <tr class="bo-l bo-r">
              <td>Lembur</td>
              <td>Rp</td>
              <td align="right">7000</td>
              <td colspan="4"></td>
            </tr>
            <tr class="bo-l bo-r">
              <td>Premi Hari Besar</td>
              <td>Rp</td>
              <td align="right">60900</td>
              <td colspan="4"></td>
            </tr>

            <tr class="bo-l bo-r">
              <td>
                <strong>Total Pendapatan</strong>
              </td>
              <td>
                <strong>Rp</strong>
              </td>
              <td align="right">
                <strong>59233</strong>
              </td>
              <td></td>
              <td>
                <strong>Total Potongan</strong>
              </td>
              <td>
                <strong>Rp</strong>
              </td>
              <td align="right">
                <strong>56312</strong>
              </td>
            </tr>
            <tr class="bo-l bo-r">
              <td colspan="7" align="center">
                ————————————————————————————————————————————————————————————————
              </td>
            </tr>
            <tr class="bo-l bo-r bo-t bo-b">
              <td
                colspan="7"
                align="center"
                style="background: rgb(225, 225, 225)"
              >
                <strong>PENDAPATAN GAJI = Rp7323232</strong>
              </td>
            </tr>
            <tr class="bo-l bo-r bo-t bo-b">
              <td
                colspan="7"
                align="center"
                style="background: rgb(225, 225, 225)"
              >
                <strong>ndak tau a</strong>
              </td>
            </tr>
            <tr class="bo-l bo-r bo-t bo-b">
              <td colspan="7" align="center">10030</td>
            </tr>
            <tr class="bo-l bo-r">
              <td colspan="7" align="center">
                ————————————————————————————————————————————————————————————————
              </td>
            </tr>
          </tbody>
        </table>
      </v-col>
      <v-col cols="4">
        <v-btn @click="printPayslip" class="mt-3"> Print PaySlip </v-btn>
      </v-col>
    </v-row>
  </v-app>
</template>
      
  <script>
// import { mapActions, mapGetters } from "vuex";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
export default {
  data() {
    return {};
  },
  methods: {
    // ...mapActions(["savePayslip", "actionGetPayslip"]),
    printPayslip() {
      console.log(this.selected);
      const doc = new jsPDF("l", "mm", "a5");
      // doc.setFontSize(18);
      // let pageWidth = doc.internal.pageSize.getWidth();
      // doc.text("SLIP GAJI KARYAWAN", pageWidth / 2, 20, "center");

      // doc.setFontSize(12);
      // doc.text(
      //   "Periode 18 November 2022 - 24 November 2022",
      //   pageWidth / 2,
      //   30,
      //   "center"
      // );
      // doc.text("Nama : YOSSI" , 40, 40);
      // doc.save("a4.pdf");

      var res = doc.autoTableHtmlToJson(document.getElementById("tbl1"), true);
      const options = {
        tableWidth: "auto",
        margin: {
          top: 8,
          bottom: 18,
          left: 8,
          right: 8,
        },
        theme: "plain",
        styles: {
          fontSize: 8,
          overflow: "linebreak",
          lineWidth: 0.01,
          lineColor: "#FFF",
          cellPadding: 0.4,
          minCellHeight: 1,
          minHeight: 3,
          width: "auto",
        },
        tableLineColor: [255, 255, 255],
        head: false,
      };
      doc.autoTable(res.columns, res.data, options);

      doc.save("table.pdf");
    },
  },

  computed: {
    // ...mapGetters(["getDataAllPayslip", "getStatusPayslip"]),
  },
};
</script>
      
      <style>
</style>