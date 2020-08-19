<template>
    <div class="container">
        <h1>Authors</h1>
<form class="form-inline mt-5">

  <div class="form-group mx-sm-3 mb-2">
    
    <h5 class="mr-1">Name:</h5>
    <input type="text"  class="form-control" id="name" value="" v-model="S_filter.name_filter">
  </div>

<div class="form-group mx-sm-3 mb-2">

    <h5 class="mr-1">Country:</h5>
    <input type="text"  class="form-control" id="country" value="" v-model="S_filter.country_filter" >
  </div>
  <div class="form-group mx-sm-3 mb-2">
    <h5 class="mr-1">Birth Date:</h5>
    <input type="text" class="form-control" id="birth_date" placeholder="" v-model="S_filter.birth_date_filter">
  </div>
  <div class="form-group mx-lg-3 mb-2 col-md-1 center">
    <b-button @click="filter()">Search</b-button>
  </div>



</form>

        <div class="row mt-5" v-if="authors">
            <b-card
                border-variant="info" header="Info" text-variant="black"
                style="max-width: 16rem;min-width: 16rem;"
                class="mb-2 ml-3 mt-2 text-center"
                header-tag="header"
                v-for="author in authors.data"
                v-bind:key="author.id"
            >
                <template v-slot:header>
                    <h5 class="mb-0">{{ author.name }}</h5>
                </template>
                <b-card-text>{{ author.country }}</b-card-text>
                <b-card-text>{{ author.birth_date.split(" ")[0] }}</b-card-text>
            </b-card>
        </div>
<div class="mt-3 ">
        <nav aria-label="...">
            <ul class="pagination text-center">
                <li class="page-item ">
                    <a
                        class="page-link"
                        @click="previus()"
                        v-if="pageToAsk > 1"
                        style="cursor: pointer;">Previous</a
                    >
                </li>
                <li class="page-item" v-if="authors">
                    <a
                        class="page-link"
                        @click="next_page()"
                        v-if="next && authors.paginatorInfo.lastPage > pageToAsk"
                        style="cursor: pointer;">Next</a
                    >
                </li>
            </ul>
        </nav>
        </div>
    </div>
</template>

<script>
import { AUTHORS_QUERY } from "./queries.js";
import { CREATE_AUTHOR, DELETE_AUTHOR } from "./mutations.js";

export default {
    apollo: {
        authors: {

            query: AUTHORS_QUERY,
            variables() {
                return {
                    page: this.pageToAsk,
                    name: this.filt ? "%" + this.S_filter.name_filter + "%" : "%%",
                    country: this.filt ? "%" + this.S_filter.country_filter + "%" : "%%"
                };
            },
        }
    },
    
    data() {
        return {
            show_form: false,
            name: "",
            country: "",
            birth_date: "",
            filt:false,

            pageToAsk: 1,
            next: true,
            preview: true,
            S_filter:{
            country_filter:"",
            name_filter:"",
            birth_date_filter:"",
            }


            
        };
    },
    methods: {
        reset() {
            this.show_form = false;
            this.name = "";
            this.country = "";
            this.birth_date = "";
        },
        remove(id) {
            if (confirm("Are you sure?")) {
                this.$apollo
                    .mutate({
                        mutation: DELETE_AUTHOR,
                        variables: { id: id }
                    })
                    .then(response => {
                        this.$apollo.queries.authors.refetch();
                        this.reset();
                    });
            }
        },
        save() {
            this.$apollo
                .mutate({
                    mutation: CREATE_AUTHOR,
                    variables: {
                        author: {
                            name: this.name,
                            birth_date: this.birth_date,
                            country: this.country
                        }
                    }
                })
                .then(response => {
                    this.$apollo.queries.authors.refetch();
                    this.reset();
                });
        },
        next_page() {
            this.pageToAsk += 1;
            if (this.pageToAsk < this.authors.paginatorInfo.lastPage) {
                this.$apollo.queries.authors.refetch();
            } else if (this.pageToAsk == this.authors.paginatorInfo.lastPage) {
                this.next = false
            }
        },
        previus() {
            this.pageToAsk -= 1;
            if (this.pageToAsk <= 1) {
                this.preview = false;
                this.next = true;
            } else if (this.pageToAsk >= 1) {
                this.next = true;
            } else {
                this.$apollo.queries.authors.refetch();
            }
        },

        filter(){

    
        this.filt=true
        this.$apollo.queries.authors.refetch();

 
        },
    }
};
</script>
