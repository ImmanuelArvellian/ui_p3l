<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h3>Presensi Gym Not Yet Present table</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <div class="col-8">
                                <!-- <router-link :to="{ name: 'booking_gym.create' }">
                                    <button class="btn btn-md btn-success">
                                        <i class="bi bi-plus">Tambah</i>
                                    </button>
                                </router-link> -->
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
                                    <td class="text-center">
                                        <div class="row align-items-start">
                                            <div class="col-4">
                                                <button @click.prevent="presensi(booking_gym.id_booking_gym)" class="btn btn-sm btn-info">
                                                    <i class="bi bi-card-checklist"></i>
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
export default {
    setup() {
        //reactive state
        let booking_gym = ref([]);

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("https://arvell.valent.ppcdeveloper.com/api/booking_gym_belum")
                .then((response) => {
                    //assign state posts with response data
                    booking_gym.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        function presensi($id_booking_gym) {
            axios
                .post("https://arvell.valent.ppcdeveloper.com/api/booking_gym_presensi/" +$id_booking_gym, {

                })
                .then(() => {
                    window.location.reload();
                })
        }

        //return
        return {
            booking_gym,
            presensi
        };
    },
};
</script>
<style>

</style>