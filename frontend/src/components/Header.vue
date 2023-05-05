<template>
  <div class="container">
    <header>
      <ul class="menu">
        <li class="menu-item">
          <router-link to="/" :class="`${$route.path === '/' ? 'active' : ''}`">
            Главная
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/quotes" :class="`${$route.path === '/quotes' ? 'active' : ''}`">
            Цитаты
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/authors" :class="`${$route.path === '/authors' ? 'active' : ''}`">
            Авторы
          </router-link>
        </li>
        <li class="menu-item">
          <router-link to="/genres" :class="`${$route.path === '/genres' ? 'active' : ''}`">
            Жанры
          </router-link>
        </li>
      </ul>
    </header>
  </div>
</template>
<style scoped>
header {
  padding: 20px;
  display: flex;
  justify-content: flex-end;
}

.menu {
  display: flex;
}

.menu-item {
  list-style-type: none;
  margin-right: 20px;
}

.menu-item:last-child {
  margin-right: 0;
}

.menu-item a {
  color: #000;
  text-decoration: none;
}

.menu-item a.active {
  color: var(--color-submit);
}
</style>
