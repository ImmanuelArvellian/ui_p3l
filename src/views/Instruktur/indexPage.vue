<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-12">
                <div class="card">
                    <div class="card-header pb-0">
                        <h3>Instruktur table</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-8">
                                <router-link :to="{ name: 'instruktur.create' }">
                                    <button class="btn btn-md btn-success">
                                        <i class="bi bi-plus">Tambah</i>
                                    </button>
                                </router-link>
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
                                    <th scope="col">ID Instruktur</th>
                                    <th scope="col">Nama Instruktur</th>
                                    <th scope="col">Email</th>
                                    <!-- <th scope="col">Password</th> -->
                                    <th scope="col">Gender</th>
                                    <th scope="col">No Telpon</th>
                                    <th scope="col">Alamat</th>
                                    <th scope="col">Jumlah Terlambat</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(instruktur, id_instruktur) in instruktur" :key="id_instruktur">
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ instruktur.id_instruktur }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ instruktur.nama }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ instruktur.email }}</span>
                                    </td>
                                    <!-- <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ instruktur.password }}</span>
                                    </td> -->
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ instruktur.gender }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ instruktur.no_telp }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ instruktur.alamat }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ instruktur.jumlah_terlambat }}</span>
                                    </td>
                                    <td class="text-center">
                                        <div class="row align-items-start">
                                            <div class="col-4">
                                                <router-link :to="{ name:'instruktur.edit', params: { id_instruktur: instruktur.id_instruktur } }" class="nav-link px-2">
                                                    <button class="btn btn-sm btn-primary">
                                                        <i class="bi bi-pencil"></i>
                                                    </button>
                                                </router-link>
                                            </div>
                                            <div class="col-4">
                                                <button @click.prevent="instrukturDelete(instruktur.id_instruktur)" class="btn btn-sm btn-danger">
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <div class="row align-items-start">
                                            <div class="col-4">
                                                <button @click.prevent="resetTerlambat(instruktur.id_instruktur)" class="btn btn-sm btn-info">
                                                    <i class="bi bi-stopwatch"></i>
                                                </button>
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
        let instruktur = ref([]);
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://localhost:8000/api/instruktur")
                .then((response) => {
                    //assign state posts with response data
                    instruktur.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        })

        //method delete
        function instrukturDelete(id_instruktur) {
            //delete data post by ID
            axios.delete(`http://localhost:8000/api/instruktur/${id_instruktur}`)
            .then(() => {
              //splice posts 
              instruktur.value.splice(instruktur.value.indexOf(id_instruktur), 1);
              window.location.reload();
            }).catch(error => {
                console.log(error.response.data)
            })
        }

        function resetTerlambat($id_instruktur){
            axios
                .post("http://localhost:8000/api/instruktur_reset/" + $id_instruktur, {
                    
                })
                .then(() => {
                    //redirect ke post index
                    window.location.reload();
                }).catch(error => {
                    console.log(error.response.data);
                })
        }

        //return
        return {
            instruktur,
            instrukturDelete,
            resetTerlambat
        };
    },
};
</script>
<style>

</style>