<template>
    <div id="editModal" class="modal fade" role="dialog">
        <div class="modal-dialog">

            <!-- Modal content-->
            <div class="modal-content">
                <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal">&times;</button>
                    <h4 class="modal-title">Modal Header</h4>
                </div>
                <div class="modal-body">

                    <form action="url" method="POST" enctype="multipart/form-data">
                        <div class="form-group" :class="{'has-error' : errors.has('nameInput')}">
                            <label for="nameInput">Full name</label>
                            <input type="text" class="form-control" name="nameInput" placeholder="Enter full name"
                                   v-model="$parent.editUser.name"
                                   v-validate="{required:true,min:3,max:80}">
                            <span>{{ errors.first('nameInput') }}</span>
                        </div>
                        <div class="form-group" :class="{'has-error' : errors.has('phoneInput')}">
                            <label for="phoneInput">Phone</label>
                            <input type="text" class="form-control" name="phoneInput" placeholder="Enter phone"
                                   v-model="$parent.editUser.phone"
                                   v-validate="{required:true,min:6,max:30}">
                            <span>{{ errors.first('phoneInput') }}</span>

                        </div>
                        <div class="form-group" :class="{'has-error' : errors.has('phoneInput')}">
                            <label for="emailInput">Email address</label>
                            <input type="email" class="form-control" name="emailInput"
                                   aria-describedby="emailHelp" placeholder="Enter email"
                                   v-model="$parent.editUser.email"
                                   v-validate="'required|email'">
                            <span>{{ errors.first('emailInput') }}</span>

                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary"  @click="save()">Submit</button>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            save(){
                this.$validator.validateAll().then(result => {
                    if (result){
                    }

                });
            }

        }
    }


</script>

<style scoped>

</style>