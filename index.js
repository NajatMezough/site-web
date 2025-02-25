 // Animation au défilement avec Intersection Observer
 const cards = document.querySelectorAll('.card');

 const observer = new IntersectionObserver((entries) => {
     entries.forEach(entry => {
         if (entry.isIntersecting) {
             entry.target.classList.add('visible');
         } else {
             entry.target.classList.remove('visible');
         }
     });
 }, {
     threshold: 0.1 // Déclenche l'animation lorsque 10% de la carte est visible
 });

 cards.forEach(cardd => {
     observer.observe(cardd);
 });

         // Animation au défilement avec Intersection Observer
         const cardss = document.querySelectorAll('.cardd');

         const observerr = new IntersectionObserver((entries) => {
             entries.forEach(entry => {
                 if (entry.isIntersecting) {
                     entry.target.classList.add('visiblee');
                 } else {
                     entry.target.classList.remove('visiblee');
                 }
             });
         }, {
             threshold: 0.1 // Déclenche l'animation lorsque 10% de la carte est visible
         });
 
         cardss.forEach(card => {
             observerr.observe(cardd);
         });