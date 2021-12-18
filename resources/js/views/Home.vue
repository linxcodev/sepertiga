<template>
  <div class="fade-in">
    <div class="home">
      <div class="container-fluid">
        <h3 class="pt-3 mb-0">Aplikasi Konsep sepertiga</h3>
        <p>Aplikasi untuk membagi gaji sesuai sunnah.</p>

        <div class="row mb-2">
          <div class="col-md-4">
            <button
              class="btn btn-sm btn-info float-right"
              @click="showPengeluaran()"
              title="Pengeluaran"
            >
              Keluar
            </button>
            <button
              class="btn btn-sm btn-info float-right mr-2"
              @click="$bvModal.show('modal-scoped')"
            >
              Tambah
            </button>
          </div>
        </div>

        <div class="row">
          <div class="col-md-4">
            <div class="card">
              <table>
                <tr>
                  <th>Sodaqoh</th>
                  <td>:</td>
                  <td>
                    <span v-if="sembunyikan.sodaqoh">{{
                      sembunyikan.nilai
                    }}</span>
                    <span v-else>Rp. {{ formatUang(uang[0].total) }}</span>
                  </td>
                  <td @click="lihatSembunyi('sodaqoh')" class="cp">
                    {{ sembunyikan.sodaqoh ? "L" : "S" }}
                  </td>
                </tr>

                <tr>
                  <th>Modal</th>
                  <td>:</td>
                  <td>
                    <span v-if="sembunyikan.modal">{{
                      sembunyikan.nilai
                    }}</span>
                    <span v-else>Rp. {{ formatUang(uang[1].total) }}</span>
                  </td>
                  <td @click="lihatSembunyi('modal')" class="cp">
                    {{ sembunyikan.modal ? "L" : "S" }}
                  </td>
                </tr>

                <tr>
                  <th>Kebutuhan</th>
                  <td>:</td>
                  <td>
                    <span v-if="sembunyikan.kebutuhan">{{
                      sembunyikan.nilai
                    }}</span>
                    <span v-else>Rp. {{ formatUang(uang[2].total) }}</span>
                  </td>
                  <td @click="lihatSembunyi('kebutuhan')" class="cp">
                    {{ sembunyikan.kebutuhan ? "L" : "S" }}
                  </td>
                </tr>

                <tr style="border-top: 1px solid">
                  <th>Total</th>
                  <td></td>
                  <td>
                    <span v-if="sembunyikan.total">{{
                      sembunyikan.nilai
                    }}</span>
                    <span v-else>Rp. {{ formatUang(total) }}</span>
                  </td>
                  <td @click="lihatSembunyi('total')" class="cp">
                    {{ sembunyikan.total ? "L" : "S" }}
                  </td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <!-- end row -->
      </div>
      <!-- end container -->
    </div>

    <!-- Modal -->
    <b-modal id="modal-scoped" noCloseOnBackdrop>
      <template v-slot:modal-header="{ close }">
        <h5>{{ pengeluaran ? "Pengeluaran" : "Tambah" }}</h5>
      </template>

      <div class="form-group">
        <label>Uang</label>

        <input type="text" class="form-control" v-model="formatTotal" />
        <small class="text-danger" v-if="errors.total">{{
          errors.total[0]
        }}</small>
      </div>

      <div class="form-group">
        <label>Kategori</label>

        <select class="form-control" v-model="data.nama_kategori">
          <option value="" v-show="!pengeluaran">Semua</option>
          <option value="sodaqoh">Sodaqoh</option>
          <option value="modal">Modal</option>
          <option value="kebutuhan">Kebutuhan</option>
        </select>

        <small class="text-danger" v-if="errors.nama_kategori">{{
          errors.nama_kategori[0]
        }}</small>
      </div>

      <template v-slot:modal-footer="{ cancel }">
        <b-button
          size="sm"
          variant="primary"
          @click="postData"
          :disabled="isLoading"
        >
          {{ isLoading ? "Processing..." : "Simpan" }}
        </b-button>
        <b-button
          size="sm"
          variant="secondary"
          @click="close()"
          :disabled="isLoading"
        >
          Cancel
        </b-button>
      </template>
    </b-modal>
  </div>
