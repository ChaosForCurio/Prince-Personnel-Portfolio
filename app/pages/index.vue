<script setup>
useHead({
  title: 'Prince Mehra'
})
</script>

<template>
  <main>
    <Hero />
    
    <section id="work-horizontal">
      <HorizontalScrollSection />
    </section>
    <StructuralDivider />
    
    <section id="approach">
      <ApproachSection />
    </section>

    <StructuralDivider />
    
    <section id="services">
      <ServicesSection />
    </section>

    <StructuralDivider />
    
    <section id="testimonials">
      <TestimonialSection />
    </section>

    <StructuralDivider />
    
    <Footer />
  </main>
</template>

<style>
/* Global smoothing and selections */
html {
  scroll-behavior: initial;
}

::selection {
  background-color: var(--primary);
  color: white;
}
</style>
