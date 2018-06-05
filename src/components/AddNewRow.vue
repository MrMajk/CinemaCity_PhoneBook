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
                        <div class="form-group" :class="{'has-error' : errors.has('nameInput')}">
                            <label for="nameInput">Full name</label>
                            <input type="text" class="form-control" name="nameInput"  placeholder="Enter full name" v-model="list.name"
                                   v-validate="{required:true,min:3,max:30}">
                            <span>{{ errors.first('nameInput') }}</span>

                        </div>
                        <div class="form-group">
                            <label for="phoneInput">Phone</label>
                            <input type="number" class="form-control" name="phoneInput" required placeholder="Enter phone" v-model="list.phone" required>
                        </div>
                        <div class="form-group">
                            <label for="exampleInputEmail1">Email address</label>
                            <input type="email" class="form-control" name="exampleInputEmail1" required aria-describedby="emailHelp" placeholder="Enter email" v-model="list.email" required>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="submit" class="btn btn-primary" @click="$validator.validateAll()">Submit</button>
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
            validateForm(){
                var error = false;
                if (this.list.name == ''){
                    error = true;
                }

                if (error){
                    return false;
                } else {
                    this.save();
                }
            },
            save(){
                this.$parent.users.push({
                    name: this.list.name,
                    phone: this.list.phone,
                    email: this.list.email
                });
            }
        }
    }




</script>

<style scoped>

</style>