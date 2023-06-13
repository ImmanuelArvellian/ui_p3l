//import vue router
import { createRouter, createWebHistory } from 'vue-router'
//define a routes
const routes = [
    {
        path: '/',
        name: 'login',
        component: () => import('@/components/loginPage.vue'),
    },
    {
        path: '/beranda',
        name: 'beranda',
        component: () => import('@/components/DashboardLayout.vue'),
        children: [
            {
                path: "/instruktur",
                name: "instruktur.index",
                component: () => import('@/views/Instruktur/indexPage.vue'),
            },
            {
                path: "/instruktur/create",
                name: "instruktur.create",
                component: () => import('@/views/Instruktur/createPage.vue'),
            },
            {
                path: "/instruktur/edit:id_instruktur",
                name: "instruktur.edit",
                component: () => import('@/views/Instruktur/editPage.vue'),
            },
            {
                path: "/member",
                name: "member.index",
                component: () => import('@/views/Member/indexPage.vue'),
            },
            {
                path: "/member/deactivation",
                name: "member.deactivation",
                component: () => import('@/views/Member/deactivationPage.vue'),
            },
            {
                path: "/member/create",
                name: "member.create",
                component: () => import('@/views/Member/createPage.vue'),
            },
            {
                path: "/member/edit:id_member",
                name: "member.edit",
                component: () => import('@/views/Member/editPage.vue'),
            },
            {
                path: "/jadwalumum",
                name: "jadwalumum.index",
                component: () => import('@/views/JadwalUmum/indexPage.vue'),
            },
            {
                path: "/jadwalumum/create",
                name: "jadwalumum.create",
                component: () => import('@/views/JadwalUmum/createPage.vue'),
            },
            {
                path: "/jadwalumum/edit:id_jadwal_umum",
                name: "jadwalumum.edit",
                component: () => import('@/views/JadwalUmum/editPage.vue'),
            },
            {
                path: "/jadwalharian",
                name: "jadwalharian.index",
                component: () => import('@/views/JadwalHarian/indexPage.vue'),
            },
            {
                path: "/aktivasi",
                name: "aktivasi.index",
                component: () => import('@/views/AktivasiTahunan/indexPage.vue'),
            },
            {
                path: "/aktivasi/create",
                name: "aktivasi.create",
                component: () => import('@/views/AktivasiTahunan/createPage.vue'),
            },
            {
                path: "/depuang",
                name: "depuang.index",
                component: () => import('@/views/DepositUang/indexPage.vue'),
            },
            {
                path: "/depuang/create",
                name: "depuang.create",
                component: () => import('@/views/DepositUang/createPage.vue'),
            },
            {
                path: "/depkelas",
                name: "depkelas.index",
                component: () => import('@/views/DepositKelas/indexPage.vue'),
            },
            {
                path: "/depkelas/create",
                name: "depkelas.create",
                component: () => import('@/views/DepositKelas/createPage.vue'),
            },
            {
                path: "/izin/index",
                name: "izin.index",
                component: () => import('@/views/Izin/indexPage.vue'),
            },
            {
                path: "/presensigym/index",
                name: "presensigym.index",
                component: () => import('@/views/PresensiGym/indexPage.vue'),
            },
            {
                path: "/presensigym_belum/index",
                name: "presensigym_belum.index",
                component: () => import('@/views/PresensiGym/indexPageBelum.vue'),
            },
            {
                path: "/presensikelas/index",
                name: "presensikelas.index",
                component: () => import('@/views/PresensiKelas/indexPage.vue'),
            },
            {
                path: "/presensikelas_belum/index",
                name: "presensikelas_belum.index",
                component: () => import('@/views/PresensiKelas/indexPageBelum.vue'),
            },
            {
                path: "/pendapatan/index",
                name: "pendapatan.index",
                component: () => import('@/views/Laporan/pendapatanPage.vue'),
            },
            {
                path: "/aktivitas_kelas/index",
                name: "aktivitas_kelas.index",
                component: () => import('@/views/Laporan/aktivitasKelasPage.vue'),
            },
            {
                path: "/aktivitas_gym/index",
                name: "aktivitas_gym.index",
                component: () => import('@/views/Laporan/aktivitasGymPage.vue'),
            },
            {
                path: "/kinerja_instruktur/index",
                name: "kinerja_instruktur.index",
                component: () => import('@/views/Laporan/kinerjaInstrukturPage.vue'),
            },
        ],
    }
]
//create router
const router = createRouter({
    history: createWebHistory(),
    routes // config routes
})
export default router;