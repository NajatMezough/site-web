document.addEventListener("DOMContentLoaded", function() {
    const daysTag = document.querySelector(".days"),
          currentDate = document.querySelector(".current-date"),
          prevNextIcon = document.querySelectorAll(".icons span"),
          selectedDateInput = document.getElementById("selectedDate");

    let date = new Date(),
        currYear = date.getFullYear(),
        currMonth = date.getMonth();

    const months = ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet",
                   "Août", "Septembre", "Octobre", "Novembre", "Décembre"];

    const renderCalendar = () => {
        let firstDayofMonth = new Date(currYear, currMonth, 1).getDay(),
            lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate(),
            lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay(),
            lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
        let liTag = "";

        for (let i = firstDayofMonth; i > 0; i--) {
            liTag += `<li class="inactive">${lastDateofLastMonth - i + 1}</li>`;
        }

        for (let i = 1; i <= lastDateofMonth; i++) {
            let isToday = i === date.getDate() && currMonth === new Date().getMonth() 
                         && currYear === new Date().getFullYear() ? "active" : "";
            liTag += `<li class="${isToday}" data-date="${currYear}-${currMonth + 1}-${i}">${i}</li>`;
        }

        for (let i = lastDayofMonth; i < 6; i++) {
            liTag += `<li class="inactive">${i - lastDayofMonth + 1}</li>`
        }
        currentDate.innerText = `${months[currMonth]} ${currYear}`;
        daysTag.innerHTML = liTag;

        // Ajouter un écouteur d'événements pour chaque jour
        daysTag.querySelectorAll("li").forEach(day => {
            day.addEventListener("click", () => {
                const selectedDate = day.getAttribute("data-date");
                if (selectedDate) {
                    selectedDateInput.value = selectedDate;
                    alert(`Date sélectionnée: ${selectedDate}`);
                }
            });
        });
    }

    renderCalendar();

    prevNextIcon.forEach(icon => {
        icon.addEventListener("click", () => {
            currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;

            if(currMonth < 0 || currMonth > 11) {
                date = new Date(currYear, currMonth);
                currYear = date.getFullYear();
                currMonth = date.getMonth();
            } else {
                date = new Date();
            }
            renderCalendar();
        });
    });

    document.getElementById('reservationForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const serviceType = document.getElementById('serviceType').value;
        const date = document.getElementById('selectedDate').value;
        const time = document.getElementById('time').value;
        const groupSize = document.getElementById('groupSize').value;

        const total = calculateTotal(serviceType, groupSize);
        document.getElementById('total').value = total;

        fetch('reserver.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                serviceType: serviceType,
                date: date,
                time: time,
                groupSize: groupSize,
                total: total
            })
        })
        .then(response => response.json())
        .then(data => {
            alert('Réservation réussie!');
        })
        .catch(error => {
            console.error('Erreur:', error);
        });
    });

    function calculateTotal(serviceType, groupSize) {
        const prices = {
            service1: 50,
            service2: 75,
            service3: 100
        };

        return prices[serviceType] * groupSize;
    }
});

const plus = document.querySelector(".plus"),
                minus = document.querySelector(".minus"),
                num = document.querySelector(".num");
                let a = 1;
                plus.addEventListener("click", ()=>{
                  a++;
                  a = (a < 10) ? "0" + a : a;
                  num.innerText = a;
                });
                minus.addEventListener("click", ()=>{
                  if(a > 1){
                    a--;
                    a = (a < 10) ? "0" + a : a;
                    num.innerText = a;
                  }
                });