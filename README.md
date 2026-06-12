# ⚡ WNR Studio | Interactive Portfolio

![Banner](banner.webp)

<div align="center">

[![Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS3%20%7C%20ES6+-FFC107?style=for-the-badge&logo=html5&logoColor=black)](https://github.com/W-N-R)
[![Design](https://img.shields.io/badge/Design-Glassmorphism%20%7C%20Dark%20UI-000000?style=for-the-badge&logo=figma&logoColor=FFC107)](https://github.com/W-N-R)
[![Performance](https://img.shields.io/badge/Performance-High%20FPS%20Canvas-success?style=for-the-badge&logo=speedtest&logoColor=white)](https://github.com/W-N-R)

</div>

<br />

> A high-performance, visually immersive portfolio engineered to bridge the gap between **Hardware Logic** and **Creative Design**. Built with a custom Vanilla JS particle engine and modern CSS3 architectures.

---

## 🎨 Visual Architecture

This project moves away from static web design, utilizing a **dynamic DOM structure** where the background, navigation, and content layers interact fluidly.

```mermaid
graph TD
    User[User Interaction] -->|Scroll/Hover| UI[UI Layer]
    
    subgraph Core [Core Engine]
        UI -->|Trigger| JS[Script.js]
        JS -->|Render| Canvas[HTML5 Canvas]
        JS -->|Observe| Scroll[Intersection Observer]
    end
    
    subgraph Visual [Visual Output]
        Canvas -->|Draw| Particles[Gold Connectivity Nodes]
        Scroll -->|Animate| Reveal[CSS Transforms]
        UI -->|Toggle| Modal[Snake Border Modal]
    end
