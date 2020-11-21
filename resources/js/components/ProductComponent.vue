<template>
    <div class="container my-5">
        <div class="row justify-content-end mb-3">
            <div class="col-4">
                <button @click="create" class="btn btn-primary btn-sm mr-1">
                    <i class="fas fa-plus-circle"></i> Create
                </button>
            </div>
            <div class="col-4">
                <form @submit.prevent="view">
                    <div class="input-group">
                        <input 
                            v-model="search" 
                            type="text" 
                            class="form-control" 
                            placeholder="Search"
                        />
                    
                        <div class="input-group-append">
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-search"></i>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="row">
            <div class="col-4">
                <div class="card">
                    <h4 class="card-header">{{ isEdit ? 'Edit' : 'Create' }}</h4>
                    <div class="card-body">

                        <alert-error :form="product" message="There were some problems with your input."></alert-error>

                        <form @submit.prevent="isEdit ? update() : store()" @keydown="product.onKeydown($event)">
                            <div class="form-group">
                                <label for="name">Name: </label>
                                <input 
                                    v-model="product.name" 
                                    type="text" 
                                    class="form-control" 
                                    name="name"
                                    :class="{ 'is-invalid': product.errors.has('name') }"
                                />
                                <has-error :form="product" field="name"></has-error>
                            </div>
                            <div class="form-group">
                                <label for="price">Price: </label>
                                <input  
                                    v-model="product.price" 
                                    type="number" 
                                    name="price" 
                                    class="form-control"
                                    :class="{ 'is-invalid': product.errors.has('price') }"
                                />
                                <has-error :form="product" field="price"></has-error>
                            </div>
                            <button type="submit" class="btn btn-primary">
                                <i class="fas fa-save mr-1"></i> Save
                            </button>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-8">
                <table class="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="product in products.data" :key="product.id">
                            <td>{{ product.id }}</td>
                            <td>{{ product.name }}</td>
                            <td>{{ product.price }}</td>
                            <td>
                                <button @click="edit(product)" class="btn btn-success btn-sm">
                                    <i class="fas fa-edit mr-1"></i> Edit
                                </button>
                                <button @click="deleteData(product)"  class="btn btn-danger btn-sm">
                                    <i class="fas fa-trash-alt mr-1"></i>Delete
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <pagination :data="products" @pagination-change-page="view"></pagination>
            </div>
            
        </div>
        <loading 
            :active.sync="isLoading" 
            :is-full-page="true"
            :loader="loader"
            :width="width"
            :height="height"
            :color="color"
        ></loading>
    </div>
</template>

<script>
import { Form, HasError, AlertError } from 'vform';
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export default {

    name: 'ProductComponent',
    components: {
        Loading
    },
    data() {
        return {
            isEdit: false,
            isLoading: true,
            loader: 'bars',
            width: 35,
            height: 35,
            color: '#007BFF',
            search: '',
            products: {},
            product: new Form({
                id: '',
                name: '',
                price: ''
            })
        }
    },
    methods: {
        view(page = 1) {
            this.$Progress.start()
            axios.get(`/api/product?page=${page}&search=${this.search}`)
            .then(res => {
                setTimeout(() => {
                  this.isLoading = false
                },1000)
                this.$Progress.finish()
                this.products = res.data
            })
            .catch(err => {
                this.$Progress.fail()
                console.log(err)
            })
        },
        create() {
            this.product.clear();
            this.isEdit = false;
            this.product.reset();
        },
        store() {
            this.$Progress.start();
            this.product.post('/api/product')
            .then(res => {
                this.$Progress.finish();
                this.view();
                this.product.reset();
                Toast.fire({
                  icon: 'success',
                  title: 'Created in successfully'
                });
            })
            .catch(err => {
                this.$Progress.fail()
                console.log(err);
            });
        },
        edit(product) {
            this.product.clear()
            this.isEdit = true
            this.product.fill(product)
        },
        update(product) {
            this.$Progress.start();
            this.product.put(`/api/product/${this.product.id}`)
            .then(res => {
                this.$Progress.finish();
                this.view();
                this.product.reset();
                this.isEdit = false;
            }).catch(err => {
                this.$Progress.fail();
                console.log(err)
            });
        },
        deleteData(product) {
            this.$Progress.start();
            Swal.fire({
              title: 'Are you sure?',
              text: "You won't be able to revert this!",
              icon: 'warning',
              showCancelButton: true,
              confirmButtonColor: '#3085d6',
              cancelButtonColor: '#d33',
              confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
              if (result.isConfirmed) {
                axios.delete(`/api/product/${product.id}`)
                .then(res => {
                    this.$Progress.finish();
                    this.view();
                    Swal.fire(
                      'Deleted!',
                      'success'
                    ),
                    Toast.fire({
                      icon: 'success',
                      title: 'Deleted in successfully'
                    })
                })
                .catch(err => this.$Progress.finish());
              }
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        this.view()
    },
}
</script>
