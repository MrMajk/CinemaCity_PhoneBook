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
            <tbody v-for="user in users">
            <tr>
                <td>{{user.name}}</td>
                <td>{{user.phone}}</td>
                <td>{{user.email}}</td>
                <td><span class="glyphicon glyphicon-trash"></span></td>
            </tr>
            </tbody>
        </table>
        <addNewRow></addNewRow>
    </div>
</template>

<script>
    import addNewRow from './AddNewRow.vue'
    export default {
        data() {
            return {
                users:{}
            }
        },
        components: {
            addNewRow: addNewRow
        },

            created() {
                let self = this;
                    fetch('https://jsonplaceholder.typicode.com/users')
                        .then(function (result) {
                           result.json().then(function (data) {
                                self.users= data;
                           })
                        });
                }
    }

</script>