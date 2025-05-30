document.addEventListener("DOMContentLoaded", () => {
  // Função para alternar a classificação por estrelas
  const stars = document.querySelectorAll(".stars i")

  stars.forEach((star) => {
    star.addEventListener("click", function () {
      const parentStars = this.parentElement.children
      const index = Array.from(parentStars).indexOf(this)

      // Resetar todas as estrelas
      for (let i = 0; i < parentStars.length; i++) {
        if (i <= index) {
          parentStars[i].classList.add("filled")
        } else {
          parentStars[i].classList.remove("filled")
        }
      }
    })
  })

  // Animação para os itens da trilha sonora
  const tracks = document.querySelectorAll(".track")

  tracks.forEach((track) => {
    track.addEventListener("mouseenter", function () {
      this.style.backgroundColor = "rgba(179, 136, 255, 0.1)"
      this.style.cursor = "pointer"
    })

    track.addEventListener("mouseleave", function () {
      this.style.backgroundColor = "transparent"
    })

    track.addEventListener("click", function () {
      // Aqui você poderia adicionar uma função para reproduzir a música
      const trackName = this.querySelector(".track-name").textContent
      alert(`Reproduzindo: ${trackName}`)
    })
  })

  // Botões interativos
  const addToListBtn = document.querySelector(".secondary-btn")
  let added = false

  addToListBtn.addEventListener("click", function () {
    if (!added) {
      this.textContent = "Adicionado à lista"
      this.style.backgroundColor = "rgba(179, 136, 255, 0.3)"
      added = true
    } else {
      this.textContent = "Adicionar à lista"
      this.style.backgroundColor = "transparent"
      added = false
    }
  })

  const trailerBtn = document.querySelector(".primary-btn")

  trailerBtn.addEventListener("click", () => {
    alert("Abrindo trailer de Wicked")
    // Aqui você poderia abrir um modal com o trailer incorporado
  })
})
