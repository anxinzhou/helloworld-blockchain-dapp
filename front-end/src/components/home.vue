<template>

    <body id="page-top">
        <nav class="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
            <div class="container">
                <a class="navbar-brand  js-scroll-trigger" href="#" v-scroll-to="'#page-top'">IEEE SecDev 2018</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="fas fa-bars"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav  ml-auto">
                        <li class="nav-item text-uppercase">
                            <a class="nav-link" href="#" v-scroll-to="'#sm'">Game Machine</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <header class="masthead">
            <div class="container">
                <div class="intro-text">
                    <div class="intro-lead-in"></div>
                </div>
            </div>
        </header>
        <div>
            <a id="sm">
                <vue-slotmachine
                ></vue-slotmachine>
            </a>
        </div>
    </body>
</template>
<script>
export default {
    components: {
        'vue-slotmachine': () => import('@/components/SlotMachine.vue'),
    },
    data() {
      return {
          account: undefined,
      }
    },
    methods: {
    },
    mounted: function() {
        var el = document.getElementById('mainNav');
        function scrollHandle() {
            if (document.documentElement.scrollTop > 100) {
                el.classList.add("navbar-shrink")
            } else {
                el.classList.remove("navbar-shrink")
            }
        }
        window.addEventListener('scroll', scrollHandle);
    },
}
</script>
