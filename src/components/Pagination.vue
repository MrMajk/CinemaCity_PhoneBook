<template>
    <div v-if="totalPages() > 0"class="pagination-wrapper">
        <span v-if="showPreviousLink()" class="pagination-btn" v-on:click="$parent.updatePage($parent.currentPage - 1)"> < </span>
        {{ $parent.currentPage + 1 }} of {{ totalPages() }}
        <span v-if="showNextLink()" class="pagination-btn" v-on:click="$parent.updatePage($parent.currentPage + 1)"> > </span>
    </div>
</template>

<script>
    export default {
        name: 'pagination',
        methods: {
//            updatePage(pageNumber) {
//
//                this.$emit('page:update', pageNumber);
//            },
            totalPages() {

                return Math.ceil(this.$parent.users.length / this.$parent.pageSize);
            },
            showPreviousLink() {

                return this.$parent.currentPage == 0 ? false : true;
            },
            showNextLink() {
                return this.$parent.currentPage == (this.totalPages() - 1) ? false : true;
            }
        }
    }
</script>