<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h3>Deposit Kelas table</h3>
                    </div>
                    <div class="card-body">
                        <router-link :to="{ name: 'depkelas.create' }" class="btn btn-md btn-success">Tambah </router-link>
                        <table class="table align-items-center mb-0 mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">ID Deposit Kelas</th>
                                    <th scope="col">Nama Member</th>
                                    <th scope="col">Nama Pegawai</th>
                                    <th scope="col">Nama Kelas</th>
                                    <th scope="col">Tanggal Transaksi</th>
                                    <th scope="col">Harga Deposit Kelas</th>
                                    <th scope="col">Bonus Deposit Kelas</th>
                                    <th scope="col">Jumlah Deposit Kelas</th>
                                    <th scope="col">Total Deposit Kelas</th>
                                    <th scope="col">Masa Kadaluarsa</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(deposit_kelas, id_deposit_kelas) in deposit_kelas" :key="id_deposit_kelas">
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ deposit_kelas.id_deposit_kelas }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ deposit_kelas.member.id_member }} {{ "-" }} {{ deposit_kelas.member.nama }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ deposit_kelas.pegawai.id_pegawai }} {{ "-" }} {{ deposit_kelas.pegawai.nama }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ deposit_kelas.kelas.nama_kelas }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ deposit_kelas.tgl_transaksi }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ deposit_kelas.uang_deposit_kelas }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ deposit_kelas.bonus_deposit_kelas }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ deposit_kelas.sisa_deposit_kelas }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ deposit_kelas.total_deposit_kelas }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ deposit_kelas.masa_exp }}</span>
                                    </td>
                                    <td class="text-center">
                                        <div class="row align-items-start">
                                            <div class="col-4">
                                                <div class="pdf">
                                                    <button @click.prevent="createStruk(
                                                        deposit_kelas.no_struk, 
                                                        deposit_kelas.tgl_transaksi, 
                                                        deposit_kelas.id_member, 
                                                        deposit_kelas.member.nama,
                                                        deposit_kelas.sisa_deposit_kelas,
                                                        deposit_kelas.bonus_deposit_kelas,
                                                        deposit_kelas.uang_deposit_kelas,
                                                        deposit_kelas.kelas.harga,
                                                        deposit_kelas.kelas.nama_kelas,
                                                        deposit_kelas.total_deposit_kelas,
                                                        deposit_kelas.masa_exp,
                                                        deposit_kelas.id_pegawai,
                                                        deposit_kelas.pegawai.nama,
                                                        deposit_kelas.id_deposit_kelas,
                                                        )" class="btn btn-sm btn-warning">
                                                        <i class="bi bi-printer"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div class="col-4">
                                                <button @click.prevent="resetDeposit(deposit_kelas.id_deposit_kelas)" class="btn btn-sm btn-danger">
                                                    <i class="bi bi-backspace"></i>
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
        let deposit_kelas = ref([]);
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://arvell.valent.ppcdeveloper.com/api/deposit_kelas")
                .then((response) => {
                    //assign state posts with response data
                    deposit_kelas.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        // name: 'pdf';
        function createStruk($no_struk, $tgl_transaksi, $id_member, $nama_member, $sisa_deposit_kelas, $bonus_deposit_kelas, $uang_deposit_kelas, $harga_kelas, $nama_kelas, $total_deposit_kelas, $masa_exp, $id_pegawai, $nama_pegawai, $id_deposit_kelas){

            const pdf =  new jsPDF({
                orientation: "landscape",
                unit: "cm",
                format: [10, 20]
            });

            axios
            .get("http://arvell.valent.ppcdeveloper.com/api/deposit_kelas")
                .then((response) => {
                    //assign state posts with response data
                    deposit_kelas.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
                
                pdf.text('Gofit', 0.5, 1)
                pdf.text('Jl. Centralpark No. 10 Yogyakarta', 0.5, 2)

                pdf.text('No Struk       : '+$no_struk, 13, 1)
                pdf.text('Tanggal        : '+$tgl_transaksi, 13, 2)

                pdf.text('Member                            : '+$id_member+' / '+$nama_member, 0.5, 4.5)
                pdf.text('Deposit (bayar '+$sisa_deposit_kelas+' gratis '+$bonus_deposit_kelas+') : Rp'+$uang_deposit_kelas+' ('+$sisa_deposit_kelas+' x Rp'+$harga_kelas+')', 0.5, 5.5)
                pdf.text('Jenis Kelas                       : '+$nama_kelas, 0.5, 6.5)
                pdf.text('Total Deposit                     : '+$total_deposit_kelas, 0.5, 7.5)
                pdf.text('Berlaku sampai dengan    : '+$masa_exp, 0.5, 8.5)
                
                pdf.text('Kasir        : '+$id_pegawai+' / '+$nama_pegawai, 13, 9.5)

                pdf.save('strukDepkelas_'+$id_deposit_kelas+'.pdf')
        }

        function resetDeposit($id_deposit_kelas) {
            axios
                .post("http://arvell.valent.ppcdeveloper.com/api/deposit_kelas_reset/" + $id_deposit_kelas, {
                    
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
            deposit_kelas,
            createStruk,
            resetDeposit
        };
    },
};
</script>
<style>

</style>