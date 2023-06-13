<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-md-12">
                <div class="card border rounded">
                    <div class="card-header pb-0">
                        <h3>Tambah Deposit Kelas</h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Member</label>
                                <select type="text" class="form-control" v-model="deposit_kelas.id_member"
                                    placeholder="Masukkan nama member">
                                    <option disabled value="">Pilih Nama Member</option>
                                    <option v-for="(atr, id_member) in member" :key="id_member" v-bind:value="atr.id_member">
                                        {{ atr.nama }}
                                    </option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{ validation.nama[0] }}
                                </div>
                            </div>
                            <!-- <div class="form-group mb-3">
                                <label class="form-label">Nama Pegawai</label>
                                <select class="form-control" v-model="deposit_kelas.id_pegawai"
                                    placeholder="Masukkan nama pegawai">
                                    <option disabled value="">Pilih Nama Pegawai</option>
                                    <option v-for="(atr, id_pegawai) in pegawai" :key="id_pegawai" v-bind:value="atr.id_pegawai">
                                        {{ atr.nama }}
                                    </option>
                                </select> -->
                                <!-- validation -->
                                <!-- <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{ validation.nama[0] }}
                                </div>
                            </div> -->
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Kelas</label>
                                <select class="form-control" v-model="deposit_kelas.id_kelas"
                                    placeholder="Masukkan nama pegawai">
                                    <option disabled value="">Pilih Kelas</option>
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
                                <label class="form-label">Deposit Kelas</label>
                                <select class="form-control" v-model="deposit_kelas.sisa_deposit_kelas">
                                    <option disabled value="">Masukkan Deposit Kelas</option>
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                </select>
                                <!-- validation -->
                                <div v-if="validation.sisa_deposit_kelas" class="mt-2 alert alert-danger">
                                    {{ validation.sisa_deposit_kelas[0] }}
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
        const deposit_kelas = reactive({
            id_member: '',
            id_pegawai: '',
            id_kelas: '',
            sisa_deposit_kelas: '',
        });

        const member = ref([]);
        const pegawai = ref([]);
        const kelas = ref([]);

        //state validation
        const validation = ref([]);
        
        //vue router
        const router = useRouter();

        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("https://arvell.valent.ppcdeveloper.com/api/member")
                .then((response) => {
                    //assign state posts with response data
                    member.value = response.data.data;
                    console.log(member.value)
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
            
            axios
                .get("https://arvell.valent.ppcdeveloper.com/api/pegawai")
                .then((response) => {
                    //assign state posts with response data
                    pegawai.value = response.data.data;
                    console.log(pegawai.value)
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
            let id_member = deposit_kelas.id_member;
            let id_pegawai = localStorage.getItem('Id_User');
            let id_kelas = deposit_kelas.id_kelas;
            let sisa_deposit_kelas = deposit_kelas.sisa_deposit_kelas;

            axios
                .post("https://arvell.valent.ppcdeveloper.com/api/deposit_kelas", {
                    id_member: id_member,
                    id_pegawai: id_pegawai,
                    id_kelas: id_kelas,
                    sisa_deposit_kelas: sisa_deposit_kelas,
                })
                .then(() => {
                    //redirect ke post index
                    router.push({
                        name: "depkelas.index",
                    });
                })
                .catch((error) => {
                    //assign state validation with error
                    validation.value = error.response.data;
                });
        }
        //return
        return {
            deposit_kelas,
            member,
            pegawai,
            kelas,
            validation,
            router,
            store,
        };
    },
};
</script>
<style>

</style>