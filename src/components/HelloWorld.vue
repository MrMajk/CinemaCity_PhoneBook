<template>
    <div class="container">
        <div class="col-md-6">
            <div id="custom-search-input">
                <div class="input-group col-md-12">
                    <input type="text" class="form-control input-lg" placeholder="Buscar" />
                    <span class="input-group-btn">
                        <button class="btn btn-info btn-lg" type="button">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                    </span>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Add</button>

        <table class="table table-bordered">
            <thead>
            <tr>
                <th>Full name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Action</th>
            </tr>
            </thead>
            <tbody v-for="person in dataPersons">
            <tr>
                <td>{{person.name}}</td>
                <td>{{person.phone}}</td>
                <td>{{person.email}}</td>
                <td><span class="glyphicon glyphicon-trash"></span></td>
            </tr>
            </tbody>
        </table>
        <addNewRow></addNewRow>
    </div>
</template>

<script>
    import addNewRow from './AddNewRow.vue'
    import axios from 'axios'

    var config = require('./../../persons.json');

    export default {
        name: 'hello',
        data() {
            return {
                dataPersons: config.persons
            }
        },
        components: {
            addNewRow: addNewRow
        },

        methods: {
            created() {

                axios({
                    method: 'post',
                    url: 'http://localhost:8080/add',
                    data: {
                        name: this.config.persons.name,
                        phone: this.config.persons.phone,
                        email: this.config.persons.email
                    }
                });

            }
        }
    }
      //  var config = require('./../../persons.json');


</script>