<template>
    <div class="row justify-content-center">
        <div class="col-md-8 mt-2">
            <div class="card card-default">
                <div class="card-header">{{$t('login')}}</div>
                <div class="card-body">
                    <form>
                        <div class="form-group row">
                            <label for="email" class="col-sm-4 col-form-label text-md-right">{{$t('emailaddress')}}</label>
                            <div class="col-md-6">
                                <input
                                    id="email"
                                    type="email"
                                    class="form-control"
                                    v-model="email"
                                    required
                                    autofocus
                                    autocomplete="off"
                                >
                            </div>
                        </div>

                        <div class="form-group row">
                            <label for="password" class="col-md-4 col-form-label text-md-right">{{$t('password')}}</label>
                            <div class="col-md-6">
                                <input
                                    id="password"
                                    type="password"
                                    class="form-control"
                                    v-model="password"
                                    required
                                    autocomplete="off"
                                >
                            </div>
                        </div>

                        <div class="d-grid mt-4">
                            <button class="btn btn-primary" @click.prevent="handleSubmit">
                                {{$t('login')}}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
            <div class="alert alert-danger" role="alert" v-if="error !== ''">
                {{ error }}
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import useAuth from "@/composables/UseAuth";

const error = ref('');
const email = ref('');
const password = ref('');

const router = useRouter();
const { authenticated, signIn } = useAuth();

const handleSubmit = async () => {
    await signIn(email.value, password.value);
    if (authenticated.value) {
        router.replace({name: 'home'});
    } else {
        error.value = "login was not successful";
    }
};

</script>

<style scoped>

</style>