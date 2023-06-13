<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h3>Aktivasi table</h3>
                    </div>
                    <div class="card-body">
                        <router-link :to="{ name: 'aktivasi.create' }" class="btn btn-md btn-success">Tambah </router-link>
                        <table class="table align-items-center mb-0 mt-3">
                            <thead>
                                <tr>
                                    <th scope="col">ID Aktivasi</th>
                                    <th scope="col">Nama Member</th>
                                    <th scope="col">Nama Pegawai</th>
                                    <th scope="col">Tanggal Transaksi</th>
                                    <th scope="col">Masa Aktif</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(aktivasi_tahunan, id_aktivasi_tahunan) in aktivasi_tahunan" :key="id_aktivasi_tahunan">
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ aktivasi_tahunan.id_aktivasi }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ aktivasi_tahunan.member.id_member }} {{ "-" }} {{ aktivasi_tahunan.member.nama }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ aktivasi_tahunan.pegawai.id_pegawai }} {{ "-" }} {{ aktivasi_tahunan.pegawai.nama }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ aktivasi_tahunan.tgl_transaksi }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ aktivasi_tahunan.masa_aktif }}</span>
                                    </td>
                                    <td class="text-center">
                                        <div class="row align-items-start">
                                            <div class="pdf">
                                                <button @click.prevent="createStruk(
                                                    aktivasi_tahunan.no_struk, 
                                                    aktivasi_tahunan.tgl_transaksi, 
                                                    aktivasi_tahunan.id_member, 
                                                    aktivasi_tahunan.member.nama,
                                                    aktivasi_tahunan.masa_aktif,
                                                    aktivasi_tahunan.id_pegawai,
                                                    aktivasi_tahunan.pegawai.nama,
                                                    aktivasi_tahunan.id_aktivasi
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
        let aktivasi_tahunan = ref([]);
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://arvell.valent.ppcdeveloper.com/api/aktivasi_tahunan")
                .then((response) => {
                    //assign state posts with response data
                    aktivasi_tahunan.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        // name: 'pdf';
        function createStruk($no_struk, $tgl_transaksi, $id_member, $nama_member, $masa_aktif, $id_pegawai, $nama_pegawai, $id_aktivasi){

            const pdf =  new jsPDF({
                orientation: "landscape",
                unit: "cm",
                format: [8, 20]
            });

            axios
            .get("http://arvell.valent.ppcdeveloper.com/api/aktivasi_tahunan")
                .then((response) => {
                    //assign state posts with response data
                    aktivasi_tahunan.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
                
                pdf.text('Gofit', 0.5, 1)
                pdf.text('Jl. Centralpark No. 10 Yogyakarta', 0.5, 2)

                pdf.text('No Struk       : '+$no_struk, 13, 1)
                pdf.text('Tanggal        : '+$tgl_transaksi, 13, 2)

                pdf.text('Member                          : '+$id_member+' / '+$nama_member, 0.5, 4.5)
                pdf.text('Aktivasi Tahunan           : Rp 3.000.000', 0.5, 5.5)
                pdf.text('Masa Aktif Member        : '+$masa_aktif, 0.5, 6.5)
                
                pdf.text('Kasir        : '+$id_pegawai+' / '+$nama_pegawai, 13, 7.5)

                pdf.save('strukAktivasi_'+$id_aktivasi+'.pdf')
        }

        //return
        return {
            aktivasi_tahunan,
            createStruk,
        };
    },
};
</script>
<style>

</style>