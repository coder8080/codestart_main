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
                <div class="col-xs-12 col-md-12 col-lg-4 text-center">
                    <h2>О проекте</h2>
                    <p>
                        Code&lt;/&gt;Start - это краткий курс по базовой веб разработке. В его процессе вы познакомитесь
                        с языками программирования html, css и js, узнаете о том, как работать в редакторе visual studio
                        code и напишите финальный проект! А главное - всё абсолютно бесплатно!
                    </p>
                </div>
                <hr class="d-lg-none" />
                <div class="col-xs-12 col-md-12 col-lg-4 text-center">
                    <h2>Как начать учиться?</h2>
                    <p>
                        Для начала вам нужно
                        <router-link :to="{ name: 'Register' }" class="link-primary">создать аккаунт</router-link> на
                        сайте. Затем в меню наверху у вас появится вкладка "Уроки". Изначально почти все уроки закрыты.
                        Пройдите урок, выделенный синим цветом, чтобы открыть следующий!
                    </p>
                </div>
                <hr class="d-lg-none" />
                <div class="col-xs-12 col-md-12 col-lg-4 text-center">
                    <h2>Мой профиль</h2>
                    <p>
                        В <router-link :to="{ name: 'Settings' }" class="link-primary">вашем профиле</router-link>
                        отображается, сколько уроков вы прошли. Там вы можете изменить имя пользователя, описание и
                        электронную почту (она будет использована для восстановления доступа к аккаунту, если вы
                        забудете пароль).
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
