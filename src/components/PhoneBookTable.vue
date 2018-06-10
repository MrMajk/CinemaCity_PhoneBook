<template>
    <div class="container">
        <div class="col-xs-12 upTablePanel">
                <div class="input-group col-xs-12">
                    <input type="text" class="form-control input-lg upTablePanel__searchInput"
                           placeholder="Search user..." v-model="search"/>
                </div>
        </div>
        <table class="table table-bordered usersTable">
            <thead class="usersTable__header">
                <tr>
                    <th v-for="key in gridColumns"
                        class="usersTable__header--text"
                        @click="sortBy(key)"
                        :class="{ active: sortKey == key, 'hidden-xs': key=='email' }">
                            <span>
                                {{ key }}
                                <span class="glyphicon glyphicon-sort-by-alphabet"></span>
                             </span>
                    </th>
                    <th class="usersTable__header--text">actions</th>
                </tr>
            </thead>
            <tbody class="usersTable__body">
            <tr class="usersTable__body--row" v-for="user,index in filteredList">
                <td v-for="key in gridColumns"
                    :class="{'hidden-xs': key=='email'}">
                    {{user[key]}}
                </td>
                <td>
                    <button type="button" class="btn btn-xs btn-danger" @click="deleteUser(user.id)">
                        <span class="glyphicon glyphicon-trash"></span>&nbsp;
                    </button>
                    <button type="button" class="btn btn-xs" data-toggle="modal" data-target="#editModal"
                            @click="editUserMethod(user)">
                        <span class="glyphicon glyphicon-edit"></span>&nbsp;
                    </button>
                </td>
            </tr>
            </tbody>
        </table>
        <nav>
            <ul class="pagination tablePagination">
                <li class="page-item tablePagination__element">
                    <a class="page-link pagination-btn tablePagination__element--link" v-if="showPreviousLink()" @click="updatePage(currentPage - 1)">
                        <span aria-hidden="true">&laquo;</span>
                        <span class="sr-only">Previous</span>
                    </a>
                </li>
                <li class="page-item tablePagination__element">
                    <span class="page-link tablePagination__element--link">
                        {{ this.currentPage + 1 }} of {{ this.pagesCount }}
                    </span>
                </li>
                <li class="page-item tablePagination__element">
                    <a class="page-link pagination-btn tablePagination__element--link" v-if="showNextLink()" @click="updatePage(currentPage + 1 )">
                        <span aria-hidden="true">&raquo;</span>
                        <span class="sr-only">Next</span>
                    </a>
                </li>
            </ul>
        </nav>
        <div class="col-xs-12">
            <button type="button" class="btn btn-info btn-lg upTablePanel__addButton" data-toggle="modal"
                    data-target="#myModal">
                Add new user
            </button>
        </div>
        <addNewRow></addNewRow>
        <edit-user></edit-user>
    </div>
</template>

<script>
    import addNewRow from './AddNewRow.vue'
    import editUser from './EditUser.vue'

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
                visibleUsers: [],
                editUser: [],
                filteredUsersList: [],
                pagesCount: this.totalPages(),
                userEditData: []
            }
        },
        components: {
            addNewRow: addNewRow,
            editUser: editUser,
        },
        created() {
            let self = this;
            fetch('https://jsonplaceholder.typicode.com/users')
                .then(function (result) {
                    result.json().then(function (data) {
                        self.users = data;
                        self.filteredUsersList = data;
                    })
                });
        },

        computed: {
            filteredList: function () {
                this.updateVisibleUsers();

                var sortKey = this.sortKey;
                var filterKey = this.search && this.search.toLowerCase();
                var data = this.users;
                if (filterKey) {
                    data = data.filter(function (row) {
                        return Object.keys(row).some(function (key) {
                            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                        });
                    });
                    this.filteredUsersList = data;

                    this.visibleUsers = this.filteredUsersList.filter(function (row) {
                        return Object.keys(row).some(function (key) {
                            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
                        });
                    });
                    this.updateVisibleUsers();

                } else {
                    this.filteredUsersList = this.users;
                    this.updateVisibleUsers();
                }
                if (sortKey) {
                    this.filteredUsersList = this.filteredUsersList.sort((a, b) => {
                        let modifier = 1;
                        if (this.currentSortDir === 'desc') modifier = -1;
                        if (a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
                        if (a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
                        return 0;
                    });
                    this.updateVisibleUsers();
                }
                this.totalPages();
                return this.visibleUsers;
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
            deleteUser(userID){
                let i = this.users.map(item => item.id).indexOf(userID);
                this.$delete(this.users, i);
            },
            sortBy: function (key) {
                this.sortKey = key;
                this.users[key] = this.users[key] * -1;
                if (key === this.currentSort) {
                    this.currentSortDir = this.currentSortDir === 'asc' ? 'desc' : 'asc';
                }
                this.currentSort = key;
            },
            updatePage: function (pageNumber) {
                this.currentPage = pageNumber;
                this.updateVisibleUsers();
            },
            updateVisibleUsers: function () {
                this.visibleUsers = this.filteredUsersList.slice(this.currentPage * this.pageSize, (this.currentPage * this.pageSize) + this.pageSize);
                if (this.visibleUsers.length == 0 && this.currentPage > 0) {
                    this.updatePage(this.currentPage - 1);
                }
            },
            editUserMethod: function (userEdit) {
                this.editUser = userEdit;
            },
            totalPages: function () {
                if (this.filteredUsersList) {
                  return this.pagesCount = Math.ceil(this.filteredUsersList.length / this.pageSize);
                }
            },
            showPreviousLink() {
                return this.currentPage == 0 ? false : true;
            },
            showNextLink() {
                return this.currentPage == (this.totalPages() - 1) ? false : true;
            }
        }
    }
</script>