</template>

<script>
import { errorToas, successToas } from "../entities/notif";
import { mapActions, mapGetters, mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      pengeluaran: false,
      data: {
        total: "",
        nama_kategori: "",
      },
      sembunyikan: {
        modal: true,
        sodaqoh: true,
        kebutuhan: true,
        total: true,
        nilai: "",
      },
    };
  },
  computed: {
    ...mapGetters(["isLoading", "errors"]),
    ...mapState(["errors"]),
    ...mapState("uang", ["uang", "total"]),

    formatTotal: {
      get: function () {
        var number_string = this.data.total.toString().replace(/[^,\d]/g, ""),
          split = number_string.split(","),
          sisa = split[0].length % 3,
          rupiah = split[0].substr(0, sisa),
          ribuan = split[0].substr(sisa).match(/\d{3}/gi);

        // tambahkan titik jika yang di input sudah menjadi angka ribuan
        if (ribuan) {
          var separator = sisa ? "." : "";
          rupiah += separator + ribuan.join(".");
        }

        rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
        return rupiah;
      },
      set: function (val) {
        this.data.total = val.replaceAll(".", "");
      },
    },
  },
  async created() {
    await this.getUang();

    const panjang = this.total.toString().length;
    this.sembunyikan.nilai = "*".repeat(panjang + 5);
  },
  methods: {
    ...mapActions("uang", ["getUang", "addUang", "pengeluaranUang"]),

    lihatSembunyi(key) {
      this.sembunyikan[key] = !this.sembunyikan[key];
    },
    showPengeluaran() {
      this.data.nama_kategori = 'sodaqoh'
      this.pengeluaran = true;
      this.$bvModal.show("modal-scoped");
    },
    formatUang(uang) {
      var number_string = uang.toString().replace(/[^,\d]/g, ""),
        split = number_string.split(","),
        sisa = split[0].length % 3,
        rupiah = split[0].substr(0, sisa),
        ribuan = split[0].substr(sisa).match(/\d{3}/gi);

      // tambahkan titik jika yang di input sudah menjadi angka ribuan
      if (ribuan) {
        var separator = sisa ? "." : "";
        rupiah += separator + ribuan.join(".");
      }

      rupiah = split[1] != undefined ? rupiah + "," + split[1] : rupiah;
      return rupiah;
    },
    async postData() {
      try {
        if (this.pengeluaran) {
          await this.pengeluaranUang(this.data);
        } else {
          await this.addUang(this.data);
        }

        await this.getUang();
        this.clearForm();
        this.$bvModal.hide("modal-scoped");
        this.$bvToast.toast("Data berhasil ditambah.", successToas());
      } catch (error) {
        this.$bvToast.toast(error.message, errorToas());
      }
    },
    close() {
      this.clearForm();
      this.$bvModal.hide("modal-scoped");
      this.$store.commit("CLEAR_ERRORS");
    },
    clearForm() {
      this.pengeluaran = false;

      this.data = {
        total: "",
        nama_kategori: "",
      };
    },
  },
};
</script>

<style scoped>
.home {
  background-color: rgb(69, 124, 163);
  min-height: 100vh;
  width: 100%;
  color: white;
  transition: background-color 0.5s ease-in-out 0s;
  padding-bottom: 12px;
  box-sizing: border-box;
  padding-top: env(safe-area-inset-top);
}
.card {
  background-color: rgba(255, 255, 255, 0.1);
  padding: 20px 20px 30px;
  /* border-radius: 6px; */
  margin-bottom: 20px;
}

.btn-info {
  border-radius: 4px;
  opacity: 0.9;
  background: none rgba(255, 255, 255, 0.2);
  box-shadow: none;
  border: none;
}

.btn-info:hover {
  opacity: 1;
}

.cp {
  cursor: pointer;
}
</style>