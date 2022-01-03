<template>
    <div>
        <h2>Этот урок пока закрыт для вас</h2>
        <p>Чтобы открыть этот урок, пройдите предыдущий.</p>
        <router-link :to="{ name: 'Lessons' }" class="btn btn-success">К урокам</router-link>
    </div>
</template>
<script>
export default {
    name: 'AppLessonClosed',
}
</script>
