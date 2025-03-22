<script setup>
</script>

<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-links">
        <p>Built with &#x2661; by Belle See, Crystal McArdle-Ventura, and Johanna Lee</p>
      </div>
      <div class="footer-links">
        <a href="mailto:hl105@wellesley.edu">Email for feedback & suggestions!</a>
        <span class="separator">|</span>
        <a href="https://github.com/hl105/wellesley-refresh" target="_blank">Open Source at GitHub! If you like this, give us a star! 🌟</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: #687350;
  color: white;
  padding: 1.5rem 0;
  margin-top: 2rem;
  width: 100%;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  text-align: center;
}

.footer-links {
  margin-top: 0.5rem;
}

.footer-links a {
  color: #F3A203;
  text-decoration: none;
  transition: opacity 0.2s;
}

.footer-links a:hover {
  opacity: 0.8;
}

.separator {
  margin: 0 0.5rem;
}
</style>
