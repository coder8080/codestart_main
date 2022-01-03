<template>
    <div class="card">
        <div class="card-body">
            <h4 class="card-title">
                <router-link :to="{ name: 'SubLesson', params: { slug: `${sublesson.parent}-${sublesson.number}` } }">
                    {{ sublesson.title }}
                </router-link>
            </h4>
            <p class="card-text">
                {{ sublesson.description }}
            </p>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AppSubLesson',
    props: {
        sublesson: {
            type: Object,
            required: true,
        },
    },
}
</script>
