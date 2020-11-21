<template>
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
</template>

<script>
export default {
    name: 'FormComponent',
    props: ['product','isEdit','update','store']
}
</script>

<style>

</style>