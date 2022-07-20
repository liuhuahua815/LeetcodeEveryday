<template>
  <div>
    <header class="header">
      <slot name="header"></slot>
      <slot></slot>
    </header>
    <main class="main">
      <slot name="main"></slot>
      <slot></slot>
    </main>
    <footer class="footer"><slot name="footer"></slot><slot></slot></footer>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.header {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.04), 0px 2px 8px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}
.main {
  display: flex;
  justify-content: center;
  width: 100%;
  background: rgb(247, 248, 250);
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>