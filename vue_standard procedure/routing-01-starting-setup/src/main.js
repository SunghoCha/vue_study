import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router'

import App from './App.vue';
import TeamsList from './components/teams/TeamsList.vue';
import UsersList from './components/users/UsersList.vue';
import TeamMembers from './components/teams/TeamMembers.vue';
import NotFound from './components/nav/NotFound.vue';
import TeamsFooter from './components/teams/TeamsFooter.vue';
import UsersFooter from './components/users/UsersFooter.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', redirect: '/teams'},
        { 
            name: 'teams',
            path: '/teams', 
            components: { default: TeamsList, footer: TeamsFooter },
            children: [ // ex) /temas/t1
                { name: 'team-members', path: ':teamId', component: TeamMembers, props: true }, // <router-view>는 root route들만 인식하므로 children은 parent route에서 따로 <router-view> 설정을 해줘야함
            ]
        }, // our-domain.com/teams => teamsList
        { 
            path: '/users', 
            components: { default: UsersList, footer: UsersFooter }
        }, 
        { path: '/:notFound(.*)', component: NotFound }
    ],
    linkActiveClass: 'active',
    scrollBehavior (to, from, savedPosition) {
        console.log(to, from, savedPosition);
        if (savedPosition) {
            return savedPosition;
        }
        return { left: 0, top: 0}
    }
});

const app = createApp(App)

app.use(router);

app.mount('#app');
