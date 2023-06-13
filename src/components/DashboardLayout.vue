<template>
    <!-- Bootstrap Icon -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.9.1/font/bootstrap-icons.css">
    
    <header class="navbar navbar-dark sticky-top bg-primary flex-md-nowrap p-0 shadow">
        <button class="btn btn-primary" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasWithBothOptions" aria-controls="offcanvasWithBothOptions">
            <i class="bi bi-list"></i>
        </button>
    </header>

    <div class="offcanvas offcanvas-start" data-bs-scroll="true" tabindex="-1" id="offcanvasWithBothOptions" aria-labelledby="offcanvasWithBothOptionsLabel">
        <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasWithBothOptionsLabel">GoFit Menu - {{ nama_user }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
        </div>
        <div class="offcanvas-body">
            <ul class="nav flex-column">
                <li class="nav-item" v-show="role === 'Admin'" data-bs-dismiss="offcanvas" aria-label="Close">
                    <router-link :to="{ name: 'instruktur.index' }" class="nav-link">Instruktur</router-link>
                </li>
                <li class="nav-item" v-show="role === 'Kasir'" data-bs-dismiss="offcanvas" aria-label="Close">
                    <router-link :to="{ name: 'member.index' }" class="nav-link">Member</router-link>
                </li>
                <li class="nav-item" v-show="role === 'MO'" data-bs-dismiss="offcanvas" aria-label="Close">
                    <router-link :to="{ name: 'jadwalumum.index' }" class="nav-link">Jadwal Umum</router-link>
                </li>
                <li class="nav-item" v-show="role === 'MO'" data-bs-dismiss="offcanvas" aria-label="Close">
                    <router-link :to="{ name: 'jadwalharian.index' }" class="nav-link">Jadwal Harian</router-link>
                </li>
                <li class="nav-item" v-show="role === 'Kasir'" data-bs-dismiss="offcanvas" aria-label="Close">
                    <router-link :to="{ name: 'aktivasi.index' }" class="nav-link">Transaksi Aktivasi</router-link>
                </li>
                <li class="nav-item" v-show="role === 'Kasir'" data-bs-dismiss="offcanvas" aria-label="Close">
                    <router-link :to="{ name: 'depuang.index' }" class="nav-link">Transaksi Deposit Uang</router-link>
                </li>
                <li class="nav-item" v-show="role === 'Kasir'" data-bs-dismiss="offcanvas" aria-label="Close">
                    <router-link :to="{ name: 'depkelas.index' }" class="nav-link">Transaksi Deposit Kelas</router-link>
                </li>
                <li class="nav-item" v-show="role === 'MO'" data-bs-dismiss="offcanvas" aria-label="Close">
                    <router-link :to="{ name: 'izin.index' }" class="nav-link">Izin Instruktur</router-link>
                </li>
                <li class="nav-item" v-show="role === 'Kasir'" data-bs-dismiss="offcanvas" aria-label="Close">
                    <router-link :to="{ name: 'presensigym.index' }" class="nav-link">Presensi Gym</router-link>
                </li>
                <li class="nav-item" v-show="role === 'Kasir'" data-bs-dismiss="offcanvas" aria-label="Close">
                    <router-link :to="{ name: 'presensikelas.index' }" class="nav-link">Presensi Kelas</router-link>
                </li>
                <li class="nav-item" v-show="role === 'MO'" data-bs-dismiss="offcanvas" aria-label="Close">
                    <router-link :to="{ name: 'pendapatan.index' }" class="nav-link">Laporan Pendapatan</router-link>
                </li>
                <li class="nav-item" v-show="role === 'MO'" data-bs-dismiss="offcanvas" aria-label="Close">
                    <router-link :to="{ name: 'aktivitas_kelas.index' }" class="nav-link">Laporan Aktivitas Kelas</router-link>
                </li>
                <li class="nav-item" v-show="role === 'MO'" data-bs-dismiss="offcanvas" aria-label="Close">
                    <router-link :to="{ name: 'aktivitas_gym.index' }" class="nav-link">Laporan Aktivitas Gym</router-link>
                </li>
                <li class="nav-item" v-show="role === 'MO'" data-bs-dismiss="offcanvas" aria-label="Close">
                    <router-link :to="{ name: 'kinerja_instruktur.index' }" class="nav-link">Laporan Kinerja Instruktur</router-link>
                </li>
            </ul>
        </div>
    </div>
    <div class="container-fluid">
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarMenu" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="row">
            <main class="col-md-9 ms-sm-auto col-lg-12 px-md-2">
                <!-- View Route -->
                <router-view></router-view>
            </main>
        </div>
    </div>
</template>
<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";

export default {
    setup(){
        let nama_user;
        let role = localStorage.getItem("Role");

        const pegawai = ref([]);
        const router = useRouter();

        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("https://arvell.valent.ppcdeveloper.com/api/pegawai/" + localStorage.getItem("Id_User")
                )
                .then((response) => {
                    //assign state posts with response data
                    pegawai.value = response.data.data;
                    nama_user = localStorage.getItem("Id_User");
                    localStorage.setItem('Nama_user', nama_user);
                    console.log(nama_user);
                })
                .catch((error) => {
                    console.log(error.response);
                });
            });

        return{
            pegawai,
            role,
            nama_user,
            router,
        }
    }

};
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');

body {
    font-family: 'Poppins' !important;
    background: lightgray;
    font-size: 0.875rem;
}

.feather {
    width: 16px;
    height: 16px;
    vertical-align: text-bottom;
}

/*
* Sidebar
*/
.sidebar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    padding: 48px 0 0;
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar-sticky {
    position: relative;
    top: 0;
    height: calc(100vh - 48px);
    padding-top: 0.5rem;
    overflow-x: hidden;
    overflow-y: auto;
}

.sidebar .nav-link {
    font-weight: 500;
    color: #333;
}

.sidebar .nav-link .feather {
    margin-right: 4px;
    color: #727272;
}

.sidebar .nav-link.active {
    color: #2470dc;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
    color: inherit;
}

.sidebar-heading {
    font-size: 0.75rem;
    text-transform: uppercase;
}

/*
* Navbar
*/
.navbar-brand {
    padding-top: 0.75rem;
    padding-bottom: 0.75rem;
    font-size: 1rem;
    background-color: rgba(0, 0, 0, 0.25);
    box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.25);
}

.navbar .navbar-toggler {
    top: 0.25rem;
    right: 1rem;
}

.navbar .form-control {
    padding: 0.75rem 1rem;
    border-width: 0;
    border-radius: 0;
}

.form-control-dark {
    color: #fff;
    background-color: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.1);
}

.form-control-dark:focus {
    border-color: transparent;
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.25);
}
</style>