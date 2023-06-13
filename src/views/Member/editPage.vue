<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-md-12">
                <div class="card border rounded">
                    <div class="card-header pb-0">
                        <h3>Ubah Member</h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="update">
                            <div class="form-group mb-3">
                                <label for="nama" class="font-weight-bold">Nama Member</label>
                                <input type="text" class="form-control" v-model="member.nama">
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{ validation.nama[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="tgllahir" class="font-weight-bold">Tanggal Lahir</label>
                                <input type="date" class="form-control" v-model="member.tgl_lahir">
                                <!-- validation -->
                                <div v-if="validation.tgl_lahir" class="mt-2 alert alert-danger">
                                    {{ validation.tgl_lahir[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="email" class="font-weight-bold">Email</label>
                                <input type="email" class="form-control" v-model="member.email">
                                <!-- validation -->
                                <div v-if="validation.email" class="mt-2 alert alert-danger">
                                    {{ validation.email[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="password" class="font-weight-bold">Password</label>
                                <input type="text" class="form-control" v-model="member.password">
                                <!-- validation -->
                                <div v-if="validation.password" class="mt-2 alert alert-danger">
                                    {{ validation.password[0] }}
                                </div>
                            </div>
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
                                <label for="no_telp" class="font-weight-bold">No Telpon</label>
                                <input type="text" class="form-control" v-model="member.no_telp">
                                <!-- validation -->
                                <div v-if="validation.no_telp" class="mt-2 alert alert-danger">
                                    {{ validation.no_telp[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label for="alamat" class="font-weight-bold">Alamat</label>
                                <input type="text" class="form-control" v-model="member.alamat">
                                <!-- validation -->
                                <div v-if="validation.alamat" class="mt-2 alert alert-danger">
                                    {{ validation.alamat[0] }}
                                </div>
                            </div>
                            <div class="form-group mb-3">
                                <label class="form-label">Status Membership</label>
                                <select class="form-control" v-model="member.status_membership">
                                    <option disabled value="">Status Membership</option>
                                    <option value="1">Aktif</option>
                                    <option value="0">Tidak Aktif</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.status_membership" class="mt-2 alert alert-danger">
                                    {{ validation.status_membership[0] }}
                                </div>
                            </div><div class="form-group mb-3">
                                <label for="tgldaftar" class="font-weight-bold">Tanggal Daftar</label>
                                <input type="text" class="form-control" v-model="member.tgl_daftar">
                                <!-- validation -->
                                <div v-if="validation.tgl_daftar" class="mt-2 alert alert-danger">
                                    {{ validation.tgl_daftar[0] }}
                                </div>
                            </div><div class="form-group mb-3">
                                <label for="tglexp" class="font-weight-bold">Masa Akhir Membership</label>
                                <input type="text" class="form-control" v-model="member.tgl_exp_membership">
                                <!-- validation -->
                                <div v-if="validation.tgl_exp_membership" class="mt-2 alert alert-danger">
                                    {{ validation.tgl_exp_membership[0] }}
                                </div>
                            </div><div class="form-group mb-3">
                                <label for="sisa" class="font-weight-bold">Sisa Deposit</label>
                                <input type="text" class="form-control" v-model="member.sisa_deposit">
                                <!-- validation -->
                                <div v-if="validation.sisa_deposit" class="mt-2 alert alert-danger">
                                    {{ validation.sisa_deposit[0] }}
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
        //state members
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
            axios.get(`http://arvell.valent.ppcdeveloper.com/api/member/${route.params.id_member}`,)
            .then(response => {
              
              //assign state members with response data
              member.nama    = response.data.data.nama  
              member.tgl_lahir    = response.data.data.tgl_lahir 
              member.email  = response.data.data.email 
              member.password    = response.data.data.password  
              member.gender  = response.data.data.gender 
              member.no_telp    = response.data.data.no_telp  
              member.alamat  = response.data.data.alamat 
              member.status_membership    = response.data.data.status_membership  
              member.tgl_daftar  = response.data.data.tgl_daftar 
              member.tgl_exp_membership    = response.data.data.tgl_exp_membership  
              member.sisa_deposit  = response.data.data.sisa_deposit 

            }).catch(error => {
                console.log(error.response.data)
            })
        })

        //method update
        function update() {
            let nama   = member.nama
            let tgl_lahir   = member.tgl_lahir
            let email = member.email
            let password   = member.password
            let gender = member.gender
            let no_telp   = member.no_telp
            let alamat = member.alamat
            let status_membership   = member.status_membership
            let tgl_daftar = member.tgl_daftar
            let tgl_exp_membership   = member.tgl_exp_membership
            let sisa_deposit = member.sisa_deposit

            axios
            .put(`http://arvell.valent.ppcdeveloper.com/api/member/${route.params.id_member}`, {
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
            }).then(() => {
                //redirect ke member index
                router.push({
                    name: 'member.index'
                })
            }).catch(error => {
                //assign state validation with error 
                validation.value = error.response.data
            })
        }

        //return
        return {
            member,
            validation,
            router,
            update
        }
    }
}
</script>

<style>

</style>