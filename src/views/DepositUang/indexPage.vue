<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h3>Deposit Uang table</h3>
                    </div>
                    <div class="card-body">
                        <router-link :to="{ name: 'depuang.create' }" class="btn btn-md btn-success">Tambah </router-link>
                        <table class="table align-items-center mb-0 mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">ID Deposit Umum</th>
                                    <th scope="col">Nama Member</th>
                                    <th scope="col">Nama Pegawai</th>
                                    <th scope="col">Tanggal Transaksi</th>
                                    <th scope="col">Deposit Uang</th>
                                    <th scope="col">Bonus Deposit</th>
                                    <th scope="col">Sisa Deposit</th>
                                    <th scope="col">Total Deposit</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(deposit_umum, id_deposit_umum) in deposit_umum" :key="id_deposit_umum">
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ deposit_umum.id_deposit_umum }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ deposit_umum.member.id_member }} {{ "-" }} {{ deposit_umum.member.nama }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ deposit_umum.pegawai.id_pegawai }} {{ "-" }} {{ deposit_umum.pegawai.nama }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ deposit_umum.tgl_transaksi }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ deposit_umum.deposit_uang }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ deposit_umum.bonus_deposit }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ deposit_umum.sisa_deposit }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ deposit_umum.total_deposit }}</span>
                                    </td>
                                    <td class="text-center">
                                        <div class="row align-items-start">
                                            <div class="pdf">
                                                <button @click.prevent="createStruk(
                                                    deposit_umum.no_struk, 
                                                    deposit_umum.tgl_transaksi, 
                                                    deposit_umum.id_member, 
                                                    deposit_umum.member.nama,
                                                    deposit_umum.deposit_uang,
                                                    deposit_umum.bonus_deposit,
                                                    deposit_umum.sisa_deposit,
                                                    deposit_umum.total_deposit,
                                                    deposit_umum.id_pegawai,
                                                    deposit_umum.pegawai.nama,
                                                    deposit_umum.id_deposit_umum,
                                                    )" class="btn btn-sm btn-warning">
                                                    <i class="bi bi-printer"></i>
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
import jsPDF from "jspdf";
export default {
    setup() {
        //reactive state
        let deposit_umum = ref([]);
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://localhost:8000/api/deposit_umum")
                .then((response) => {
                    //assign state posts with response data
                    deposit_umum.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        // name: 'pdf';
        function createStruk($no_struk, $tgl_transaksi, $id_member, $nama_member, $deposit_uang, $bonus_deposit, $sisa_deposit, $total_deposit, $id_pegawai, $nama_pegawai, $id_deposit_umum){

            const pdf =  new jsPDF({
                orientation: "landscape",
                unit: "cm",
                format: [10, 20]
            });

            axios
            .get("http://localhost:8000/api/deposit_umum")
                .then((response) => {
                    //assign state posts with response data
                    deposit_umum.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
                
                pdf.text('Gofit', 0.5, 1)
                pdf.text('Jl. Centralpark No. 10 Yogyakarta', 0.5, 2)

                pdf.text('No Struk       : '+$no_struk, 13, 1)
                pdf.text('Tanggal        : '+$tgl_transaksi, 13, 2)

                pdf.text('Member                : '+$id_member+' / '+$nama_member, 0.5, 4.5)
                pdf.text('Deposit                 : Rp'+$deposit_uang, 0.5, 5.5)
                pdf.text('Bonus Deposit       : Rp'+$bonus_deposit, 0.5, 6.5)
                pdf.text('Sisa Deposit           : Rp'+$sisa_deposit, 0.5, 7.5)
                pdf.text('Total Deposit         : Rp'+$total_deposit, 0.5, 8.5)
                
                pdf.text('Kasir        : '+$id_pegawai+' / '+$nama_pegawai, 13, 9.5)

                pdf.save('strukDepUang_'+$id_deposit_umum+'.pdf')
        }

        //return
        return {
            deposit_umum,
            createStruk,
        };
    },
};
</script>
<style>

</style>