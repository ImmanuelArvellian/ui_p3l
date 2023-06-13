<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h3>Presensi Gym Already Present table</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-8">
                                <router-link :to="{ name: 'presensigym_belum.index' }">
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
                                    <th scope="col">ID Booking Gym</th>
                                    <th scope="col">Nama Member</th>
                                    <th scope="col">Sesi</th>
                                    <th scope="col">No Struk</th>
                                    <th scope="col">Tgl Tujuan</th>
                                    <th scope="col">Tgl Presensi</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(booking_gym, id_booking_gym) in booking_gym" :key="id_booking_gym">
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ booking_gym.id_booking_gym }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ booking_gym.member.nama }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ booking_gym.id_sesi }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ booking_gym.no_struk }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ booking_gym.tgl_tujuan }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ booking_gym.tgl_presensi }}</span>
                                    </td>
                                    <td class="text-center">
                                        <div class="row align-items-start">
                                            <div class="col-5">
                                                <div class="pdf">
                                                    <button @click.prevent="createStruk(
                                                        booking_gym.no_struk, 
                                                        booking_gym.tgl_presensi, 
                                                        booking_gym.id_member,
                                                        booking_gym.member.nama, 
                                                        booking_gym.sesi.jam_mulai,
                                                        booking_gym.sesi.jam_selesai,
                                                        booking_gym.id_booking_gym)" class="btn btn-sm btn-warning">
                                                    <!-- <button @click.prevent="createCard(booking_gym.id_booking_gym)" class="btn btn-sm btn-warning"> -->
                                                        <i class="bi bi-printer"></i>
                                                    </button>
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
        let booking_gym = ref([]);
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("https://arvell.valent.ppcdeveloper.com/api/booking_gym_sudah")
                .then((response) => {
                    //assign state posts with response data
                    booking_gym.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        // name: 'pdf';
        function createStruk($no_struk, $tgl_presensi, $id_member, $nama_member, $jam_mulai, $jam_selesai, $id_booking_gym){

            const pdf =  new jsPDF({
                orientation: "landscape",
                unit: "cm",
                format: [8, 11.5]
            });

            axios
            .get("https://arvell.valent.ppcdeveloper.com/api/booking_gym_sudah")
                .then((response) => {
                    //assign state posts with response data
                    booking_gym.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });

                pdf.text('Gofit', 0.5, 1)
                pdf.text('Jl. Centralpark No. 10 Yogyakarta', 0.5, 2)
                pdf.text('STRUK PRESENSI GYM', 0.5, 3.5)
                pdf.text('No Struk     : '+$no_struk, 0.5, 4.5)
                pdf.text('Tanggal      : '+$tgl_presensi, 0.5, 5.5)
                pdf.text('Member      : '+$id_member+' / '+$nama_member, 0.5, 6.5)
                pdf.text('Slot Waktu  : '+$jam_mulai+' - '+$jam_selesai, 0.5, 7.5)
                pdf.save('strukBG_'+$id_booking_gym+'.pdf')
        }

        //return
        return {
            booking_gym,
            createStruk
        };
    },
};
</script>
<style>

</style>