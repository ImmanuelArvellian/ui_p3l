<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h3>Jadwal Harian table</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-8">
                                <button @click.prevent="generate(jadwal_harian.id_jadwal_harian)" class="btn btn-sm btn-success">
                                    <i class="bi bi-plus">GENERATE</i>
                                </button>
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
                            <tr align="center">
                                <th scope="col">Senin</th>
                                <th scope="col">Selasa</th>
                                <th scope="col">Rabu</th>
                                <th scope="col">Kamis</th>
                                <th scope="col">Jumat</th>
                                <th scope="col">Sabtu</th>
                                <th scope="col">Minggu</th>
                            </tr>
                            <tbody>
                                <td>
                                    <tr v-for="(jadwal_harian, id_jadwal_harian) in jadwal_harian" :key="id_jadwal_harian">
                                        <td align="center" v-if="jadwal_harian.hari == 'Senin'">
                                            {{ jadwal_harian.id_jadwal_harian }}
                                            <br> {{ jadwal_harian.kelas.nama_kelas }}
                                            <br> {{ jadwal_harian.instruktur.nama }}
                                            <br> {{ jadwal_harian.tanggal }}
                                            <br> {{ jadwal_harian.jam_mulai }} {{ "-" }} {{ jadwal_harian.jam_selesai }}
                                            <br> {{ jadwal_harian.status }}
                                            <br><button @click.prevent="ubahStatus(jadwal_harian.id_jadwal_harian)" class="btn btn-sm btn-info">
                                                    <i class="bi bi-pencil"></i>
                                                </button>
                                            <br> {{ " " }} 
                                        </td>
                                    </tr>
                                </td>
                                <td>
                                    <tr v-for="(jadwal_harian, id_jadwal_harian) in jadwal_harian" :key="id_jadwal_harian">
                                        <td align="center" v-if="jadwal_harian.hari == 'Selasa'">
                                            {{ jadwal_harian.id_jadwal_harian }}
                                            <br> {{ jadwal_harian.kelas.nama_kelas }}
                                            <br> {{ jadwal_harian.instruktur.nama }}
                                            <br> {{ jadwal_harian.tanggal }}
                                            <br> {{ jadwal_harian.jam_mulai }} {{ "-" }} {{ jadwal_harian.jam_selesai }}
                                            <br> {{ jadwal_harian.status }}
                                            <br><button @click.prevent="ubahStatus(jadwal_harian.id_jadwal_harian)" class="btn btn-sm btn-info">
                                                    <i class="bi bi-pencil"></i>
                                                </button>
                                            <br> {{ " " }} 
                                        </td>
                                    </tr>
                                </td>
                                <td>
                                    <tr v-for="(jadwal_harian, id_jadwal_harian) in jadwal_harian" :key="id_jadwal_harian">
                                        <td align="center" v-if="jadwal_harian.hari == 'Rabu'">
                                            {{ jadwal_harian.id_jadwal_harian }}
                                            <br> {{ jadwal_harian.kelas.nama_kelas }}
                                            <br> {{ jadwal_harian.instruktur.nama }}
                                            <br> {{ jadwal_harian.tanggal }}
                                            <br> {{ jadwal_harian.jam_mulai }} {{ "-" }} {{ jadwal_harian.jam_selesai }}
                                            <br> {{ jadwal_harian.status }}
                                            <br><button @click.prevent="ubahStatus(jadwal_harian.id_jadwal_harian)" class="btn btn-sm btn-info">
                                                    <i class="bi bi-pencil"></i>
                                                </button>
                                            <br> {{ " " }} 
                                        </td>
                                    </tr>
                                </td>
                                <td>
                                    <tr v-for="(jadwal_harian, id_jadwal_harian) in jadwal_harian" :key="id_jadwal_harian">
                                        <td align="center" v-if="jadwal_harian.hari == 'Kamis'">
                                            {{ jadwal_harian.id_jadwal_harian }}
                                            <br> {{ jadwal_harian.kelas.nama_kelas }}
                                            <br> {{ jadwal_harian.instruktur.nama }}
                                            <br> {{ jadwal_harian.tanggal }}
                                            <br> {{ jadwal_harian.jam_mulai }} {{ "-" }} {{ jadwal_harian.jam_selesai }}
                                            <br> {{ jadwal_harian.status }}
                                            <br><button @click.prevent="ubahStatus(jadwal_harian.id_jadwal_harian)" class="btn btn-sm btn-info">
                                                    <i class="bi bi-pencil"></i>
                                                </button>
                                            <br> {{ " " }} 
                                        </td>
                                    </tr>
                                </td>
                                <td>
                                    <tr v-for="(jadwal_harian, id_jadwal_harian) in jadwal_harian" :key="id_jadwal_harian">
                                        <td align="center" v-if="jadwal_harian.hari == 'Jumat'">
                                            {{ jadwal_harian.id_jadwal_harian }}
                                            <br> {{ jadwal_harian.kelas.nama_kelas }}
                                            <br> {{ jadwal_harian.instruktur.nama }}
                                            <br> {{ jadwal_harian.tanggal }}
                                            <br> {{ jadwal_harian.jam_mulai }} {{ "-" }} {{ jadwal_harian.jam_selesai }}
                                            <br> {{ jadwal_harian.status }}
                                            <br><button @click.prevent="ubahStatus(jadwal_harian.id_jadwal_harian)" class="btn btn-sm btn-info">
                                                    <i class="bi bi-pencil"></i>
                                                </button>
                                            <br> {{ " " }} 
                                        </td>
                                    </tr>
                                </td>
                                <td>
                                    <tr v-for="(jadwal_harian, id_jadwal_harian) in jadwal_harian" :key="id_jadwal_harian">
                                        <td align="center" v-if="jadwal_harian.hari == 'Sabtu'">
                                            {{ jadwal_harian.id_jadwal_harian }}
                                            <br> {{ jadwal_harian.kelas.nama_kelas }}
                                            <br> {{ jadwal_harian.instruktur.nama }}
                                            <br> {{ jadwal_harian.tanggal }}
                                            <br> {{ jadwal_harian.jam_mulai }} {{ "-" }} {{ jadwal_harian.jam_selesai }}
                                            <br> {{ jadwal_harian.status }}
                                            <br><button @click.prevent="ubahStatus(jadwal_harian.id_jadwal_harian)" class="btn btn-sm btn-info">
                                                    <i class="bi bi-pencil"></i>
                                                </button>
                                            <br> {{ " " }} 
                                        </td>
                                    </tr>
                                </td>
                                <td>
                                    <tr v-for="(jadwal_harian, id_jadwal_harian) in jadwal_harian" :key="id_jadwal_harian">
                                        <td align="center" v-if="jadwal_harian.hari == 'Minggu'">
                                            {{ jadwal_harian.id_jadwal_harian }}
                                            <br> {{ jadwal_harian.kelas.nama_kelas }}
                                            <br> {{ jadwal_harian.instruktur.nama }}
                                            <br> {{ jadwal_harian.tanggal }}
                                            <br> {{ jadwal_harian.jam_mulai }} {{ "-" }} {{ jadwal_harian.jam_selesai }}
                                            <br> {{ jadwal_harian.status }}
                                            <br><button @click.prevent="ubahStatus(jadwal_harian.id_jadwal_harian)" class="btn btn-sm btn-info">
                                                    <i class="bi bi-pencil"></i>
                                                </button>
                                            <br> {{ " " }} 
                                        </td>
                                    </tr>
                                </td>
                            </tbody>
                            <!-- <tbody>
                                <tr v-for="(jadwal_harian, id_jadwal_harian) in jadwal_harian" :key="id_jadwal_harian">
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ jadwal_harian.id_jadwal_harian }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ jadwal_harian.kelas.nama_kelas }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ jadwal_harian.instruktur.nama }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ jadwal_harian.hari }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ jadwal_harian.tanggal }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ jadwal_harian.jam_mulai }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ jadwal_harian.jam_selesai }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ jadwal_harian.status }}</span>
                                    </td>
                                    <td class="text-center">
                                        <div class="row align-items-start">
                                            <div class="col-4">
                                                <button @click.prevent="ubahStatus(jadwal_harian.id_jadwal_harian)" class="btn btn-sm btn-info">
                                                    <i class="bi bi-pencil"></i>
                                                </button>
                                            </div>
                                            <div class="col-4">
                                                <button @click.prevent="jadwal_harianDelete(jadwal_harian.id_jadwal_harian)" class="btn btn-sm btn-danger">
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            </tbody> -->
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
        let jadwal_harian = ref([]);
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://arvell.valent.ppcdeveloper.com/api/jadwal_harian")
                .then((response) => {
                    //assign state posts with response data
                    jadwal_harian.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        })

        function generate() {
            axios
                .post("http://arvell.valent.ppcdeveloper.com/api/jadwal_harian", {
                   
                })
                .then(() => {
                    //redirect ke post index
                    window.location.reload();
                })
        }

        function ubahStatus($id_jadwal_harian) {
            axios
                .put("http://arvell.valent.ppcdeveloper.com/api/jadwal_harian/ubahStatus/" +$id_jadwal_harian, {
                    status: 'Libur'
                })
                .then(() => {
                    //redirect ke post index
                    window.location.reload();
                })
        }

        //method delete
        function jadwal_harianDelete(id_jadwal_harian) {
            //delete data post by ID
            axios.delete(`http://arvell.valent.ppcdeveloper.com/api/jadwal_harian/${id_jadwal_harian}`)
            .then(() => {
              //splice posts 
              jadwal_harian.value.splice(jadwal_harian.value.indexOf(id_jadwal_harian), 1);
              window.location.reload();
            }).catch(error => {
                console.log(error.response.data)
            })
        }

        //return
        return {
            jadwal_harian,
            generate,
            ubahStatus,
            jadwal_harianDelete
        };
    },
};
</script>
<style>

</style>