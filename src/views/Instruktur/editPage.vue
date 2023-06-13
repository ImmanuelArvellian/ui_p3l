<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-md-12">
                <div class="card border rounded">
                    <div class="card-header pb-0">
                        <h3>Ubah Instruktur</h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label for="nama" class="font-weight-bold">Nama Instruktur</label>
                                <input type="text" class="form-control" v-model="instruktur.nama">
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{ validation.nama[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="email" class="font-weight-bold">Email</label>
                                <input type="email" class="form-control" v-model="instruktur.email">
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0] }}
                                </div>
                            </div>
                            <!-- <div class="form-group mb-3">
                                <label for="password" class="font-weight-bold">Password</label>
                                <input type="text" class="form-control" v-model="instruktur.password"> -->
                                <!-- validation -->
                                <!-- <div v-if="validation.password" class="mt-2 alert alert-danger">
                                    {{ validation.password[0] }}
                                </div>
                            </div> -->
                            <div class="form-group mb-3">
                                <label class="form-label">Gender</label>
                                <select class="form-control" v-model="instruktur.gender">
                                    <option disabled value="">Pilih Gender</option>
                                    <option value="Pria">Pria</option>
                                    <option value="Wanita">Wanita</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.gender" class="mt-2 alert alert-danger">
                                    {{ validation.gender[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="no_telp" class="font-weight-bold">No Telpon</label>
                                <input type="text" class="form-control" v-model="instruktur.no_telp">
                                <!-- validation -->
                                <div v-if="validation.no_telp" class="mt-2 alert alert-danger">
                                    {{ validation.no_telp[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="alamat" class="font-weight-bold">Alamat</label>
                                <input type="text" class="form-control" v-model="instruktur.alamat">
                                <!-- validation -->
                                <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                                    {{ validation.alamat[0] }}
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
import { reactive, ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import axios from 'axios'

export default {
    setup() {
        //state instrukturs
        const instruktur = reactive({
            nama: "",
            email: "",
            password: "",
            gender: "",
            no_telp: "",
            alamat: "",
        })

        //state validation
        const validation = ref([])
        //vue router
        const router = useRouter()
        //vue route
        const route = useRoute()

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios.get(`http://arvell.valent.ppcdeveloper.com/api/instruktur/${route.params.id_instruktur}`,)
            .then(response => {
              
              //assign state instrukturs with response data
              instruktur.nama    = response.data.data.nama  
              instruktur.email  = response.data.data.email 
              instruktur.password    = response.data.data.password  
              instruktur.gender  = response.data.data.gender 
              instruktur.no_telp    = response.data.data.no_telp  
              instruktur.alamat  = response.data.data.alamat 

            }).catch(error => {
                console.log(error.response.data)
            })
        })

        //method update
        function update() {
            let nama   = instruktur.nama
            let email = instruktur.email
            let password   = instruktur.password
            let gender = instruktur.gender
            let no_telp   = instruktur.no_telp
            let alamat = instruktur.alamat

            axios
            .put(`http://arvell.valent.ppcdeveloper.com/api/instruktur/${route.params.id_instruktur}`, {
                nama: nama,
                email: email,
                password: password,
                gender: gender,
                no_telp: no_telp,
                alamat: alamat,
            }).then(() => {
                //redirect ke instruktur index
                router.push({
                    name: 'instruktur.index'
                })
            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })
        }

        //return
        return {
            instruktur,
            validation,
            router,
            update
        }
    }
}
</script>

<style>

</style>