<template>
  <v-container class="pa-8" fluid>
    <v-card>
      <v-card-title>Payslip Produksi</v-card-title>
      <v-card-text>
        <v-data-table
          v-model="selected"
          show-select
          :headers="headers"
          :items.sync="getAllData"
          :expanded.sync="expanded"
          item-key="employee.id"
          show-expand
        >
          <template v-slot:expanded-item="{ headers, item }">
            <td style="border: none; background: #fafafa"></td>
            <td
              :colspan="headers.length"
              class="py-3"
              style="border: none; background: #fafafa"
            >
              <div>
                <v-row>
                  <v-col cols="12">
                    <v-simple-table>
                      <template v-slot:default>
                        <tbody>
                          <tr>
                            <td>Lama Kerja</td>
                            <td>{{ item.lama_kerja }} Tahun</td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Total Hari Kerja</td>
                            <td>{{ item.total_hari_kerja }} Hari</td>
                            <td>Total Hari Libur</td>
                            <td>{{ item.total_hari_libur }} Hari</td>
                          </tr>
                          <tr>
                            <td>Total Hari Masuk</td>
                            <td>{{ item.total_hari_masuk }} Hari</td>
                            <td>Total Hari Tidak Masuk</td>
                            <td>{{ item.total_hari_off }} Hari</td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>
                </v-row>
                <v-row class="mb-5">
                  <v-col cols="12">
                    <v-simple-table>
                      <template v-slot:default>
                        <thead>
                          <tr style="background-color: #04aa6d; color: white">
                            <th colspan="2" class="text-left white--text">
                              PENDAPATAN
                            </th>
                            <th colspan="2" class="text-left white--text">
                              PENGELUARAN
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Gaji Pokok</td>
                            <td>
                              {{ formatPrice(Math.round(item.gaji_pokok)) }}
                            </td>
                            <td>Potongan Terlambat</td>
                            <td>
                              {{
                                formatPrice(
                                  Math.round(item.potongan_terlambat_ijin),
                                )
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td>Bonus Lama Kerja</td>
                            <td>
                              {{
                                formatPrice(Math.round(item.bonus_lama_kerja))
                              }}
                            </td>
                            <td>Pot BPJS TK</td>
                            <td>
                              {{
                                formatPrice(Math.round(item.potongan_bpjs_tk))
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td>Upah 1 hari</td>
                            <td>
                              {{ formatPrice(Math.round(item.upah_1_hari)) }}
                            </td>
                            <td>Pot BPJS KS</td>
                            <td>
                              {{
                                formatPrice(Math.round(item.potongan_bpjs_ks))
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td>Total Tunjangan Kehadiran</td>
                            <td>
                              {{
                                formatPrice(
                                  Math.round(item.total_tunjangan_kehadiran),
                                )
                              }}
                            </td>
                            <td>Pot SPSI</td>
                            <td>
                              {{ formatPrice(Math.round(item.potongan_spsi)) }}
                            </td>
                          </tr>
                          <tr>
                            <td>Upah n Hari</td>
                            <td>
                              {{ formatPrice(Math.round(item.upah_n_hari)) }}
                            </td>
                            <td>Pot Bon</td>
                            <td>
                              <!-- {{ formatPrice(Math.round(item.potongan_bon)) }} -->

                              <v-btn
                                v-if="
                                  item.potongan_bon == 0 && item.sisa_bon > 0
                                "
                                color="blue darken-1"
                                small
                                class="mr-3 elevation-0"
                                @click="openDialogBon(item)"
                                >{{
                                  formatPrice(Math.round(item.potongan_bon))
                                }}</v-btn
                              >
                              <div v-else>
                                {{ formatPrice(Math.round(item.potongan_bon)) }}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Extra Full</td>
                            <td>
                              {{ formatPrice(Math.round(item.extra_full)) }}
                            </td>
                            <td>Pot Lain</td>
                            <td>
                              <v-btn
                                v-if="item.potongan_lain == 0"
                                color="blue darken-1"
                                small
                                class="mr-3 elevation-0"
                                @click="openDialogPotongan(item)"
                                >{{
                                  formatPrice(Math.round(item.potongan_bon))
                                }}</v-btn
                              >
                              <div v-else>
                                {{
                                  formatPrice(Math.round(item.potongan_lain))
                                }}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td>Lembur</td>
                            <td>{{ formatPrice(Math.round(item.lembur)) }}</td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Upah Hari Minggu</td>
                            <td>
                              {{ formatPrice(Math.round(item.upah_minggu)) }}
                            </td>
                            <td></td>
                            <td></td>
                          </tr>
                          <tr>
                            <td>Premi Hari Besar</td>
                            <td>
                              {{
                                formatPrice(Math.round(item.premi_hari_besar))
                              }}
                            </td>
                            <td></td>
                            <td></td>
                          </tr>
                        </tbody>
                      </template>
                    </v-simple-table>
                  </v-col>
                </v-row>
              </div>
            </td>
          </template>
          <template v-slot:[`item.periode_start`]="{ item }">
            {{ formatDateUtils(item.periode_start) }}
          </template>
          <template v-slot:[`item.periode_end`]="{ item }">
            {{ formatDateUtils(item.periode_end) }}
          </template>
          <template v-slot:[`item.gaji_pokok`]="{ item }">
            {{ formatPrice(Math.round(item.gaji_pokok)) }}
          </template>
          <template v-slot:[`item.bonus_lama_kerja`]="{ item }">
            {{ formatPrice(Math.round(item.bonus_lama_kerja)) }}
          </template>
          <template v-slot:[`item.upah_1_hari`]="{ item }">
            {{ formatPrice(Math.round(item.upah_1_hari)) }}
          </template>
          <template v-slot:[`item.total_tunjangan_kehadiran`]="{ item }">
            {{ formatPrice(Math.round(item.total_tunjangan_kehadiran)) }}
          </template>
          <template v-slot:[`item.upah_n_hari`]="{ item }">
            {{ formatPrice(Math.round(item.upah_n_hari)) }}
          </template>
          <template v-slot:[`item.extra_full`]="{ item }">
            {{ formatPrice(Math.round(item.extra_full)) }}
          </template>
          <template v-slot:[`item.lembur`]="{ item }">
            {{ formatPrice(Math.round(item.lembur)) }}
          </template>
          <template v-slot:[`item.upah_minggu`]="{ item }">
            {{ formatPrice(Math.round(item.upah_minggu)) }}
          </template>
          <template v-slot:[`item.premi_hari_besar`]="{ item }">
            {{ formatPrice(Math.round(item.premi_hari_besar)) }}
          </template>
          <template v-slot:[`item.total_pendapatan`]="{ item }">
            {{ formatPrice(Math.round(item.total_pendapatan)) }}
          </template>
          <template v-slot:[`item.potongan_terlambat_ijin`]="{ item }">
            {{ formatPrice(Math.round(item.potongan_terlambat_ijin)) }}
          </template>
          <template v-slot:[`item.potongan_bpjs_tk`]="{ item }">
            {{ formatPrice(Math.round(item.potongan_bpjs_tk)) }}
          </template>
          <template v-slot:[`item.potongan_bpjs_ks`]="{ item }">
            {{ formatPrice(Math.round(item.potongan_bpjs_ks)) }}
          </template>
          <template v-slot:[`item.potongan_spsi`]="{ item }">
            {{ formatPrice(Math.round(item.potongan_spsi)) }}
          </template>
          <template v-slot:[`item.potongan_bon`]="{ item }">
            <v-btn
              v-if="item.potongan_bon == 0"
              color="blue darken-1"
              small
              class="mr-3 elevation-0"
              @click="openDialogPotongan(item)"
              >{{ formatPrice(Math.round(item.potongan_bon)) }}</v-btn
            >
            <div v-else>{{ formatPrice(Math.round(item.potongan_bon)) }}</div>
          </template>
          <template v-slot:[`item.potongan_lain`]="{ item }">
            {{ formatPrice(Math.round(item.potongan_lain)) }}
          </template>
          <template v-slot:[`item.total_potongan`]="{ item }">
            {{ formatPrice(Math.round(item.total_potongan)) }}
          </template>
          <template v-slot:[`item.pendapatan_gaji`]="{ item }">
            {{ formatPrice(Math.round(item.pendapatan_gaji)) }}
          </template>
          <template v-slot:[`item.sisa_bon`]="{ item }">
            {{ formatPrice(Math.round(item.sisa_bon)) }}
          </template>
        </v-data-table>
      </v-card-text>
      <v-card-actions>
        <v-btn
          color="green elevation-0"
          class="my-3 icon-box"
          @click="print"
          dark
        >
          <v-icon color="white" class="mr-2">mdi-printer</v-icon> Print
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialogPay" max-width="600">
      <v-card>
        <v-card-title><div>Pembayaran Bon Pinjaman</div></v-card-title>
        <v-card-text>
          <v-currency-field
            color="grey darken-2"
            :decimal-length="0"
            prefix="Rp"
            filled
            v-bind="currency_config"
            v-model.trim="loan.nominal"
            class="currency-input pa-0 ma-0 font-md"
            label="Nominal Pinjaman"
          />
          <v-text-field
            color="grey darken-2"
            v-model.trim="loan.description"
            label="Deskripsi"
          ></v-text-field>
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn class="elevation-0 grey darken-2" dark @click="dismisDialog"
            >Batal</v-btn
          >
          <v-btn class="elevation-0 primary" @click.stop="saveLoan"
            >Simpan</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-dialog v-model="dialogPotonganLain" max-width="600">
      <v-card>
        <v-card-title>Potongan</v-card-title>
        <v-card-text>
          <v-currency-field
            color="grey darken-2"
            :decimal-length="0"
            prefix="Rp"
            filled
            v-bind="currency_config"
            v-model.trim="potongan_lain"
            class="currency-input pa-0 ma-0 font-md"
            label="Nominal Potongan"
          />
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            class="elevation-0 grey darken-2"
            dark
            @click="dismisDialogPotonganLain"
            >Batal</v-btn
          >
          <v-btn class="elevation-0 primary" @click.stop="savePotonganLain"
            >Simpan</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
  
  <script lang="js">
  import { mapActions, mapGetters } from "vuex";
  import { formatPrice, formatDate } from "@/utils/utils";
  import { jsPDF } from "jspdf";
  import autoTable from "jspdf-autotable";
  import angkaTerbilang from "@develoka/angka-terbilang-js";
  export default {
    name: "ViewPayslip",
    data() {
      return {
        expanded: [],
        selected: [],
        dialogPay : false,
        dialogPotonganLain : false,
        potongan_lain : 0,
        loan : {},
        dataPayslip : {},
        headers: [
          { text: "Employee_ID", value: "employee.id" },
          { text: "Nama", value: "employee.name" },
          { text: "Periode awal", value: "periode_start" },
          { text: "Periode akhir", value: "periode_end" },
          // { text: "Total hari kerja", value: "total_hari_kerja" },
          // { text: "Total hari masuk", value: "total_hari_masuk" },
          // { text: "Total hari off", value: "total_hari_off" },
          // { text: "Total hari libur", value: "total_hari_libur" },
          // { text: "Lama kerja", value: "lama_kerja", align: "right" },
          // { text: "Gaji Pokok", value: "gaji_pokok", align: "right" },
          // { text: "Bonus lama kerja", value: "bonus_lama_kerja", align: "right" },
          // { text: "Upah 1 hari", value: "upah_1_hari", align: "right" },
          // {
          //   text: "Total tunjangan kehadiran",
          //   value: "total_tunjangan_kehadiran",
          //   align: "right",
          // },
          // { text: "Upah (n) hari", value: "upah_n_hari", align: "right" },
          // { text: "Extra full", value: "extra_full", align: "right" },
          // { text: "Lembur", value: "lembur", align: "right" },
          // { text: "Upah hari minggu", value: "upah_minggu", align: "right" },
          // { text: "Premi hari besar", value: "premi_hari_besar", align: "right" },
          { text: "Total pendapatan", value: "total_pendapatan", align: "right" },
          // {
          //   text: "Potongan terlambat dan ijin",
          //   value: "potongan_terlambat_ijin",
          //   align: "right",
          // },
          // {
          //   text: "Potongan BPJS tenaga kerja",
          //   value: "potongan_bpjs_tk",
          //   align: "right",
          // },
          // {
          //   text: "Potongan BPJS kesehatan",
          //   value: "potongan_bpjs_ks",
          //   align: "right",
          // },
          // { text: "Potongan SPSI", value: "potongan_spsi", align: "right" },
          // { text: "Potongan bon", value: "potongan_bon", align: "right" },
          // { text: "Potongan lain", value: "potongan_lain", align: "right" },
          { text: "Total potongan", value: "total_potongan", align: "right" },
          { text: "Pendapatan gaji", value: "pendapatan_gaji", align: "right" },
          { text: "Sisa bon", value: "sisa_bon", align: "right" },
        ],
        currency_config: {
            decimal: ',',
            thousands: '.',
            prefix: 'Rp',
            precision: 0,
            masked: false,
            allowBlank: false,
            min: Number.MIN_SAFE_INTEGER,
            max: Number.MAX_SAFE_INTEGER,
          },
      };
    },
    methods: {
      ...mapActions(['updatePayslipWithBon', 'updatePayslipWithPotonganLain']),
      formatPrice(value) {
        return formatPrice(value);
      },
      close() {
        this.$emit("update:dialogViewPayslip", false);
      },
      formatDateUtils(val){
        return  formatDate(val, 'short-date')
      },
      savePotonganLain(){
        const data = {
          idPayslip : this.dataPayslip.id, 
          potongan_lain: this.potongan_lain,
          jenis_potongan: "produksi",
        };
        this.updatePayslipWithPotonganLain(data)
        // console.log(data)
        this.dismisDialogPotonganLain()
      },
      openDialogPotongan(item){
        // console.log(item)
        this.dataPayslip =item
        this.dialogPotonganLain = true
      },
      dismisDialogPotonganLain() {
        this.dialogPotonganLain = false;
      },
      formatDateBulan(date) {
        date = new Date(date);
        var bulan = [
          "Januari",
          "Februari",
          "Maret",
          "April",
          "Mei",
          "Juni",
          "Juli",
          "Agustus",
          "September",
          "Oktober",
          "November",
          "Desember",
        ];
        // date = date.substring(0, 10);
        // date = date.split("-");
        return (
          date.getDate() +
          " " +
          bulan[date.getMonth()] +
          " " +
          parseInt(1900 + date.getYear())
        );
      },
      openDialogBon(item){
        // console.log(item)
        this.dataPayslip =item
        this.dialogPay = true
      },
      dismisDialog() {
        this.dialogPay = false;
      },
      saveLoan() {
        const data = {
          idPayslip : this.dataPayslip.id,
          employee: { id: this.dataPayslip.employee.id },
          nominal: this.loan.nominal,
          note: this.loan.description,
          type: "bayar",
        };
        this.updatePayslipWithBon(data)
        // console.log(data)
        this.dismisDialog()
        // this.inputLoan(data);
      },
  
      print() {
        // console.log(this.selected);
        this.selected.sort((a, b)=> a.employee.name.localeCompare(b.employee.name))
        const doc = new jsPDF("l", "mm", "a5");
        for (var i = 0; i < this.selected.length; i++) {
          // let pageWidth = doc.internal.pageSize.getWidth();
          // console.log("pagewidth : " + pageWidth);
          // doc.setFontSize(10);
  
          // doc.text("SLIP GAJI KARYAWAN", pageWidth / 2, 10, "center");
          // doc.setFontSize(8);
          // doc.text("Nama: " + this.selected[i].employee.name, 10, 20);
          // doc.text("NIK:" + this.selected[i].employee.id, 10, 25);
          // doc.text("Lama Kerja:" + this.selected[i].lama_kerja, 10, 30);
          // doc.text(
          //   "Total Hari Kerja:" + this.selected[i].total_hari_kerja,
          //   10,
          //   35
          // );
          // doc.text(
          //   "Total Hari Masuk:" + this.selected[i].total_hari_masuk,
          //   10,
          //   40
          // );
          var tb_title = [
            ["SLIP GAJI KARYAWAN"],
            [
              "Periode " +
                this.formatDateBulan(this.selected[i].periode_start) +
                " - " +
                this.formatDateBulan(this.selected[i].periode_end),
            ],
          ];
  
          var tb_karyawan = [
            [
              "Nama",
              this.selected[i].employee.name,
              "Departemen",
              this.selected[i].employee.department.name,
            ],
            ["Nik", this.selected[i].employee.id, "Area Skill / Jabatan", this.selected[i].employee.area.name+' / '+this.selected[i].employee.position.name],
            ["Lama Kerja", this.selected[i].lama_kerja + " tahun", "", ""],
            [
              "Total Hari Kerja",
              this.selected[i].total_hari_kerja,
              "Total Hari Libur/Tanggal Merah",
              this.selected[i].total_hari_libur,
            ],
            [
              "Total Hari Masuk",
              this.selected[i].total_hari_masuk,
              "Total Hari Tidak Masuk",
              this.selected[i].total_hari_off,
            ],
          ];
  
          var tb_header = [["PENDAPATAN", "POTONGAN"]];
  
          var tb_content = [
            [
              "Gaji Pokok",
              "Rp",
              this.formatPrice(Math.round(this.selected[i].gaji_pokok)),
              "Potongan Telat dan Ijin",
              "Rp",
              this.formatPrice(Math.round(this.selected[i].potongan_terlambat_ijin)),
            ],
            [
              "Lama Kerja",
              "Rp",
              this.formatPrice(Math.round(this.selected[i].bonus_lama_kerja)),
              "Potongan BPJS Tenaga Kerja",
              "Rp",
              this.formatPrice(Math.round(this.selected[i].potongan_bpjs_tk)),
            ],
            [
              "Upah 1 hari",
              "Rp",
              this.formatPrice(Math.round(this.selected[i].upah_1_hari)),
              "Potongan BPJS Kesehatan",
              "Rp",
              this.formatPrice(Math.round(this.selected[i].potongan_bpjs_ks)),
            ],
            [
              "Tunjangan Kehadiran",
              "Rp",
              this.formatPrice(Math.round(this.selected[i].total_tunjangan_kehadiran)),
              "Potongan SPSI",
              "Rp",
              this.formatPrice(Math.round(this.selected[i].potongan_spsi)),
            ],
            [
              "Upah " + this.selected[i].total_hari_masuk + " hari",
              "Rp",
              this.formatPrice(Math.round(this.selected[i].upah_n_hari)),
              "Potongan Bon",
              "Rp",
              this.formatPrice(Math.round(this.selected[i].potongan_bon)),
            ],
            [
              "Extra Full",
              "Rp",
              this.formatPrice(Math.round(this.selected[i].extra_full)),
              "Potongan Lain-lain",
              "Rp",
              this.formatPrice(Math.round(this.selected[i].potongan_lain)),
            ],
            [
              "Lembur",
              "Rp",
              this.formatPrice(Math.round(this.selected[i].lembur)),
              "",
              "",
              "",
            ],
            [
              "Upah Hari Minggu",
              "Rp",
              this.formatPrice(Math.round(this.selected[i].upah_minggu)),
              "",
              "",
              "",
            ],
            [
              "Premi Hari Besar",
              "Rp",
              this.formatPrice(Math.round(this.selected[i].premi_hari_besar)),
              "",
              "",
              "",
            ],
            [
              "Total Pendapatan",
              "Rp",
              this.formatPrice(Math.round(this.selected[i].total_pendapatan)),
              "Total Potongan",
              "Rp",
              this.formatPrice(Math.round(this.selected[i].total_potongan)),
            ],
          ];
  
          var tb_footer = [
            [
              "PENDAPATAN GAJI = Rp " +
                formatPrice(Math.round(this.selected[i].pendapatan_gaji)),
            ],
            [angkaTerbilang(Math.round(this.selected[i].pendapatan_gaji)).toUpperCase()],
            ["SISA PINJAMAN = Rp " + this.formatPrice(Math.round(this.selected[i].sisa_bon))],
          ];
  
          doc.autoTable({
            body: tb_title,
            startY: 5,
            theme: "plain",
            styles: {
              textColor: "#000000",
              fontStyle: "bold",
              fontSize: 10,
              halign: "center",
              cellPadding: 1,
            },
          });
  
          doc.autoTable({
            body: tb_karyawan,
            startY: 17,
            theme: "plain",
            styles: {
              textColor: "#000000",
              fontSize: 8,
              cellPadding: 1,
            },
            columnStyles: {
              0: {
                cellWidth: 45,
              },
              1: {
                cellWidth: 45,
              },
              2: {
                cellWidth: 45,
              },
              3: {
                cellWidth: "auto",
              },
            },
          });
  
          doc.autoTable({
            body: tb_header,
            startY: 45,
            theme: "plain",
            styles: {
              fontStyle: "bold",
              textColor: "#000000",
              fontSize: 9,
              halign: "center",
              cellPadding: 1,
            },
            columnStyles: {
              0: {
                cellWidth: 90,
              },
              1: {
                cellWidth: "auto",
              },
            },
  
            willDrawCell: function (data) {
              if (data.row.section === "body") {
                // draw bottom border
                doc.setLineWidth(0.5);
                doc.line(
                  data.cell.x,
                  data.cell.y + data.cell.height,
                  data.cell.x + data.cell.width,
                  data.cell.y + data.cell.height
                );
                // draw top border
                doc.line(
                  data.cell.x + data.cell.width,
                  data.cell.y,
                  data.cell.x,
                  data.cell.y
                );
                // draw left border
                // doc.line(
                //   data.cell.x,
                //   data.cell.y + data.cell.height,
                //   data.cell.x,
                //   data.cell.y
                // );
                // draw right border
                // doc.line(
                //   data.cell.x + data.cell.width,
                //   data.cell.y,
                //   data.cell.x + data.cell.width,
                //   data.cell.y + data.cell.height
                // );
              }
            },
          });
  
          doc.autoTable({
            body: tb_content,
            startY: 52,
            theme: "plain",
            styles: {
              textColor: "#000000",
              fontSize: 8,
              cellPadding: 1,
            },
            columnStyles: {
              0: {
                cellWidth: 52,
              },
              1: {
                cellWidth: 8,
              },
              2: {
                cellWidth: 30,
                halign: "right",
              },
              3: {
                cellWidth: 52,
              },
              4: {
                cellWidth: 8,
              },
              5: {
                cellWidth: "auto",
                halign: "right",
              },
            },
            didParseCell: function (HookData) {
              if (HookData.row.index == 9) {
                HookData.cell.styles.fontStyle = "bold";
              }
            },
          });
  
          doc.autoTable({
            body: tb_footer,
            startY: 105,
            theme: "plain",
            styles: {
              textColor: "#000000",
              fontStyle: "bold",
              fontSize: 8,
              halign: "center",
            },
            willDrawCell: function (data) {
              if (data.row.section === "body") {
                if (data.row.index == 0) {
                  // draw top border
                  doc.setLineWidth(0.5);
                  doc.line(
                    data.cell.x + data.cell.width,
                    data.cell.y,
                    data.cell.x,
                    data.cell.y
                  );
                }
  
                if (data.row.index == 2) {
                  // draw bottom border
                  doc.setLineWidth(0.5);
                  doc.line(
                    data.cell.x,
                    data.cell.y + data.cell.height,
                    data.cell.x + data.cell.width,
                    data.cell.y + data.cell.height
                  );
                }
                // draw left border
                // doc.line(
                //   data.cell.x,
                //   data.cell.y + data.cell.height,
                //   data.cell.x,
                //   data.cell.y
                // );
                // draw right border
                // doc.line(
                //   data.cell.x + data.cell.width,
                //   data.cell.y,
                //   data.cell.x + data.cell.width,
                //   data.cell.y + data.cell.height
                // );
              }
            },
          });
          if (i < this.selected.length - 1) {
            doc.addPage();
          }
        }
        var document_name = "Produksi "+this.selected[0].periode_start+" - "+this.selected[0].periode_end+".pdf";
        doc.save(document_name);
      },
    },
    computed: {
      ...mapGetters(["getStatusPayslip"]),
      getAllData() {
        return this.getStatusPayslip.data.sort((a, b) =>{
          let fa = a.employee.name.toLowerCase();
        let fb = b.employee.name.toLowerCase();
        if (fa < fb) {
          return -1;
        }
        if (fa > fb) {
          return 1;
        }
        return 0;
        });
      },
    },
  };
  </script>
  
  <style>
</style>