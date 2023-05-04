<template>
  <v-container class="pa-8" fluid>
    <v-card>
      <v-card-title>Payslip Bulanan dan Office</v-card-title>
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
                            <td style="width: 20%">Total Hari Kerja</td>
                            <td>{{ item.total_hari_kerja }} Hari</td>
                          </tr>
                          <tr>
                            <td style="width: 20%">Total Hari Masuk</td>
                            <td>
                              {{ Math.floor(item.total_hari_masuk) }} Hari
                              {{ (item.total_hari_masuk % 1) * 8 }} Jam
                            </td>
                            <!-- <td v-if="item.total_hari_masuk % 1 == 0">
                              {{ Math.floor(item.total_hari_masuk) }} Hari
                            </td>
                            <td v-else>
                              {{ Math.floor(item.total_hari_masuk) }}
                              <sup>{{ (item.total_hari_masuk % 1) * 8 }}</sup
                              >/<sub>8</sub> Hari
                            </td> -->
                          </tr>
                          <tr>
                            <td style="width: 20%">Total Hari Tidak Masuk</td>
                            <td>
                              {{ Math.floor(item.total_hari_off) }} Hari
                              {{ (item.total_hari_off % 1) * 8 }} Jam
                            </td>
                            <!-- <td v-if="item.total_hari_off % 1 == 0">
                              {{ Math.floor(item.total_hari_off) }} Hari
                            </td>
                            <td v-else>
                              {{ Math.floor(item.total_hari_off) }}
                              <sup>{{ (item.total_hari_off % 1) * 8 }}</sup
                              >/<sub>8</sub> Hari
                            </td> -->
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
                            <td>Potongan Hari Kerja</td>
                            <td>
                              {{
                                formatPrice(
                                  Math.round(item.potongan_hari_kerja),
                                )
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td>Tunjangan Jabatan</td>
                            <td>
                              {{
                                formatPrice(Math.round(item.tunjangan_jabatan))
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
                            <td>Insentif Ekstra</td>
                            <td>
                              {{ formatPrice(Math.round(item.insentif_extra)) }}
                            </td>
                            <td>Pot BPJS KS</td>
                            <td>
                              {{
                                formatPrice(Math.round(item.potongan_bpjs_ks))
                              }}
                            </td>
                          </tr>
                          <tr>
                            <td>Extra Tambahan Kerja</td>
                            <td>
                              {{
                                formatPrice(
                                  Math.round(item.extra_tambahan_kerja),
                                )
                              }}
                            </td>
                            <td>Pot SPSI</td>
                            <td>
                              {{ formatPrice(Math.round(item.potongan_spsi)) }}
                            </td>
                          </tr>
                          <tr>
                            <td>Tambahan Lain</td>
                            <td>
                              <v-btn
                                v-if="item.tambahan_gaji_lain == 0"
                                color="blue darken-1"
                                small
                                class="mr-3 elevation-0"
                                @click="openDialogPendapatanLain(item)"
                                >{{
                                  formatPrice(
                                    Math.round(item.tambahan_gaji_lain),
                                  )
                                }}</v-btn
                              >
                              <div v-else>
                                {{
                                  formatPrice(
                                    Math.round(item.tambahan_gaji_lain),
                                  )
                                }}
                              </div>
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
          <template v-slot:[`item.upah_n_hari`]="{ item }">
            {{ formatPrice(Math.round(item.upah_n_hari)) }}
          </template>
          <template v-slot:[`item.extra_full`]="{ item }">
            {{ formatPrice(Math.round(item.extra_full)) }}
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
              v-if="item.sisa_bon > 0"
              color="blue darken-1"
              small
              dark
              class="mr-3 elevation-0"
              @click="openDialogBon(item)"
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
        <v-btn color="green darken-1" @click="print">Print</v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="dialogPay" max-width="600">
      <v-card>
        <v-card-title>
          <div>Pembayaran Bon Pinjaman</div>
        </v-card-title>
        <v-card-text>
          <v-currency-field
            color="grey darken-2"
            :decimal-length="0"
            prefix="Rp"
            filled
            v-bind="currency_config"
            v-model.trim="loan.nominal"
            class="currency-input pa-0 ma-0 font-md"
            label="Nominal Potongan"
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
    <v-dialog v-model="dialogPendapatanLain" max-width="600">
      <v-card>
        <v-card-title>Tambahan Pendapatan</v-card-title>
        <v-card-text>
          <v-currency-field
            color="grey darken-2"
            :decimal-length="0"
            prefix="Rp"
            filled
            v-bind="currency_config"
            v-model.trim="pendapatan_lain"
            class="currency-input pa-0 ma-0 font-md"
            label="Nominal Tambahan Pendapatan Lain"
          />
        </v-card-text>
        <v-card-actions>
          <div class="flex-grow-1"></div>
          <v-btn
            class="elevation-0 grey darken-2"
            dark
            @click="dismisDialogPendapatanLain"
            >Batal</v-btn
          >
          <v-btn class="elevation-0 primary" @click.stop="savePendapatanLain"
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
        name: "ViewPayslipCs",
        data() {
          return {
            expanded: [],
            selected: [],
            dialogPay : false,
            loan : {},
            dataPayslip : {},
            dialogPotonganLain : false,
            dialogPendapatanLain : false,
            potongan_lain : 0,
            pendapatan_lain:0,
            headers: [
              { text: "Employee_ID", value: "employee.id" },
              { text: "Nama", value: "employee.name" },
              { text: "Periode awal", value: "periode_start" },
              { text: "Periode akhir", value: "periode_end" },
              // { text: "Total hari kerja", value: "total_hari_kerja" },
              // { text: "Total hari masuk", value: "total_hari_masuk" },
              // { text: "Total hari off", value: "total_hari_off" },
              // { text: "Lama kerja", value: "lama_kerja", align: "right" },
              // { text: "Gaji Pokok", value: "gaji_pokok", align: "right" },
              // { text: "Bonus lama kerja", value: "bonus_lama_kerja", align: "right" },
              // { text: "Upah 1 minggu", value: "upah_n_hari", align: "right" },
              // { text: "Extra full", value: "extra_full", align: "right" },
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
          ...mapActions(['updatePayslipBulananWithBon', 'updatePayslipWithPotonganLain', 'updatePayslipBulananTambahanPendapatanLain']),
          formatPrice(value) {
            return formatPrice(value);
          },
          formatDateUtils(val){
            return  formatDate(val, 'short-date')
          },
          savePotonganLain(){
          const data = {
            idPayslip : this.dataPayslip.id, 
            potongan_lain: this.potongan_lain,
            jenis_potongan: "bulanan",
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
        
        openDialogPendapatanLain(item){
          // console.log(item)
          this.dataPayslip =item
          this.dialogPendapatanLain = true
        },
        dismisDialogPendapatanLain() {
          this.dialogPendapatanLain = false;
        },
        
        savePendapatanLain(){
          const data = {
            idPayslip : this.dataPayslip.id, 
            tambahan_gaji_lain: this.pendapatan_lain,
            jenis_potongan: "bulanan",
          };
          this.updatePayslipBulananTambahanPendapatanLain(data)
          // console.log(data)
          this.dismisDialogPendapatanLain()
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
            console.log(item)
            this.dataPayslip =item
            this.dialogPay = true
          },

          openDialogDriver(item, nominal){
            if(item.includes("driver")) {
                return nominal
            }
            return "";
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
            this.updatePayslipBulananWithBon(data)
            // console.log(data)
            this.dismisDialog()
            // this.inputLoan(data);
          },
      
          print() {
            console.log(this.selected);
            this.selected.sort((a, b)=> a.employee.name.localeCompare(b.employee.name))
            const doc = new jsPDF("l", "mm", "a5");
            for (var i = 0; i < this.selected.length; i++) {
              // console.log(this.selected[i])
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
                
                [
                  "Total Hari Kerja",
                  this.selected[i].total_hari_kerja + " Hari",
                  "Total Hari Tidak Masuk",
                  Math.floor(this.selected[i].total_hari_off)+" Hari "+((this.selected[i].total_hari_off % 1) * 8)  +" Jam",
                ],
                [
                  "Total Hari Masuk",
                  Math.floor(this.selected[i].total_hari_masuk)+" Hari "+((this.selected[i].total_hari_masuk % 1) * 8)  +" Jam",
                  "Total Hari Libur / Tanggal Merah",
                  this.selected[i].total_hari_libur + " Hari",
                ],
              ];
      
              var tb_header = [["PENDAPATAN", "POTONGAN"]];
      
              var tb_content = [
                [
                  "Gaji Pokok",
                  "Rp",
                  this.formatPrice(Math.round(this.selected[i].gaji_pokok)),
                  "Potongan Hari Kerja",
                  "Rp",
                  this.formatPrice(Math.round(this.selected[i].potongan_hari_kerja)),
                ],
                [
                  "Tunjangan Jabatan",
                  "Rp",
                  this.formatPrice(Math.round(this.selected[i].tunjangan_jabatan)),
                  "Potongan BPJS Tenaga Kerja",
                  "Rp",
                  this.formatPrice(Math.round(this.selected[i].potongan_bpjs_tk)),
                ],
                ["Insentif Ekstra",
                  "Rp",
                  this.formatPrice(Math.round(this.selected[i].insentif_extra)),
                  "Potongan BPJS Kesehatan",
                  "Rp",
                  this.formatPrice(Math.round(this.selected[i].potongan_bpjs_ks)),
                ],
                
                [
                "Extra Tambahan Kerja",
                  "Rp",
                  this.formatPrice(Math.round(this.selected[i].extra_tambahan_kerja)),
                  "Potongan Bon",
                  "Rp",
                  this.formatPrice(Math.round(this.selected[i].potongan_bon)),
                ],
                [
                  "Tambahan Lain",
                  "Rp",
                  this.selected[i].tambahan_gaji_lain,
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
            var document_name = "Bulanan_Office "+this.selected[0].periode_start+" - "+this.selected[0].periode_end+".pdf";
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