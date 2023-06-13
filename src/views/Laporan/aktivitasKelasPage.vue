<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h3><u>Laporan Aktivitas Kelas Bulanan</u></h3>
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
                                    <th scope="col">Kelas</th>
                                    <th scope="col">Instruktur</th>
                                    <th scope="col">Jumlah Peserta</th>
                                    <th scope="col">Jumlah Libur</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(laporan_kelas, id_laporan_kelas) in laporan_kelas" :key="id_laporan_kelas">
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ laporan_kelas.kelas }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ laporan_kelas.instruktur }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ laporan_kelas.jumlah_peserta }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ laporan_kelas.jumlah_libur }}</span>
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
        let laporan_kelas = ref([]);
        let bulan = ref([]);
        let tahun = ref([]);
        let tgl_cetak = ref([]);

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("https://arvell.valent.ppcdeveloper.com/api/laporan_kelas")
                .then((response) => {
                    //assign state posts with response data
                    laporan_kelas.value = response.data.data;
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
                    orientation: "landscape",
                    format: 'a4'
            });

            const theme = "grid";

            doc.setFont("helvetica", "bold");
            doc.text("Go-Fit", 15, 20);
            doc.setFont("helvetica", "normal");
            doc.text("Jl. Centralpark No. 10 Yogyakarta", 15, 30);

            doc.setFont("helvetica", "bold");
            doc.text("Laporan Aktivitas Kelas Bulanan", 15, 50);
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

            doc.save('Laporan Aktivitas Kelas - ' + $tgl_cetak + '.pdf')
        }

        //return
        return {
            laporan_kelas,
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