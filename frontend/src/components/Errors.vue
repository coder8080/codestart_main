<template>
    <div>
        <ul class="errors-ul">
            <li class="text-danger" v-for="error of errors" :key="error">
                <i class="bi-exclamation-triangle"></i>&nbsp;
                {{ error }}
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'AppErrors',
    props: {
        errors: {
            type: Array,
            required: true,
        },
    },
}
</script>
<style>
.errors-ul {
    list-style-type: none;
}
</style>
