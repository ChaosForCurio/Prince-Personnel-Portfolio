<script setup>
useHead({
  title: 'Prince Mehra | Bold Curator & Digital Designer'
})
</script>

<template>
  <main>
    <Hero />
    
    <StructuralDivider />
    
    <section id="work">
      <WorkGrid />
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
