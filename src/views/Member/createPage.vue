<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-md-12">
                <div class="card border rounded">
                    <div class="card-header pb-0">
                        <h3>Tambah Member</h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Member</label>
                                <input type="text" class="form-control" v-model="member.nama"
                                    placeholder="Masukkan nama member" />
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{ validation.nama[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Tanggal Lahir</label>
                                <input type="date" class="form-control" v-model="member.tgl_lahir"
                                    placeholder="Masukkan tanggal lahir" />
                                <!-- validation -->
                                <div v-if="validation.tgl_lahir" class="mt-2 alert alert-danger">
                                    {{ validation.tgl_lahir[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Email</label>
                                <input type="email" class="form-control" v-model="member.email"
                                    placeholder="Masukkan email" />
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0] }}
                                </div>
                            </div>
                            <!-- <div class="form-group mb-3">
                                <label class="form-label">Password</label>
                                <input type="text" class="form-control" v-model="member.password"
                                    placeholder="Masukkan password" /> -->
                                <!-- validation -->
                                <!-- <div v-if="validation.password" class="mt-2 alert alert-danger">
                                    {{ validation.password[0] }}
                                </div>
                            </div> -->
                            <div class="form-group mb-3">
                                <label class="form-label">Gender</label>
                                <select class="form-control" v-model="member.gender">
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
                                <input type="text" class="form-control" v-model="member.no_telp"
                                    placeholder="Masukkan nomor telpon" />
                                <!-- validation -->
                                <div v-if="validation.no_telp" class="mt-2 alert alert-danger">
                                    {{ validation.no_telp[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Alamat</label>
                                <input type="text" class="form-control" v-model="member.alamat"
                                    placeholder="Masukkan alamat" />
                                <!-- validation -->
                                <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                                    {{ validation.alamat[0] }}
                                </div>
                            </div>
                            <!-- <div class="form-group mb-3">
                                <label class="form-label">Tanggal Daftar</label>
                                <input type="date" class="form-control" v-model="member.tgl_daftar"
                                    placeholder="Masukkan tanggal daftar" /> -->
                                <!-- validation -->
                                <!-- <div v-if="validation.tgl_daftar" class="mt-2 alert alert-danger">
                                    {{ validation.tgl_daftar[0] }}
                                </div>
                            </div> -->
                            <!-- <div class="form-group mb-3">
                                <label class="form-label">Masa Akhir Membership</label>
                                <input type="date" class="form-control" v-model="member.tgl_exp_membership"
                                    placeholder="Masukkan masa akhir membership" /> -->
                                <!-- validation -->
                                <!-- <div v-if="validation.tgl_exp_membership" class="mt-2 alert alert-danger">
                                    {{ validation.tgl_exp_membership[0] }}
                                </div>
                            </div> -->
                            <!-- <div class="form-group mb-3">
                                <label class="form-label">Sisa Deposit</label>
                                <input type="text" class="form-control" v-model="member.sisa_deposit"
                                    placeholder="Masukkan deposit" /> -->
                                <!-- validation -->
                                <!-- <div v-if="validation.sisa_deposit" class="mt-2 alert alert-danger">
                                    {{ validation.sisa_deposit[0] }}
                                </div>
                            </div> -->
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
        //state member
        const member = reactive({
            nama: "",
            tgl_lahir: "",
            email: "",
            password: "",
            gender: "",
            no_telp: "",
            alamat: "",
            status_membership: "",
            tgl_daftar: "",
            tgl_exp_membership: "",
            sisa_deposit: "",
        });

        //state validation
        const validation = ref([]);

        //vue router
        const router = useRouter();
        
        //method store
        function store() {
            let nama = member.nama;
            let tgl_lahir = member.tgl_lahir;
            let email = member.email;
            let password = member.password;
            let gender = member.gender;
            let no_telp = member.no_telp;
            let alamat = member.alamat;
            let status_membership = member.status_membership;
            let tgl_daftar = member.tgl_daftar;
            let tgl_exp_membership = member.tgl_exp_membership;
            let sisa_deposit = member.sisa_deposit;
            axios
                .post("http://localhost:8000/api/member", {
                    nama: nama,
                    tgl_lahir: tgl_lahir,
                    email: email,
                    password: password,
                    gender: gender,
                    no_telp: no_telp,
                    alamat: alamat,
                    status_membership: status_membership,
                    tgl_daftar: tgl_daftar,
                    tgl_exp_membership: tgl_exp_membership,
                    sisa_deposit: sisa_deposit,
                })
                .then(() => {
                    //redirect ke post index
                    router.push({
                        name: "member.index",
                    });
                })
                .catch((error) => {
                    //assign state validation with error
                    validation.value = error.response.data;
                });
        }
        //return
        return {
            member,
            validation,
            router,
            store,
        };
    },
};
</script>
<style>

</style>