<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <h3>Izin Instruktur table</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-8">
                                <!-- <router-link :to="{ name: 'izin.create' }">
                                    <button class="btn btn-md btn-success">
                                        <i class="bi bi-plus">Tambah</i>
                                    </button>
                                </router-link> -->
                            </div>
                            <div class="col-4">
                                <div class="input-group rounded">
                                    <input type="search" class="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" />
                                    <span class="input-group-text border-0" id="search-addon">
                                        <i class="bi bi-search"></i>
                                    </span>
                                </div>
                            </div>
                        </div>
                        <table class="table align-items-center mb-0 mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">ID Izin</th>
                                    <th scope="col">Nama Instruktur</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Keterangan</th>
                                    <th scope="col">Tanggal Izin</th>
                                    <th scope="col">Instruktur Pengganti</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(izin_instruktur, id_izin) in izin_instruktur" :key="id_izin">
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ izin_instruktur.id_izin }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ izin_instruktur.instruktur_nama }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ izin_instruktur.status }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ izin_instruktur.keterangan }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ izin_instruktur.tgl_izin }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ izin_instruktur.pengganti_nama }}</span>
                                    </td>
                                    <td class="text-center">
                                        <div class="row align-items-start">
                                            <div class="col-4">
                                                <button @click.prevent="konfirmasi(izin_instruktur.id_izin)" class="btn btn-sm btn-warning">
                                                    <i class="bi bi-pencil"></i>
                                                </button>
                                            </div>
                                            <div class="col-4">
                                                <!-- <router-link :to="{ name:'izin_instruktur.edit', params: { id_izin: izin_instruktur.id_izin } }" class="nav-link px-2">
                                                    <button class="btn btn-sm btn-primary">
                                                        <i class="bi bi-pencil"></i>
                                                    </button>
                                                </router-link> -->
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { onMounted, ref } from "vue";

export default {
    setup() {
        //reactive state
        let izin_instruktur = ref([]);
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://localhost:8000/api/izin_instruktur")
                .then((response) => {
                    //assign state posts with response data
                    izin_instruktur.value = response.data.data;
                    console.log(izin_instruktur.value);
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        })

        //method delete
        function konfirmasi($id_izin) {
            axios
                .post("http://localhost:8000/api/izin_instruktur/konfirmasi/" +$id_izin, {
                })
                .then(() => {
                    //redirect ke post index
                    window.location.reload();
                })
        }

        //return
        return {
            izin_instruktur,
            konfirmasi
        };
    },
};
</script>
<style>

</style>