<template>
    <div class="container my-5">
        <div class="row justify-content-end mb-3">
            <div class="col-4">
                <button @click="create" class="btn btn-primary btn-sm mr-1">
                    <i class="fas fa-plus-circle"></i> Create
                </button>
            </div>
            <div class="col-4">
                <form action="">
                    <div class="input-group">
                        <input type="text" name="search" class="form-control" placeholder="Search">
                    
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
                        <form @submit.prevent="isEdit ? update() : store()">
                            <div class="form-group">
                                <label for="name">Name: </label>
                                <input v-model="product.name" type="text" name="name" class="form-control">
                            </div>
                            <div class="form-group">
                                <label for="price">Price: </label>
                                <input  v-model="product.price" type="number" name="price" class="form-control">
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
                        <tr v-for="product in products" :key="product.id">
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
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ProductComponent',
    data() {
        return {
            isEdit: false,
            products: [],
            product: {
                name: '',
                price: ''
            }
        }
    },
    methods: {
        view() {
            axios.get('/api/product')
            .then(res => {
                this.products = res.data
            })
            .catch(err => {
                console.log(err)
            })
        },
        create() {
            this.isEdit = false
            this.product.id = '';
            this.product.name = '';
            this.product.price = '';
        },
        store() {
            axios.post('/api/product', this.product)
            .then(res => {
                this.view();
                this.product = {
                    name: '',
                    price: ''
                };
            })
        },
        edit(product) {
            this.isEdit = true

            this.product.id = product.id;
            this.product.name = product.name;
            this.product.price = product.price;
        },
        update(product) {
            axios.put(`/api/product/${this.product.id}`, this.product)
            .then(res => {
                this.view();
                this.product.id = '';
                this.product.name = '';
                this.product.price = '';
                this.isEdit = false;
            }).catch(err => console.log(err));
        },
        deleteData(product) {
            if(!confirm('Are you sure to delete ?')) {
                return;
            }
            axios.delete(`/api/product/${product.id}`)
            .then(res => {
                this.view();
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    created() {
        this.view()
    }
}
</script>
