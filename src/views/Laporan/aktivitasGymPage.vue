<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h3><u>Laporan Aktivitas Gym Bulanan</u></h3>
                    </div>
                    <div class="card-header pb-0">
                        <h6><u>Bulan: {{ bulan }} Tahun: {{ tahun }}</u></h6>
                        <h6>Tanggal cetak: {{ tgl_cetak }}</h6>
                        <button class="btn btn-md btn-success download-pdf" @click="cetakLaporan(bulan, tahun, tgl_cetak)">Cetak Laporan</button>
                    </div>
                    <div class="card-body">
                        <table class="table align-items-center mb-0 mt-3" id="table">
                            <thead>
                                <tr>
                                    <th scope="col">Tanggal</th>
                                    <th scope="col">Jumlah Member</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(laporan_gym, id_laporan_gym) in laporan_gym" :key="id_laporan_gym">
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ laporan_gym.tanggal }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ laporan_gym.jumlah }}</span>
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
import { jsPDF } from "jspdf";
import 'jspdf-autotable';

export default {
    setup() {
        //reactive state
        let laporan_gym = ref([]);
        let bulan = ref([]);
        let tahun = ref([]);
        let tgl_cetak = ref([]);

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://arvell.valent.ppcdeveloper.com/api/laporan_gym")
                .then((response) => {
                    //assign state posts with response data
                    laporan_gym.value = response.data.data;
                    bulan.value = response.data.bulan;
                    tahun.value = response.data.tahun;
                    tgl_cetak.value = response.data.tgl_cetak;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        function cetakLaporan($bulan, $tahun, $tgl_cetak) {

            var elementHTML = document.getElementById("table");

            const doc = new jsPDF({
                    orientation: "portrait",
                    format: 'a4'
            });

            const theme = "grid";

            doc.setFont("helvetica", "bold");
            doc.text("Go-Fit", 15, 20);
            doc.setFont("helvetica", "normal");
            doc.text("Jl. Centralpark No. 10 Yogyakarta", 15, 30);

            doc.setFont("helvetica", "bold");
            doc.text("Laporan Aktivitas Gym Bulanan", 15, 50);
            doc.setFont("helvetica", "normal");
            doc.text("Bulan", 15, 60);
            doc.text(": " + $bulan, 60, 60);
            doc.text("Tahun", 120, 60);
            doc.text(": " + $tahun, 165, 60);
            doc.text("Tanggal Cetak", 15, 70);
            doc.text(": " + $tgl_cetak, 60, 70);

            doc.autoTable(
            {
                html: elementHTML,
                margin: { top: 80 },
                theme: theme
            })

            doc.save('Laporan Aktivitas Gym - ' + $tgl_cetak + '.pdf')
        }

        //return
        return {
            laporan_gym,
            bulan,
            tahun,
            tgl_cetak,
            cetakLaporan
        };
    },
};
</script>
<style>

</style>