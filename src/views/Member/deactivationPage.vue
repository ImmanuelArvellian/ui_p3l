<template>
    <div class="container-fluid py-4">
        <div class="row">
            <div class="col-12">
                <div class="card mb-4">
                    <div class="card-header pb-0">
                        <h3>Expired Member table</h3>
                    </div>
                    <div class="card-body">
                        <div class="row">
                            <!-- <div class="col-8">
                                <router-link :to="{ name: 'member.create' }">
                                    <button class="btn btn-md btn-success">
                                        <i class="bi bi-plus">Tambah</i>
                                    </button>
                                </router-link>
                            </div> -->
                            <div class="col-12">
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
                                    <th scope="col">ID Member</th>
                                    <th scope="col">Nama Member</th>
                                    <th scope="col">Tanggal Lahir</th>
                                    <th scope="col">Email</th>
                                    <!-- <th scope="col">Password</th> -->
                                    <th scope="col">Gender</th>
                                    <th scope="col">No Telpon</th>
                                    <th scope="col">Alamat</th>
                                    <th scope="col">Status Membership</th>
                                    <th scope="col">Tanggal Daftar</th>
                                    <th scope="col">Masa Akhir Membership</th>
                                    <th scope="col">Sisa Deposit</th>
                                    <th scope="col">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(member, id_member) in member" :key="id_member">
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ member.id_member }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ member.nama }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ member.tgl_lahir }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ member.email }}</span>
                                    </td>
                                    <!-- <td> -->
                                        <!-- <span class="text-secondary text-xs font-weight-bold">{{ member.password }}</span> -->
                                    <!-- </td> -->
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ member.gender }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ member.no_telp }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ member.alamat }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ member.status_membership }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ member.tgl_daftar }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ member.tgl_exp_membership }}</span>
                                    </td>
                                    <td>
                                        <span class="text-secondary text-xs font-weight-bold">{{ member.sisa_deposit }}</span>
                                    </td>
                                    <td class="text-center">
                                        <div class="row align-items-start">
                                            <!-- <div class="col-4">
                                                <router-link :to="{ name:'member.edit', params: { id_member: member.id_member } }" class="nav-link px-2">
                                                    <button class="btn btn-sm btn-primary">
                                                        <i class="bi bi-pencil"></i>
                                                    </button>
                                                </router-link>
                                            </div> -->
                                            <div class="col-4">
                                                <button @click.prevent="memberDelete(member.id_member)" class="btn btn-sm btn-danger">
                                                    <i class="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <!-- <div class="row align-items-start"> -->
                                            <!-- <div class="pdf">
                                                <button @click.prevent="createCard(member.id_member, member.nama, member.alamat, member.no_telp)" class="btn btn-sm btn-warning"> -->
                                                <!-- <button @click.prevent="createCard(member.id_member)" class="btn btn-sm btn-warning"> -->
                                                    <!-- <i class="bi bi-printer"></i>
                                                </button>
                                            </div>
                                        </div> -->
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
        let member = ref([]);
        //mounted
        onMounted(() => {
            //get API from Laravel Backend
            axios
                .get("http://arvell.valent.ppcdeveloper.com/api/member_exp/")
                .then((response) => {
                    //assign state posts with response data
                    member.value = response.data.data;
                })
                .catch((error) => {
                    console.log(error.response.data);
                });
        });

        //method delete
        function memberDelete(id_member) {
            //delete data post by ID
            axios.delete(`http://arvell.valent.ppcdeveloper.com/api/member/${id_member}`)
            .then(() => {
              //splice posts 
              member.value.splice(member.value.indexOf(id_member), 1);
              window.location.reload();
            }).catch(error => {
                console.log(error.response.data)
            })
        }

        // // name: 'pdf';
        // function createCard($id_member, $nama, $alamat, $no_telp){

        //     const pdf =  new jsPDF({
        //         orientation: "landscape",
        //         unit: "cm",
        //         format: [8, 11.5]
        //     });

        //     axios
        //     .get("http://arvell.valent.ppcdeveloper.com/api/member")
        //         .then((response) => {
        //             //assign state posts with response data
        //             member.value = response.data.data;
        //         })
        //         .catch((error) => {
        //             console.log(error.response.data);
        //         });

        //         pdf.text('Gofit', 0.5, 1)
        //         pdf.text('Jl. Centralpark No. 10 Yogyakarta', 0.5, 2)
        //         pdf.text('MEMBER CARD', 0.5, 3.5)
        //         pdf.text('Member ID : '+$id_member, 0.5, 4.5)
        //         pdf.text('Nama          : '+$nama, 0.5, 5.5)
        //         pdf.text('Alamat        : '+$alamat, 0.5, 6.5)
        //         pdf.text('Telpon        : '+$no_telp, 0.5, 7.5)
        //         pdf.save('memberCard_'+$id_member+'.pdf')
        // }

        //return
        return {
            member,
            memberDelete,
            // createCard,
        };
    },
};
</script>
<style>

</style>