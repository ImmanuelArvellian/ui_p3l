<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-md-12">
                <div class="card border rounded">
                    <div class="card-header pb-0">
                        <h3>Tambah Instruktur</h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Instruktur</label>
                                <input type="text" class="form-control" v-model="instruktur.nama"
                                    placeholder="Masukkan nama instruktur" />
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{ validation.nama[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" v-model="instruktur.email"
                                    placeholder="Masukkan email" />
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Password</label>
                                <input class="form-control" v-model="instruktur.password"
                                    placeholder="Masukkan password" />
                                <!-- validation -->
                                <div v-if="validation.password" class="mt-2 alert alert-danger">
                                    {{ validation.password[0] }}
                                </div>
                            </div>
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
                                <label class="form-label">No Telpon</label>
                                <input class="form-control" v-model="instruktur.no_telp"
                                    placeholder="Masukkan nomor telpon" />
                                <!-- validation -->
                                <div v-if="validation.no_telp" class="mt-2 alert alert-danger">
                                    {{ validation.no_telp[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Alamat</label>
                                <input class="form-control" v-model="instruktur.alamat"
                                    placeholder="Masukkan alamat" />
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
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
    setup() {
        //state instruktur
        const instruktur = reactive({
            nama: "",
            email: "",
            password: "",
            gender: "",
            no_telp: "",
            alamat: "",
        });

        //state validation
        const validation = ref([]);
        
        //vue router
        const router = useRouter();

        //method store
        function store() {
            let nama = instruktur.nama;
            let email = instruktur.email;
            let password = instruktur.password;
            let gender = instruktur.gender;
            let no_telp = instruktur.no_telp;
            let alamat = instruktur.alamat;
            axios
                .post("http://localhost:8000/api/instruktur", {
                    nama: nama,
                    email: email,
                    password: password,
                    gender: gender,
                    no_telp: no_telp,
                    alamat: alamat,
                })
                .then(() => {
                    //redirect ke post index
                    router.push({
                        name: "instruktur.index",
                    });
                })
                .catch((error) => {
                    //assign state validation with error
                    validation.value = error.response.data;
                });
        }
        //return
        return {
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