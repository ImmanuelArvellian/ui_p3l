<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h3>Jadwal Umum table</h3>
                    </div>
                    <div class="card-body">
                        <router-link :to="{ name: 'jadwalumum.create' }" class="btn btn-md btn-success">Tambah </router-link>
                        <table class="table align-items-center mb-0 mt-3">
                            <thead>
                                <tr align="center">
                                    <th scope="col">Senin</th>
                                    <th scope="col">Selasa</th>
                                    <th scope="col">Rabu</th>
                                    <th scope="col">Kamis</th>
                                    <th scope="col">Jumat</th>
                                    <th scope="col">Sabtu</th>
                                    <th scope="col">Minggu</th>
                                </tr>
                            </thead>
                            <tbody>
                                <td>
                                    <tr v-for="(jadwal_umum, id_jadwal_umum) in jadwal_umum" :key="id_jadwal_umum">
                                        <td align="center" v-if="jadwal_umum.hari == 'Senin'">
                                            {{ jadwal_umum.id_jadwal_umum }}
                                            <br> {{ jadwal_umum.kelas.nama_kelas }}
                                            <br> {{ jadwal_umum.instruktur.nama }}
                                            <br> {{ jadwal_umum.jam_mulai }} {{ "-" }} {{ jadwal_umum.jam_selesai }}
                                            <br><router-link :to="{ name:'jadwalumum.edit', params: { id_jadwal_umum: jadwal_umum.id_jadwal_umum } }" class="nav-link px-2">
                                                    <button class="btn btn-sm btn-primary">
                                                        <i class="bi bi-pencil"></i>
                                                    </button>
                                                </router-link>
                                            <br> {{ " " }} 
                                        </td>
                                    </tr>
                                </td>
                                <td>
                                    <tr v-for="(jadwal_umum, id_jadwal_umum) in jadwal_umum" :key="id_jadwal_umum">
                                        <td align="center" v-if="jadwal_umum.hari == 'Selasa'">
                                            {{ jadwal_umum.id_jadwal_umum }}
                                            <br> {{ jadwal_umum.kelas.nama_kelas }}
                                            <br> {{ jadwal_umum.instruktur.nama }}
                                            <br> {{ jadwal_umum.jam_mulai }} {{ "-" }} {{ jadwal_umum.jam_selesai }}
                                            <br><router-link :to="{ name:'jadwalumum.edit', params: { id_jadwal_umum: jadwal_umum.id_jadwal_umum } }" class="nav-link px-2">
                                                    <button class="btn btn-sm btn-primary">
                                                        <i class="bi bi-pencil"></i>
                                                    </button>
                                                </router-link>
                                            <br> {{ " " }} 
                                        </td>
                                    </tr>
                                </td>
                                <td>
                                    <tr v-for="(jadwal_umum, id_jadwal_umum) in jadwal_umum" :key="id_jadwal_umum">
                                        <td align="center" v-if="jadwal_umum.hari == 'Rabu'">
                                            {{ jadwal_umum.id_jadwal_umum }}
                                            <br> {{ jadwal_umum.kelas.nama_kelas }}
                                            <br> {{ jadwal_umum.instruktur.nama }}
                                            <br> {{ jadwal_umum.jam_mulai }} {{ "-" }} {{ jadwal_umum.jam_selesai }}
                                            <br><router-link :to="{ name:'jadwalumum.edit', params: { id_jadwal_umum: jadwal_umum.id_jadwal_umum } }" class="nav-link px-2">
                                                    <button class="btn btn-sm btn-primary">
                                                        <i class="bi bi-pencil"></i>
                                                    </button>
                                                </router-link>
                                            <br> {{ " " }} 
                                        </td>
                                    </tr>
                                </td>
                                <td>
                                    <tr v-for="(jadwal_umum, id_jadwal_umum) in jadwal_umum" :key="id_jadwal_umum">
                                        <td align="center" v-if="jadwal_umum.hari == 'Kamis'">
                                            {{ jadwal_umum.id_jadwal_umum }}
                                            <br> {{ jadwal_umum.kelas.nama_kelas }}
                                            <br> {{ jadwal_umum.instruktur.nama }}
                                            <br> {{ jadwal_umum.jam_mulai }} {{ "-" }} {{ jadwal_umum.jam_selesai }}
                                            <br><router-link :to="{ name:'jadwalumum.edit', params: { id_jadwal_umum: jadwal_umum.id_jadwal_umum } }" class="nav-link px-2">
                                                    <button class="btn btn-sm btn-primary">
                                                        <i class="bi bi-pencil"></i>
                                                    </button>
                                                </router-link>
                                            <br> {{ " " }} 
                                        </td>
                                    </tr>
                                </td>
                                <td>
                                    <tr v-for="(jadwal_umum, id_jadwal_umum) in jadwal_umum" :key="id_jadwal_umum">
                                        <td align="center" v-if="jadwal_umum.hari == 'Jumat'">
                                            {{ jadwal_umum.id_jadwal_umum }}
                                            <br> {{ jadwal_umum.kelas.nama_kelas }}
                                            <br> {{ jadwal_umum.instruktur.nama }}
                                            <br> {{ jadwal_umum.jam_mulai }} {{ "-" }} {{ jadwal_umum.jam_selesai }}
                                            <br><router-link :to="{ name:'jadwalumum.edit', params: { id_jadwal_umum: jadwal_umum.id_jadwal_umum } }" class="nav-link px-2">
                                                    <button class="btn btn-sm btn-primary">
                                                        <i class="bi bi-pencil"></i>
                                                    </button>
                                                </router-link>
                                            <br> {{ " " }} 
                                        </td>
                                    </tr>
                                </td>
                                <td>
                                    <tr v-for="(jadwal_umum, id_jadwal_umum) in jadwal_umum" :key="id_jadwal_umum">
                                        <td align="center" v-if="jadwal_umum.hari == 'Sabtu'">
                                            {{ jadwal_umum.id_jadwal_umum }}
                                            <br> {{ jadwal_umum.kelas.nama_kelas }}
                                            <br> {{ jadwal_umum.instruktur.nama }}
                                            <br> {{ jadwal_umum.jam_mulai }} {{ "-" }} {{ jadwal_umum.jam_selesai }}
                                            <br><router-link :to="{ name:'jadwalumum.edit', params: { id_jadwal_umum: jadwal_umum.id_jadwal_umum } }" class="nav-link px-2">
                                                    <button class="btn btn-sm btn-primary">
                                                        <i class="bi bi-pencil"></i>
                                                    </button>
                                                </router-link>
                                            <br> {{ " " }} 
                                        </td>
                                    </tr>
                                </td>
                                <td>
                                    <tr v-for="(jadwal_umum, id_jadwal_umum) in jadwal_umum" :key="id_jadwal_umum">
                                        <td align="center" v-if="jadwal_umum.hari == 'Minggu'">
                                            {{ jadwal_umum.id_jadwal_umum }}
                                            <br> {{ jadwal_umum.kelas.nama_kelas }}
                                            <br> {{ jadwal_umum.instruktur.nama }}
                                            <br> {{ jadwal_umum.jam_mulai }} {{ "-" }} {{ jadwal_umum.jam_selesai }}
                                            <br><router-link :to="{ name:'jadwalumum.edit', params: { id_jadwal_umum: jadwal_umum.id_jadwal_umum } }" class="nav-link px-2">
                                                    <button class="btn btn-sm btn-primary">
                                                        <i class="bi bi-pencil"></i>
                                                    </button>
                                                </router-link>
                                            <br> {{ " " }} 
                                        </td>
                                    </tr>
                                </td>
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
        let jadwal_umum = ref([]);
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("https://arvell.valent.ppcdeveloper.com/api/jadwal_umum")
                .then((response) => {
                    //assign state posts with response data
                    jadwal_umum.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        })

        //method delete
        function jadwal_umumDelete(id_jadwal_umum) {
            //delete data post by ID
            axios.delete(`https://arvell.valent.ppcdeveloper.com/api/jadwal_umum/${id_jadwal_umum}`)
            .then(() => {
              //splice posts 
              jadwal_umum.value.splice(jadwal_umum.value.indexOf(id_jadwal_umum), 1);
              window.location.reload();
            }).catch(error => {
                console.log(error.response.data)
            })
        }

        //return
        return {
            jadwal_umum,
            jadwal_umumDelete
        };
    },
};
</script>
<style>

</style>