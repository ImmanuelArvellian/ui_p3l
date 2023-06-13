<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h3>Presensi Kelas Already Present table</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-8">
                                <router-link :to="{ name: 'presensikelas_belum.index' }">
                                    <button class="btn btn-md btn-success">
                                        <i class="bi bi-plus">Belum Dipresensi</i>
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
                                    <th scope="col">ID Booking Kelas</th>
                                    <th scope="col">Nama Member</th>
                                    <th scope="col">Nama Kelas</th>
                                    <th scope="col">No Struk</th>
                                    <th scope="col">Tgl Tujuan</th>
                                    <th scope="col">Tgl Presensi</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(data, id_booking_kelas) in booking_kelas" :key="id_booking_kelas">
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ data.id_booking_kelas }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ data.member.nama }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ data.jadwal_harian.kelas.nama_kelas }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ data.no_struk }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ data.tgl_tujuan }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ data.tgl_presensi }}</span>
                                    </td>
                                    <td class="text-center">
                                        <div class="row align-items-start">
                                            <div class="col-5">
                                                <div class="pdf">
                                                    <button v-show="data.tipe_pembayaran == 'Deposit Kelas'" @click.prevent="createStrukKelas(data)" class="btn btn-sm btn-danger">
                                                        <i class="bi bi-printer"></i>
                                                    </button>
                                                    <button v-show="data.tipe_pembayaran == 'Deposit Uang'" @click="createStrukUang(data)" class="btn btn-sm btn-warning">
                                                        <i class="bi bi-printer"></i>
                                                    </button>
                                                    <!-- <button @click.prevent="createCard(booking_kelas.id_booking_kelas, booking_kelas.nama, booking_kelas.alamat, booking_kelas.no_telp)" class="btn btn-sm btn-warning">
                                                        <i class="bi bi-printer"></i>
                                                    </button> -->
                                                </div>
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
        let booking_kelas = ref([]);
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("https://arvell.valent.ppcdeveloper.com/api/booking_kelas_sudah")
                .then((response) => {
                    //assign state posts with response data
                    booking_kelas.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        // name: 'pdf';
        function createStrukUang(data){

            const pdf =  new jsPDF({
                orientation: "landscape",
                unit: "cm",
                format: [11, 14.5]
            });

                pdf.text('Gofit', 0.5, 1)
                pdf.text('Jl. Centralpark No. 10 Yogyakarta', 0.5, 2)
                pdf.text('STRUK PRESENSI KELAS', 0.5, 3.5)
                pdf.text('No Struk                : '+data.no_struk, 0.5, 4.5)
                pdf.text('Tanggal                 : '+data.tgl_presensi, 0.5, 5.5)
                pdf.text('Member                 : '+data.id_member+' / '+data.member.nama, 0.5, 6.5)
                pdf.text('Kelas                     : '+data.jadwal_harian.kelas.nama_kelas, 0.5, 7.5)
                pdf.text('Instruktur               : '+data.jadwal_harian.instruktur.nama, 0.5, 8.5)
                pdf.text('Tarif                       : Rp.'+data.jadwal_harian.kelas.harga, 0.5, 9.5)
                pdf.text('Sisa Deposit          : Rp.'+data.member.sisa_deposit, 0.5, 10.5)
                pdf.save('strukBK_'+data.id_booking_kelas+'.pdf')
        }

        // name: 'pdf';
        function createStrukKelas(data){

            const pdf =  new jsPDF({
                orientation: "landscape",
                unit: "cm",
                format: [11, 14.5]
            });

                pdf.text('Gofit', 0.5, 1)
                pdf.text('Jl. Centralpark No. 10 Yogyakarta', 0.5, 2)
                pdf.text('STRUK PRESENSI KELAS PAKET', 0.5, 3.5)
                pdf.text('No Struk                : '+data.no_struk, 0.5, 4.5)
                pdf.text('Tanggal                 : '+data.tgl_presensi, 0.5, 5.5)
                pdf.text('Member                 : '+data.id_member+' / '+data.member.nama, 0.5, 6.5)
                pdf.text('Kelas                     : '+data.jadwal_harian.kelas.nama_kelas, 0.5, 7.5)
                pdf.text('Instruktur               : '+data.jadwal_harian.instruktur.nama, 0.5, 8.5)
                pdf.text('Sisa Deposit          : '+data.member.sisa_deposit_kelas+'x', 0.5, 9.5)
                pdf.text('Berlaku sampai     : '+data.masa_exp, 0.5, 10.5)
                pdf.save('strukBK_'+data.id_booking_kelas+'.pdf')
        }

        //return
        return {
            booking_kelas,
            createStrukKelas,
            createStrukUang
        };
    },
};
</script>
<style>

</style>