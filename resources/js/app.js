require('./bootstrap');
import { HasError, AlertError } from 'vform';
import Swal from 'sweetalert2';
import VueProgressBar from 'vue-progressbar';

window.Vue = require('vue');
window.Swal = Swal;
window.Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})

Vue.use(VueProgressBar, {
    color: 'rgb(143, 255, 199)',
    failedColor: 'red',
    thinkness: '10px',
    height: '50px',
    transition: {
        speed: '10s',
        termination: 600
    }
})

Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
Vue.component('product-component', require('./components/ProductComponent.vue').default);
Vue.component('pagination', require('laravel-vue-pagination'));


const app = new Vue({
    el: '#app',
});
