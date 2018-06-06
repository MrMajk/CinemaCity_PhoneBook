<template>
    <div class="container">
        <div class="col-md-6">

            <div id="custom-search-input">
                <div class="input-group col-md-12">
                    <input type="text" class="form-control input-lg" placeholder="Buscar" v-model="search"/>
                    <span class="input-group-btn">
                        <button class="btn btn-info btn-lg" type="button">
                            <i class="glyphicon glyphicon-search"></i>
                        </button>
                    </span>
                </div>
            </div>
        </div>
        <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">Add</button>
        <button type="button" class="btn btn-info btn-lg" data-toggle="modal" data-target="#editModal">Edit</button>

        <table class="table table-bordered">
            <thead>
                <tr>
                    <th v-for="key in gridColumns"
                        @click="sortBy(key)"
                        :class="{ active: sortKey == key }">
                        <span class="arrow">
                            {{ key }}
                         </span>
                    </th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user,index in filteredList">
                    <td v-for="key in gridColumns">
                        {{user[key]}}
                    </td>
                    <td>
                        <button type="button" class="btn btn-xs btn-danger" @click="deleteUser(index)">
                            <span class="glyphicon glyphicon-trash"></span>&nbsp;
                        </button>
                        <button type="button" class="btn btn-xs" data-toggle="modal" data-target="#editModal"
                                data-userId=user.id   @click="editUserMethod(user)">
                            <span class="glyphicon glyphicon-edit"></span>&nbsp;
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
        <pagination>
            v-on:page:update="updatePage"
        </pagination>
        <addNewRow></addNewRow>
        <edit-user></edit-user>
    </div>
</template>

<script>
    import addNewRow from './AddNewRow.vue'
    import editUser from './EditUser.vue'
    import pagination from './Pagination.vue'

    export default {
        data() {
            return {
                users: [],
                user: {},
                editList: {},
                search: '',
                sortKey: '',
                currentSort: 'name',
                currentSortDir: 'asc',
                gridColumns: ['name', 'phone', 'email'],
                sortKey: '',
                currentPage: 0,
                pageSize: 6,
                visibleUsers: []
            }
        },
        components: {
            addNewRow: addNewRow,
            editUser: editUser,
            pagination: pagination
        },
        created() {
            let self = this;
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(function (result) {
                    result.json().then(function (data) {
                        self.users = data;
                    })
                });

        },
        beforeMount:function() {
            this.updateVisibleUsers();
        },
        computed: {
            filteredList: function () {
                this.updateVisibleUsers();

                var sortKey = this.sortKey
                var filterKey = this.search && this.search.toLowerCase()
                var data = this.visibleUsers;
                if (filterKey) {
                    data = data.filter(function (row) {
                        return Object.keys(row).some(function (key) {
                            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                        })
                    })
                }
                if (sortKey) {
                    return data.sort((a, b) => {
                        let modifier = 1;
                        if (this.currentSortDir === 'desc') modifier = -1;
                        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                        return 0;
                    });
                }
                return data = this.visibleUsers;

            }

            },
            sortedCats: function () {
                return this.users.sort((a, b) => {
                    let modifier = 1;
                    if (this.currentSortDir === 'desc') modifier = -1;
                    if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                    if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                    return 0;
                });

        },

        methods: {

            deleteUser(index){
                if (confirm("Are you sure ?")) {
                    this.users.splice(index, 1);
                }
            },
            sortBy: function (key) {
                this.sortKey = key;
                this.users[key] = this.users[key] * -1;
                if (key === this.currentSort) {
                    this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
                }
                this.currentSort = key;
            },
            updatePage(pageNumber){
                this.currentPage = pageNumber;
                this.updateVisibleUsers();
            },
            updateVisibleUsers:function() {
                this.visibleUsers = this.users.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize);
                if (this.visibleUsers.length == 0 && this.currentPage > 0) {
                    this.updatePage(this.currentPage - 1);
                }
            }
        }
    }

</script>