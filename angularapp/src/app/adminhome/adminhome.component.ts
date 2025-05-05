import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-adminhome',
  templateUrl: './adminhome.component.html',
  styleUrls: ['./adminhome.component.css']
})
export class AdminhomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    const counters = document.querySelectorAll(".counter");

    const startCount = (counter: HTMLElement) => {
        const target = parseInt(counter.getAttribute("data-target") || "0", 10);
        let count = 0;
        const increment = Math.ceil(target / 100);

        const interval = setInterval(() => {
            count += increment;
            counter.textContent = String(count);

            if (count >= target) {
                clearInterval(interval);
                counter.textContent = String(target);
            }
        }, 30);
    };

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCount(entry.target as HTMLElement);
                observer.unobserve(entry.target); // Stop observing after counting is done
            }
        });
    });

    counters.forEach(counter => observer.observe(counter));
  }
}