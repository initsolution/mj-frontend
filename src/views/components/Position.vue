<template>
  <v-layout row justify-center>
    <TambahEditPosition
      :dialogTambahEditPosition.sync="dialogTambahEditPosition"
      :getDataPosition="getDataPosition"
      :areaId="areaId"
      :type="type"
    ></TambahEditPosition>
    <v-dialog v-model="dialogPosition" persistent max-width="800px">
      <v-card>
        <v-card-title
          class="subheading px-8 d-flex grey lighten-5 flex-row align-center justify-space-between"
        >
          <div>Data Jabatan</div>
          <v-icon @click="close()">mdi-close</v-icon>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
          <v-row align="center mt-4" justify="space-between">
            <v-col cols="4" class="py-0">
              <v-btn
                class="elevation-0 my-3"
                color="primary"
                @click="addPosition()"
                >Tambah Jabatan</v-btn
              >
            </v-col>
          </v-row>
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-left">Nama Jabatan</th>
                  <th class="text-left">Tanggal Ditambahkan</th>
                  <th class="text-left">Tanggal Diperbarui</th>
                  <th class="text-left">Aksi</th>
                </tr>
              </thead>
              <tbody v-if="getDataAllArea != null">
                <tr
                  v-for="(item, index) in getDataAllArea.position"
                  :key="index"
                >
                  <td>{{ formatDate(item.name) }}</td>
                  <td>{{ formatDate(item.created_at) }}</td>
                  <td>{{ formatDate(item.updated_at) }}</td>
                  <td>
                    <v-btn
                      @click="updatePosition(item)"
                      title="Ubah Posisi"
                      small
                      color="blue"
                      dark
                      class="mr-2 elevation-0"
                      >Ubah</v-btn
                    >
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import TambahEditPosition from '@/views/components/TambahEditPosition.vue';
export default {
  name: 'Position',
  components: {
    TambahEditPosition,
  },
  props: {
    getDetailDataArea: null,
    dialogPosition: {
      default: false,
    },
  },
  data() {
    return {
      areaId: null,
      type: null,
      dialogTambahEditPosition: false,
      getDataPosition: {},
      multiLine: false,
      snackbar: false,
      notif_text: '',
    };
  },

  created() {},

  methods: {
    ...mapActions(['actionGetAllAreaById']),

    getAllAreaById() {
      const param = new URLSearchParams();
      param.append('join', 'position');
      this.areaId = this.getDetailDataArea.id;
      if (this.areaId == null) {
        return;
      }
      const data = {
        id: this.areaId,
        param: param,
      };
      this.actionGetAllAreaById(data);
    },

    updatePosition(item) {
      this.type = 'update';
      this.getDataPosition = item;
      this.dialogTambahEditPosition = true;
    },

    addPosition() {
      this.type = 'add';
      this.getDataPosition = {};
      this.dialogTambahEditPosition = true;
    },

    formatDate(date) {
      return date.substring(0, 10);
    },

    close() {
      this.$emit('update:dialogPosition', false);
    },
  },

  computed: {
    ...mapGetters([
      'getDataAllArea',
      'getDataAllPosition',
      'getStatusPosition',
    ]),
  },

  watch: {
    getDetailDataArea: {
      handler() {
        this.getAllAreaById();
      },
    },

    getStatusPosition: {
      handler() {
        if (
          this.getStatusPosition.status == 'Created' ||
          this.getStatusPosition.status == 'OK'
        ) {
          this.getAllAreaById();
        }
      },
    },

    dialogTambahEditPosition: {
      handler() {
        if (!this.dialogTambahEditPosition) {
          this.getAllAreaById();
        }
      },
    },
  },
};
</script>