<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h3><u>Laporan Pendapatan Bulanan</u></h3>
                    </div>
                    <div class="card-header pb-0">
                        <h6>Periode: {{ tahun }}</h6>
                        <h6>Tanggal cetak: {{ tgl_cetak }}</h6>
                        <button class="btn btn-md btn-success download-pdf" @click="cetakLaporan(tahun, tgl_cetak)">Cetak Laporan</button>
                    </div>
                    <div class="card-body">
                        <table class="table align-items-center mb-0 mt-3" id="table">
                            <thead>
                                <tr>
                                    <th scope="col">Bulan</th>
                                    <th scope="col">Aktivasi</th>
                                    <th scope="col">Deposit</th>
                                    <th scope="col">Total</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(laporan_pendapatan, id_laporan_pendapatan) in laporan_pendapatan" :key="id_laporan_pendapatan">
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ laporan_pendapatan.bulan }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ laporan_pendapatan.aktivasi }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ laporan_pendapatan.totalDeposit }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ laporan_pendapatan.total }}</span>
                                    </td>
                                </tr>
                                <tr>                                   
                                    <td colspan="3"><B>Total</B></td>
                                    <td>{{ laporan_pendapatan.total_semua }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div class="card-body" ref="graph">
                    <div class="d-flex justify-content-between flex-wrap flex-mdnowrap align-items-center pt-3 pb-2 mb-3">
                        <h3><b><u>Graph Laporan Bulanan</u></b></h3>
                        <canvas id="myChart"></canvas>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from "axios";
import { onMounted, ref } from "vue";
import Chart from 'chart.js/auto';
import { jsPDF } from "jspdf";
import 'jspdf-autotable';
// import html2canvas from 'html2canvas';

export default {
    setup() {
        //reactive state
        let laporan_pendapatan = ref([]);
        let tahun = ref([]);
        let tgl_cetak = ref([]);

        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://127.0.0.1:8000/api/laporan_pendapatan")
                .then((response) => {
                //assign state posts with response data
                laporan_pendapatan.value = response.data.data;
                tahun.value = response.data.tahun;
                tgl_cetak.value = response.data.tgl_cetak;
                // console.log(laporan_pendapatan.value);
                
                const ctx = document.getElementById('myChart');
                const labels = [];
                const dataValues = [];

                for (let i = 0; i < laporan_pendapatan.value.length; i++) {
                    const item = laporan_pendapatan.value[i];
                    const bulanValue = item.bulan;
                    const totalValue = item.total;

                    // Menambahkan nilai ke dalam array labels dan dataValues
                    labels.push(bulanValue);
                    dataValues.push(totalValue);
                }

                new Chart(ctx, {
                        type: 'bar',
                        data: {
                            labels: labels,
                            datasets: [{
                                label: '# Total Perbulannya',
                                data: dataValues,
                                borderWidth: 1
                            }]
                        },
                        options: {
                            scales: {
                                y: {
                                    beginAtZero:true,
                                }
                            },
                        }
                    })
                })
                .catch((error) => {
                    console.log(error);
                });
            });

        function cetakLaporan($tahun, $tgl_cetak) {

            var elementHTML = document.getElementById("table");
            // var graphElement = document.getElementById("graphAll");

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
            doc.text("Laporan Pendapatan Bulanan", 15, 50);
            doc.setFont("helvetica", "normal");
            doc.text("Periode", 15, 60);
            doc.text(": " + $tahun, 60, 60);
            doc.text("Tanggal Cetak", 15, 70);
            doc.text(": " + $tgl_cetak, 60, 70);

            doc.autoTable(
            {
                html: elementHTML,
                margin: { top: 80 },
                theme: theme
            })

            // doc.addPage();  
            // html2canvas(graphElement).then(function(canvas) {
            //     const graphData = canvas.toDataURL('image/png');
            //     doc.addImage(graphData, 'PNG', 15, 30, 270, 160);
            // });    
            doc.save('Laporan Pendapatan Bulanan - ' + $tgl_cetak + '.pdf')
        }

        //return
        return {
            laporan_pendapatan,
            tahun,
            tgl_cetak,
            cetakLaporan
        };
    },
};
</script>
<style>

</style>