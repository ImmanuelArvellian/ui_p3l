<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-md-12">
                <div class="card border rounded">
                    <div class="card-header pb-0">
                        <h3>Tambah Aktivasi</h3>
                    </div>
                    <div class="card-body">
                        <form @submit.prevent="store">
                            <div class="form-group mb-3">
                                <label class="form-label">Nama Member</label>
                                <select type="text" class="form-control" v-model="aktivasi_tahunan.id_member"
                                    placeholder="Masukkan nama member">
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
                                <select class="form-control" v-model="aktivasi_tahunan.id_pegawai"
                                    placeholder="Masukkan nama pegawai">
                                    <option v-for="(atr, id_pegawai) in pegawai" :key="id_pegawai" v-bind:value="atr.id_pegawai">
                                        {{ atr.nama }}
                                    </option>
                                </select>
                               
                                <div v-if="validation.nama" class="mt-2 alert alert-danger">
                                    {{ validation.nama[0] }}
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
import { reactive, ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
export default {
    setup() {
        //state instruktur
        const aktivasi_tahunan = reactive({
            id_member: '',
            id_pegawai: '',
        });

        const member = ref([]);
        const pegawai = ref([]);

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
        })

        //method store
        function store() {
            let id_member = aktivasi_tahunan.id_member;
            let id_pegawai = localStorage.getItem('Id_User');

            axios
                .post("https://arvell.valent.ppcdeveloper.com/api/aktivasi_tahunan", {
                    id_member: id_member,
                    id_pegawai: id_pegawai,
                })
                .then(() => {
                    //redirect ke post index
                    router.push({
                        name: "aktivasi.index",
                    });
                })
                .catch((error) => {
                    //assign state validation with error
                    validation.value = error.response.data;
                });
        }
        //return
        return {
            aktivasi_tahunan,
            member,
            pegawai,
            validation,
            router,
            store,
        };
    },
};
</script>
<style>

</style>