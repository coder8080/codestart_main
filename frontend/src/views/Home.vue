<template>
    <div>
        <div id="product-container" class="mb-3">
            <div id="product">
                <h1>Code&lt;/&gt;Start</h1>
                <p class="h5">
                    Code start - это небольшая бесплатная площадка, которая поможет вам сделать первый шаг в сферу
                    программирования.
                </p>
            </div>
        </div>
        <div class="container">
            <div class="row">
                <div class="col-12 col-lg-4 text-center">
                    <h2>О проекте</h2>
                    <p>
                        Code&lt;/&gt;Start - это краткий курс по основным языкам веб разработки. В его процессе вы
                        познакомитесь с языками программирования HTML, CSS и JavaScript, узнаете о том, как работать в
                        редакторе visual studio code и напишите финальный проект! А главное - всё абсолютно бесплатно и
                        создано на чистом энтузиазме автора!
                    </p>
                </div>
                <hr class="d-lg-none" />
                <div class="col-12 col-lg-4 text-center">
                    <h2>Как начать учиться?</h2>
                    <p>
                        Для начала вам нужно
                        <router-link :to="{ name: 'Register' }" class="link-primary">создать аккаунт</router-link> на
                        сайте. Затем в меню наверху у вас появится вкладка "Уроки". Изначально почти все уроки, кроме
                        одого, закрыты. Пройдите доступный урок, чтобы открыть следующий!
                    </p>
                </div>
                <hr class="d-lg-none" />
                <div class="col-12 col-lg-4 text-center">
                    <h2>Возможности</h2>
                    <p>
                        На этом сайте вы можете смотреть уроки, задавать вопросы, переписываться и делиться своими
                        программами! Для каждого пользователя автоматически создаётся страница со всей статистикой -
                        пройденные уроки, созданный программы и избранные языки программирования.
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'AppHome',
}
</script>
<style>
#product-container {
    width: 100%;
    padding: 60px;
    display: flex;
    justify-content: center;
    background: url('/matrix2.png') fixed center no-repeat;
    background-size: cover;
}
#product {
    max-width: 80%;
    text-align: center;
    color: white;
}
</style>
