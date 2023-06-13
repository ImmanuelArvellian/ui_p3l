<template>
    <section class="vh-100">
        <div class="container-fluid">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-md-9 col-lg-6 col-xl-5">
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
                    class="img-fluid" alt="Sample image">
                </div>
                <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
                    <form @submit.prevent="login" class="login-form">
                        <!-- Email input -->
                        <div class="form-outline mb-4">
                            <input v-model="loginData.email" type="email" id="form3Example3" class="form-control form-control-lg"
                            placeholder="Enter a valid email address" />
                            <label class="form-label" for="form3Example3">Email address</label>
                        </div>

                        <!-- Password input -->
                        <div class="form-outline mb-3">
                            <input v-model="loginData.password" type="password" id="form3Example4" class="form-control form-control-lg"
                            placeholder="Enter password" />
                            <label class="form-label" for="form3Example4">Password</label>
                        </div>

                        <div class="text-center text-lg-start mt-4 pt-2">
                            <button type="submit" class="btn btn-primary btn-lg"
                            style="padding-left: 2.5rem; padding-right: 2.5rem;">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Swal from 'sweetalert2'

export default {
    setup() {
        const loginData = reactive({
            email: "",
            password: "",
        });

        const validation = ref([]);
        const router = useRouter();

        function login() {
            let email = loginData.email;
            let password = loginData.password;

            axios
                .post("https://arvell.valent.ppcdeveloper.com/api/login", {
                    email: email,
                    password: password
                })
                .then((response) => {
                    //redirect ke post index
                    let role = response.data.role.nama_role;
                    localStorage.setItem('Role', role);
                    localStorage.setItem('Id_User', response.data.data.id_pegawai)

                    const Toast = Swal.mixin({
                        toast: true,
                        position: 'top-end',
                        showConfirmButton: false,
                        timer: 2000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })

                    Toast.fire({
                        icon: 'success',
                        title: 'Login Berhasil'
                    })

                    router.push({
                        name: "beranda",
                    });
                })
                .catch((error) => {
                    //assign state validation with error
                    validation.value = error.response.data;
                });
        }

        return {
            loginData,
            validation,
            router,
            login,
        }
    }
}
</script>

<style>

</style>
