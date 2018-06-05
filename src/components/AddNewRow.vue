<template>
    <div id="myModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Modal Header</h4>
                </div>
                <div class="modal-body">
                    <form>
                        <div class="form-group">
                            <label for="nameInput">Full name</label>
                            <input type="text" class="form-control" id="nameInput" placeholder="Enter full name" v-model="list.name">
                        </div>
                        <div class="form-group">
                            <label for="phoneInput">Phone</label>
                            <input type="text" class="form-control" id="phoneInput" placeholder="Enter phone" v-model="list.phone">
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" v-model="list.email">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" @click.prevent="save">Submit</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
import axios from 'axios';

    export default {


        name: "AddNewRow",

        data(){
            return {
                list: {
                    name: '',
                    phone: '',
                    email: ''
                }
            }
        },


        methods: {
            save(){
                var jsonData = require('./../../persons.json');
//
                jsonData.persons.push(this.$data.list);
//                this.$router.push('/add')
//                console.log( jsonData.persons);


//                var xhttp = new XMLHttpRequest();
//                xhttp.open("POST", "https://jsonplaceholder.typicode.com/posts");
//                xhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
//
//                xhttp.send(JSON.stringify({ name: "hello@user.com", phone: "33453",  email: "Tester" }));
//                console.log( xhttp);
            }

        }
    }




</script>

<style scoped>

</style>