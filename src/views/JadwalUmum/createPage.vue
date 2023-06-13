<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-md-12">
                <div class="card border rounded">
                    <div class="card-header pb-0">
                        <h3>Tambah Jadwal Umum</h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Kelas</label>
                                <select type="text" class="form-control" v-model="jadwal_umum.id_kelas"
                                    placeholder="Masukkan nama kelas">
                                    <option v-for="(atr, id_kelas) in kelas" :key="id_kelas" v-bind:value="atr.id_kelas">
                                        {{ atr.nama_kelas }}
                                    </option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.nama_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.nama_kelas[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Instruktur</label>
                                <select class="form-control" v-model="jadwal_umum.id_instruktur"
                                    placeholder="Masukkan nama instruktur">
                                    <option v-for="(atr, id_instruktur) in instruktur" :key="id_instruktur" v-bind:value="atr.id_instruktur">
                                        {{ atr.nama }}
                                    </option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{ validation.nama[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Hari</label>
                                <select class="form-control" v-model="jadwal_umum.hari"
                                    placeholder="Pilih Hari">
                                    <option disabled value="">Pilih Hari</option>
                                    <option value="Senin">Senin</option>
                                    <option value="Selasa">Selasa</option>
                                    <option value="Rabu">Rabu</option>
                                    <option value="Kamis">Kamis</option>
                                    <option value="Jumat">Jumat</option>
                                    <option value="Sabtu">Sabtu</option>
                                    <option value="Minggu">Minggu</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.hari" class="mt-2 alert alert-danger">
                                    {{ validation.hari[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Jam Mulai</label>
                                <select class="form-control" v-model="jadwal_umum.jam_mulai"
                                    placeholder="Pilih Jam">
                                    <option disabled value="">Pilih Jam Mulai</option>
                                    <option value="08:00:00">8.00 AM</option>
                                    <option value="09:30:00">9.30 AM</option>
                                    <option value="17:00:00">5.00 PM</option>
                                    <option value="18:30:00">6.30 PM</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.jam_mulai" class="mt-2 alert alert-danger">
                                    {{ validation.jam_mulai[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Jam Selesai</label>
                                <select class="form-control" v-model="jadwal_umum.jam_selesai"
                                    placeholder="Pilih Jam">
                                    <option disabled value="">Pilih Jam Selesai</option>
                                    <option value="08:00:00">9.30 AM</option>
                                    <option value="09:30:00">11.00 AM</option>
                                    <option value="17:00:00">6.30 PM</option>
                                    <option value="18:30:00">8.00 PM</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.jam_selesai" class="mt-2 alert alert-danger">
                                    {{ validation.jam_selesai[0] }}
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">SIMPAN</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
    setup() {
        //state instruktur
        const jadwal_umum = reactive({
            id_instruktur: '',
            id_kelas: '',
            hari: '',
            jam_mulai: '',
            jam_selesai: ''
        });

        const kelas = ref([]);
        const instruktur = ref([]);

        //state validation
        const validation = ref([]);
        
        //vue router
        const router = useRouter();

        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("https://arvell.valent.ppcdeveloper.com/api/instruktur")
                .then((response) => {
                    //assign state posts with response data
                    instruktur.value = response.data.data;
                    console.log(instruktur.value)
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
            
            axios
                .get("https://arvell.valent.ppcdeveloper.com/api/kelas")
                .then((response) => {
                    //assign state posts with response data
                    kelas.value = response.data.data;
                    console.log(kelas.value)
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        })

        //method store
        function store() {
            let id_instruktur = jadwal_umum.id_instruktur;
            let id_kelas = jadwal_umum.id_kelas;
            let hari = jadwal_umum.hari;
            let jam_mulai = jadwal_umum.jam_mulai;
            let jam_selesai = jadwal_umum.jam_selesai;

            axios
                .post("https://arvell.valent.ppcdeveloper.com/api/jadwal_umum", {
                    id_instruktur: id_instruktur,
                    id_kelas: id_kelas,
                    hari: hari,
                    jam_mulai: jam_mulai,
                    jam_selesai: jam_selesai,
                })
                .then(() => {
                    //redirect ke post index
                    router.push({
                        name: "jadwalumum.index",
                    });
                })
                .catch((error) => {
                    //assign state validation with error
                    validation.value = error.response.data;
                });
        }
        //return
        return {
            jadwal_umum,
            kelas,
            instruktur,
            validation,
            router,
            store,
        };
    },
};
</script>
<style>

</style>