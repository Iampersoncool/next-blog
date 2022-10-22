import css from 'styled-jsx/css'

export default css.apply`
  main {
    margin-top: 1rem;
  }

  hr {
    max-width: calc(100vw - 1rem);
  }

  .post__container__header {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.4rem;
  }

  .post__title {
    font-size: 3.2rem;
  }

  .post__date {
    font-size: 1.3rem;
  }

  .post__description {
    font-size: 1.4rem;
  }

  .post__container__header hr {
    border: 1px solid black;
    width: 100vw;
  }

  .go__home {
    position: fixed;
    bottom: 0;
    left: 0;
    margin: 1rem;
    color: white;
    background-color: red;
    padding: 0.5rem;
    border-radius: 0.4rem;
  }

  .go__home:hover {
    filter: brightness(80%);
  }

  .centered {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`
