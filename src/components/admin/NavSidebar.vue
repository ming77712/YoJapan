<script>
export default {
};
</script>

<template>
    <nav class="sideBar d-flex flex-column justify-content-between navbar-dark bg-dark h-100 p-8">
        <div class="navbar-nav">
            <RouterLink
                to="/"
                class="navbar-brand fs-3"
            >遊日本</RouterLink>
            <div class="d-flex flex-column gap-6 mt-9">
                <RouterLink
                    to="/admin/products"
                    class="nav-link fs-5"
                ><i class="bi bi-suitcase me-2"></i>行程管理</RouterLink>
                <RouterLink
                    to="/admin/orders"
                    class="nav-link fs-5"
                ><i class="bi bi-list-ul me-2"></i>訂單列表</RouterLink>
                <RouterLink
                    to="/admin/coupons"
                    class="nav-link fs-5"
                ><i class="bi bi-ticket-detailed me-2"></i>優惠券管理</RouterLink>
                <RouterLink
                    to="/admin/article"
                    class="nav-link fs-5"
                ><i class="bi bi-vector-pen me-2"></i>貼文管理</RouterLink>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.sideBar {
    position: fixed;
    top: 0;
    left: 0;
    min-width: 296px;
}
</style>
